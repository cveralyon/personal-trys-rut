<template>
  <div class="body-container">
    <SocialHead
      :title="'Rutero | Encuentra tu Servicio Ideal en todo Chile'"
      :description="'Busca entre cientos de servicios a lo largo de todo Chile y reserva en línea. En Rutero queremos que vivas la experiencia outdoor como siempre quisiste.'"
      :image="'/rutero_logo.png'"
    />

    <div class="banner_landing mobile">
      <div>
        <h1 class="services">
          Reserva {{ total }} servicios outdoor por todo Chile
        </h1>
        <div class="banner_form">
          <h2 class="title">¿Dónde quieres explorar?</h2>
          <img src="/landing/Logo_Marca_Chile.webp" class="logo" alt="Logo de Marca Chile">
          <SearchBox />
        </div>
      </div>
      <div class="banner_img">
        <NuxtImg
          class="right-0 top-0 z-0 portadaMobileimg"
          src="/landing/portada_mobile.webp"
          alt="Campfire-image"
          title="Campfire"
        />
      </div>
    </div>

    <div class="grid-position desktop">
      <h1 class="services">
        Reserva {{ total }} servicios outdoor por todo Chile
      </h1>
    </div>

    <div class="desktop">
      <NuxtImg
        src="/landing/Portada.webp"
        alt="Campfire-desktop-image"
        title="Campfire"
        class="estatic"
      />
      <div class="search">
        <h2 class="title">¿Dónde quieres explorar?</h2>
        <SearchBox />
        <img src="/landing/Logo_Marca_Chile.webp" class="logo" alt="Logo de Marca Chile">
      </div>
    </div>

    <div class="carrousel_subtypes">
      <SubtypeIcon
        v-for="subtype in subtypes"
        :key="subtype"
        :subtype="subtype"
      />
    </div>

    <div class="mapa_imgs" @click="goToMap">
      <NuxtImg
        src="/landing/ver_mapa.png"
        alt="Mapa-image-text"
        title="mapa-text"
        class="ver_map_img"
      />
    </div>

    <div class="hills_middle"></div>

    <div class="waves-cont-1">
      <NuxtImg
        class="waves-1"
        src="/landing/landing-rutero-03.webp"
        alt="waves-1-image"
        title="waves-1"
      />
    </div>

    <h3 style="padding: 10px 7.5vw;">RECOMENDACIONES: </h3>
    <Recomendaciones
      style="margin-bottom: 2rem;"
      :services="services"
    />

    <h3 style="padding: 10px 7.5vw;">TENDENCIAS: </h3>
    <Recomendaciones
      :services="tendencias"
    />

    <div class="condiciones_desktop">
      <NuxtImg
        alt="cond-image"
        title="cond-image"
        src="/landing/condiciones_web.webp"
        class="condicionesstyle"
      />
    </div>
    <div class="condiciones_mobile">
      <NuxtImg
        alt="cond-image-mobile"
        title="cond-image-mobile"
        src="/landing/condiciones_mobile.webp"
        class="condicionesstyle"
      />
    </div>

    <div v-if="partners" id="showBlogs" class="blogs">
      <NuxtImg
        class="waves-1"
        src="/landing/landing-rutero-04.png"
        alt="waves-1-image"
        title="waves-1"
      />
      <div class="blog_imgs" @click="goBlog">
          <NuxtImg    src="/landing/ver_blogs.webp" alt="Blogs-image" title="Blogs" class="ver_blog_img"/>
      </div>
      
      <div class="recommended">
        <p class="title-recommended">Lo último</p>
        <TrendingBlogs id="lastsBlogs" :listBlogs="last" />
        <p class="title-recommended" style="margin-bottom: 0">MÁS POPULARES</p>
        <p id="month"
          :style="{ 'font-weight': boldMonth }"
          @click="showPop($event)">
          Mensuales
        </p>
        <div class="vl"></div>
        <p id="week"
          :style="{ 'font-weight': boldWeek }"
          @click="showPop($event)">
          Semanales
        </p>
        <TrendingBlogs id="blogsOFthemonth" v-if="!isHiddenMonth && isHiddenWeek" :listBlogs="month" />
        <TrendingBlogs id="blogsOFtheweek" v-if="!isHiddenWeek && isHiddenMonth" :listBlogs="week" /> 
      </div>
      
      <NuxtImg loading="lazy"   src="/landing/arboles.webp" alt="trees-image" title="trees-image" class="arboles" />

    </div>

    <div v-if="partners">
      <Partners v-if="partners" id="partners" :goEquipment="goEquipment"/>
    </div>
    
  </div>
    
</template>

<script>
import SearchBox from "../components/SearchBox/SearchBox.vue";
import SocialHead from "~/components/Landing/SocialHead.vue";
import Partners from "~/components/Landing/Partners.vue";
import TrendingBlogs from "~/components/Landing/TrendingBlogs.vue";
import axios from "axios";
import SubtypeIcon from "~/components/Landing/SubtypeIcon.vue";
import Recomendaciones from "~/components/Landing/Recomendaciones.vue";
import { plural, toCLP } from "@/plugins/helpers";

const API_URL = "https://rutero-backend.herokuapp.com/api/v1";

export default {
  layout: "default",
  components: {
    SearchBox,
    TrendingBlogs,
    SocialHead,
    Partners,
    SubtypeIcon,
    Recomendaciones,
  },
  data: () => ({
    isHiddenMonth: false,
    isHiddenWeek: true,
    boldMonth: 600,
    boldWeek: 1,
    country: "chile",
    total: 0,
    goEquipment: false,
    partners: null,
    subtypes: [],
    services: [],
    tendencias: [],
    last: [],
    month: [],
    week: [],
  }),
  async asyncData({ params }) {
    const [response, response_1, response_2, response_3, response_3_2, response_4] =
      await Promise.all([
        axios.get(`${API_URL}/services/total`),
        axios.get(`${API_URL}/recommended`),
        axios.get(`${API_URL}/tendencias`),
        axios.get(`${API_URL}/blogs/last`),
        axios.get(`${API_URL}/blogs/popular`),
        axios.get(`${API_URL}/services/subtypes`),
      ]);

    const services = response_1.data.map((service) => {
      if (service.service.min_value) {
        service.service.min_value = toCLP(service.service.min_value);
      }
      if (!service.service.first_image) {
        service.service.first_image = require("~/assets/images/no_images.webp");
      }
      service.service.name = service.service.name.toUpperCase();
      return service.service;
    });

    const tendencias = response_2.data.map((service) => {
      if (service.service.min_value) {
        service.service.min_value = toCLP(service.service.min_value);
      }
      if (!service.service.first_image) {
        service.service.first_image = require("~/assets/images/no_images.webp");
      }
      service.service.name = service.service.name.toUpperCase();
      return service.service;
    });

    const last = response_3.data.map((item) => item.blog);
    const month = response_3_2.data.slice(0, 10).map((item) => item.blog);
    const week = response_3_2.data.slice(10, 20).map((item) => item.blog);

    const subtypes = response_4.data;

    return {
      total: response.data.total_services,
      services,
      tendencias,
      last,
      month,
      week,
      subtypes,
    };
  },
  head() {
    const meta = [
      {
        hid: "description",
        name: "description",
        content:
          "Busca entre cientos de servicios a lo largo de todo Chile y reserva en línea. En Rutero queremos que vivas la experiencia outdoor como siempre quisiste.",
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "camping, carpas camping, camping el sauce, camping valle del elqui, carpa 4 personas, carpa 4 personas, glamping, camping salto del laja, camping en pucón, camping pucón, valdivia camping, acampar, camping 7 tazas, acampado, camping puerto varas, camping villarica, camping lago ranco, trekking, mochila camping, carpa para 6 personas, camping frutillar, carpas de camping, carpas camping, camping cajon del maipo, cajon del maipo camping",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://www.rutero.cl/",
      },
    ];
    const links = [
      {
        rel: 'canonical',
        href: 'https://www.rutero.cl/'
      }
    ];
    const title = "Rutero | Rutas de Aventura en Chile";
    return {
      title,
      meta,
      links
    };
  },
  mounted() {
    if (localStorage.getItem("ref") === "austerra") {
      this.partners = false;
    }
    else {
      this.partners = true;
    }
  },
  watch: {
    partners(){
      if (localStorage.getItem("ref") === "austerra") {
      this.partners = false;
      }
      else {
      this.partners = true;
      }
  }
  },
  //el mounted y watch son redundante pero es la unica manera que funciona, si se quita uno no funciona
  //el dinamismo de los partners
  methods: {
    showPop(event) {
      const targetId = event.currentTarget.id;
      this.isHiddenMonth = targetId !== 'month';
      this.isHiddenWeek = targetId !== 'week';
      this.boldMonth = targetId === 'month' ? 600 : 1;
      this.boldWeek = targetId === 'week' ? 600 : 1;
    },

    goBlog() {
      window.location.href = "https://www.ruterocamping.com/blog";
    },
    goToMap() {
      this.$router.push("/destinos");
    },
  },
  computed: {
    plural: () => plural,
    toCLP: () => toCLP,
  },
};
</script>

<style lang="scss" scoped>

h3 {
  font-family: BebasNeue-Regular;
  font-size: 3rem;
}
.arboles{
  margin-top: 8vh;
  @media screen and (max-width: 1025px) {
    margin-top: 14vh;
  }
}
.hills_middle {
  min-height: 15rem;  
  background-color: #263238;
  @media screen and (max-width: 1025px) {
    min-height: 5rem;
  }
}
.condicionesstyle{
  width:100%;
}
.portadaMobileimg{
  min-height: 17rem; 
  margin-top: 0.5rem;
}

.estatic {
  min-height: 34rem;
  @media (min-width: 768px) and (max-width: 1025px) {
    min-height: 24rem;
  }
}

.mapa_imgs {
  min-height: 27rem;
  background-color: #263238;
  background-image: url("/landing/mapa_rutero.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  @media screen and (max-width: 1025px) {
    min-height: 22rem;
  }
  @media screen and (max-width: 750px) {
    min-height: 10rem;
  }
}
.mapa_imgs:hover {
  transform: scale(1.05);
  transition: all 0.5s ease;
}
.blog_imgs{
  margin-bottom:19rem;
  min-height: 27rem;
  background-color: #808080;
  background-image: url("/landing/blogs_rutero.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  @media screen and (max-width: 1025px) {
    min-height: 22rem;
    margin-bottom: 4rem ;
  }
  @media screen and (max-width: 750px) {
    min-height: 10rem;
    margin-bottom: 4rem;
  }
}
.blog_imgs:hover {
  opacity: 0.5;
  transform: scale(1.05);
  transition: all 0.5s ease;
}

.ver_map_img {
  position: relative;
  z-index: 1;
  top: 3rem;
  max-width: 46rem;
  cursor: pointer;
  @media screen and (max-width: 1025px) {
    max-width: 16rem;
    top: 1rem;
  }
  @media screen and (min-width: 1200px) {
    margin-left: 6rem;
  }
}
.ver_blog_img {
  float: right;
  position: relative;
  z-index: 1;
  max-width: 46rem;
  top: 8rem;
  margin-right: 2rem;
  @media screen and (max-width: 1025px) {
    max-width: 15rem;
    top: 3rem;
    margin-right: 1rem;
  }
}
.body-container {
  font-family: Barlow, sans-serif;
  font-weight: normal;
  font-size: 16px;
  background-color: white;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  top: 0px;
  overflow-x: hidden;
}
.banner_landing {
  display: grid;
  grid-template-columns: repeat(2, 49%);
  justify-content: space-between;
  width: 100vw;
  height: auto;
  margin-top: -1px;
  background-color: #e3e3e3;
  @media screen and (max-width: 1025px) {
    grid-template-columns: 100%;
    align-content: flex-start;
  }
  .banner_form {
    z-index: 10;
    background: #fff;
    padding: 25px;
    border-radius: 10px;
    height: fit-content;
    width: auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    display: block;
    position: relative;
    @media screen and (max-width: 1025px) {
      margin: 0 5%;
    }
  }
  .banner_img {
    @media screen and (max-width: 1025px) {
      margin-top: 0;
      margin-bottom: -10%;
    }
    img {
      padding: 0;
    }
  }
}

.waves-cont-1 {
  width: 100%;
  position: absolute;
  .waves-1 {
    width: 100%;
    height: auto;
    position: absolute;
    max-width: 100%;
    bottom: -1px;
    background-color: #263238;
    img {
      border-style: solid;
    }
  }
}
.title {
  font-size: 3.2rem;
  color: #253239;
  font-weight: bold;
  font-family: Barlow, sans-serif;
  @media screen and (max-width: 1025px) {
    width: 100%;
    font-size: 1.8rem;
  }
}

.services {
  font-family: sans-serif;
  font-size: 0.9rem;
  margin: 1em 5%;
  font-weight: 600;
  color: #808080;
  background-color: #e3e3e3;
  text-align: center;
  padding-top: 1.5em;
  @media screen and (min-width: 768px) {
    font-size: 1.7rem;
    margin: 0;
  }
}
.grid-position {
  grid-column: 1 / 4;
}
.mobile {
  display: none;
  @media screen and (max-width: 768px) {
    display: grid;
  }
}
.desktop {
  display: grid;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.carrousel_subtypes {
  display: flex;
  flex-direction: row;
  align-items: center;
  // margin-top: 3rem;
  overflow-x: scroll;
  background-color: #263238;
  @media screen and (max-width: 1025px) {
    margin-top: -0.1rem;
  }
  @media screen and (max-width: 768px) {
    margin-top: 2rem;
  }
}
.carrousel_subtypes::-webkit-scrollbar {
  display: none;
}
.condiciones_desktop {
  display: block;
  margin-bottom: 1rem;
  @media screen and (max-width: 1025px) {
    display: none;
  }
}
.condiciones_mobile {
  max-height: 20rem;
  display: none;
  margin: auto;
  margin-bottom: 5.5rem;
  margin-top: 1rem;
  @media screen and (max-width: 1025px) {
    display: block;
  }
}
.recommended {
  width: 100vw;
  height: 76vw;
  margin-top: -6rem;
  background-color: #808080;
  margin-top: -15rem;
  @media screen and (max-width: 769px) {
    margin-top: -3rem;
    height: 135vw;
  }
}
.blogs {
  background-color: #808080;
  margin-top: -4rem;
}
.title-recommended {
  margin-left: 8%;
  color: #fff;
  font-family: BebasNeue-Regular;
  font-size: 3rem;
  @media screen and (max-width: 769px) {
    margin-bottom: 0rem;
    margin-top: 2vh;

  }
}
.vl {
  border-left: 2px solid #fff;
}

#month {
  margin-left: 8%;
}

#week {
  margin-left: 5px;
}

#month,
#week {
  color: #fff;
  cursor: pointer;
  font-size: 1.5vw;
  margin-bottom: 1.2rem;
  @media screen and (max-width: 769px) {
    font-size: 5vw;
  }
}

#month,
#week,
.vl {
  display: inline;
}

.search {
  height: fit-content;
  margin: 2% 7.5vw 3% 50vw;
  width: auto;
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);
  display: block;
  max-width: 50vw;
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  position: absolute;
}

.logo {
  position: absolute;
  top: -17px;
  right: -9px;
  width: 100px;
  height: 100px;
  margin: 0px;
  padding: 0px;
}
</style>
