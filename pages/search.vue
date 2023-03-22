<template>
  <div class="servicegrid">
    <SocialHead
      :title="this.searchTerm"
      :description="'Busca entre cientos de servicios a lo largo de todo Chile y reserva en línea. En Rutero queremos que vivas la experiencia outdoor como siempre quisiste.'"
      :image="'/rutero_logo.png'"
    />

    <div class="searchbar">
      <SearchBoxBar />
    </div>

    <div class="order">
      <button class="dropdown">
        <div class="flex space" @click="dropdown('order_2')">
          <span class="order_text" id="ordenar">Ordenar por:</span>
          <img
            src="~/assets/icons/Drop.png"
            alt="Ordenar-image"
            title="Ordenar"
            style="max-width: 30px; max-height: 10px; align-self: center"
          />
        </div>
        <div id="order_2" class="dropdown-content">
          <label class="container_2">
            <p class="subtype">Más Popular</p>
            <input
              type="checkbox"
              id="popular_2"
              value="popular"
              @click="order('popular_2')"
              name="check"
              checked
            />
            <span class="checkmark"></span>
          </label>
          <label class="container_2">
            <p class="subtype">Novedades</p>
            <input
              type="checkbox"
              id="novedades_2"
              value="novedades"
              @click="order('novedades_2')"
              name="check"
            />
            <span class="checkmark"></span>
          </label>
          <label class="container_2">
            <p class="subtype">Menor Precio</p>
            <input
              type="checkbox"
              id="precio2_2"
              @click="order('precio2_2')"
              name="check"
              value="precio_menor"
            />
            <span class="checkmark"></span>
          </label>
          <label class="container_2">
            <p class="subtype">Mayor Precio</p>
            <input
              type="checkbox"
              id="precio1_2"
              @click="order('precio1_2')"
              name="check"
              value="precio_mayor"
            />
            <span class="checkmark"></span>
          </label>
        </div>
      </button>
      <div class="resultados">
        <h1 style="font-size: 1rem">
          <span>
            Mostrando {{ services.length }} / {{ total_services }} resultados
            de</span
          >
          <strong>{{ " " + searchTerm }}</strong>
        </h1>
      </div>
    </div>

    <div class="resultados mobile">
      <h1 style="font-size: 1rem">
        <span>
          Mostrando {{ services.length }} / {{ total_services }} resultados
          de</span
        >
        <strong>{{ " " + searchTerm }}</strong>
      </h1>
    </div>

    <div class="map mobile">
      <ServicesMap :services="services_map" :infoWindow="infoWindow" />
    </div>

    <div class="filtros">
      <button id="btn-filtro" class="dropdown">
        <div class="flex space" @click="dropdown('filter')">
          <span class="text-sm">Filtros</span>
          <img
            src="~/assets/icons/Filtros.png"
            alt="Filtro-image"
            title="Filtro"
            style="max-width: 30px"
          />
        </div>
        <div id="filter" class="dropdown-content">
          <FilterCard
            @filtersubtype="filter_subtype"
            @filter_type="filter_type"
            :subtypes_count="subtype_count"
          />
        </div>
      </button>
      <button id="btn-order" class="dropdown">
        <div class="flex space" @click="dropdown('order')">
          <span class="text-sm" id="ordenar">Ordenar por:</span>
          <img 
            src="~/assets/icons/Drop.png"
            alt="Ordenar-imag"
            style="max-width: 30px; max-height: 10px; margin-top: 4px"
          />
        </div>
        <div id="order" class="dropdown-content">
          <label class="container_2">
            <p class="subtype">Más Popular</p>
            <input
              type="checkbox"
              id="popular"
              value="popular"
              @click="order('popular')"
              name="check"
              checked
            />
            <span class="checkmark"></span>
          </label>
          <label class="container_2">
            <p class="subtype">Novedades</p>
            <input
              type="checkbox"
              id="novedades"
              value="novedades"
              @click="order('novedades')"
              name="check"
            />
            <span class="checkmark"></span>
          </label>
          <label class="container_2">
            <p class="subtype">Menor Precio</p>
            <input
              type="checkbox"
              id="precio2"
              @click="order('precio2')"
              name="check"
              value="precio_menor"
            />
            <span class="checkmark"></span>
          </label>
          <label class="container_2">
            <p class="subtype">Mayor Precio</p>
            <input
              type="checkbox"
              id="precio1"
              @click="order('precio1')"
              name="check"
              value="precio_mayor"
            />
            <span class="checkmark"></span>
          </label>
        </div>
      </button>
    </div>

    <div class="desktop">
      <div class="filtercard">
        <h4 class="filter_title" style="margin-bottom: 0; place-self: start">
          FILTROS
        </h4>
        <li class="border-t border-gray-200 mt-2 pt-2 flex"></li>
        <FilterCard
          @filtersubtype="filter_subtype"
          @filter_type="filter_type"
          :subtypes_count="subtype_count"
        />
      </div>
      <div
        v-if="!selected.length || !services.length"
        class="flex justify-center items-center px-4"
        style="margin-top: 2rem; width: 100%"
      >
        <div class="text-center">
          <h4 class="text-2xl font-bold">No hay resultados para tu búsqueda</h4>
          <p class="text-lg">Intenta agregando algún filtro</p>
        </div>
      </div>
      <ul class="grid">
        <li
          v-for="service in services"
          :key="`service-${service.id}`"
          :ref="`service-${service.id}`"
          class="item"
        >
          <ServiceCard
            :id="service.id"
            :name="service.name"
            :rating="service.rating"
            :address="service.address"
            :commune="service.commune"
            :region="service.region"
            :images="service.images_urls"
            :subtype="service.subtype"
            :min_value="service.min_value"
            :company_name="service.company_name"
            :city="service.city"
            :country="service.country"
          />
        </li>
      </ul>
      <div class="map">
        <ServicesMap :services="services_map" :infoWindow="infoWindow" />
      </div>
    </div>

    <ul class="grid">
      <li
        v-for="service in services"
        :key="`service-${service.id}`"
        :ref="`service-${service.id}`"
        class="item mobile"
      >
        <ServiceCard
          :id="service.id"
          :name="service.name"
          :rating="service.rating"
          :address="service.address"
          :commune="service.commune"
          :region="service.region"
          :images="service.images_urls"
          :subtype="service.subtype"
          :min_value="service.min_value"
          :company_name="service.company_name"
          :city="service.city"
          :country="service.country"
        />
      </li>
    </ul>

    <div
      v-if="!selected.length || !services.length"
      class="flex justify-center items-center max-w-screen-lg px-4 mobile"
      style="margin-top: 2rem"
    >
      <div class="text-center">
        <h4 class="text-2xl font-bold">No hay resultados para tu búsqueda</h4>
        <p class="text-lg">Intenta agregando algún filtro</p>
      </div>
    </div>

    <client-only>
      <b-pagination-nav
        v-model="currentPage"
        :link-gen="linkGen"
        :number-of-pages="Math.max(Math.ceil(total_services / 10), 1)"
        align="center"
        use-router
        @change="onPageChange"
      ></b-pagination-nav>
    </client-only>
  </div>
</template>

<script>
import SearchBoxBar from "../components/SearchBoxBar/SearchBoxBar.vue";
import ServiceCard from "~/components/Services/search/ServiceCard.vue";
import SocialHead from "~/components/Landing/SocialHead.vue";
import axios from "axios";
import FilterCard from "~/components/Services/search/FilterCard.vue";
import ServicesMap from "~/components/Services/search/ServicesMap.vue";

export default {
  head() {
    return {
      title: "Rutero | " + this.searchTerm,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content:
            this.searchTerm +
            ", camping, carpas camping, camping el sauce, camping valle del elqui, carpa 4 personas, carpa 4 personas, glamping, camping salto del laja, camping en pucón, camping pucón, valdivia camping, acampar, camping 7 tazas, acampado, camping puerto varas, camping villarica, camping lago ranco, trekking, mochila camping, carpa para 6 personas, camping frutillar, carpas de camping, carpas camping, camping cajon del maipo, cajon del maipo camping",
        },
      ],
    };
  },
  components: {
    ServiceCard,
    SearchBoxBar,
    SocialHead,
    FilterCard,
    ServicesMap,
  },
  data() {
    return {
      searchTerm: "",
      country: "",
      selected: ["Actividades", "Alojamientos"],
      types: "type[]=0&type[]=1",
      subtypes: "",
      currentPage: 1,
      selected_subtypes: [],
      selected_companies: [],
      showFilter: false,
      total_services: 0,
    };
  },
  async asyncData({ query }) {
    const acentos = {
      á: "a",
      é: "e",
      í: "i",
      ó: "o",
      ú: "u",
      Á: "A",
      É: "E",
      Í: "I",
      Ó: "O",
      Ú: "U",
      ñ: "n",
      Ñ: "N",
    };
    var variable = "";
    variable = query.Service.replace(/[áéíóúÁÉÍÓÚñÑ]/g, function (c) {
      return acentos[c];
    }).replace("’", "'");
    const response = await axios.get(
      "https://rutero-backend.herokuapp.com/api/v1/services/search?q=" +
      variable
    );
    const total_services = response.data.total;
    const subtype_count = response.data.subtype;
    const services = [];
    for (let i = 0; i < response.data.services.length; i++) {
      const service = response.data.services[i];
      if (service.type == 1) {
        service.type = "Actividades";
      } else {
        service.type = "Alojamientos";
      }
      if (service.images_urls.length > 0) {
        service.first_image = service.images_urls[0];
      } else {
        service.first_image = require("~/assets/images/no_images.webp");
      }
      services.push(service);
    }
    const services_map = [];
    const infoWindow = {};
    for (let i = 0; i < response.data.pinesMP.length; i++) {
      const service = response.data.pinesMP[i].pin;
      services_map.push(service);
      infoWindow[service.id] = false;
    }
    return {
      searchTerm: variable,
      country: query.country,
      services,
      infoWindow,
      total_services,
      services_map,
      subtype_count,
    };
  },
  mounted() {
    var num_page = this.$route.query.page;
    if (num_page == undefined) {
      this.currentPage = 1;
    } else {
      this.currentPage = num_page;
    }
  },
  watch: {
    currentPage: async function (pagenum) {
      var query = "";
      document.getElementsByName("check").forEach((element) => {
        if (element.checked == true) {
          if (element.value == "novedades") {
            query += `/api/v1/services/searchnovedades?`;
          } else if (element.value == "precio_mayor") {
            query += `/api/v1/services/searchpreciomayor?`;
          } else if (element.value == "precio_menor") {
            query += `/api/v1/services/searchpreciomenor?`;
          }
        }
      });
      if (query == "") {
        query = `/api/v1/services/search?`;
      }
      query += `q=${this.searchTerm}&page=${pagenum}&${this.types}`;
      if (this.selected_subtypes.length > 0) {
        for (let i = 0; i < this.selected_subtypes.length; i++) {
          if (i == 0) {
            this.subtypes = `subtype[]=${this.selected_subtypes[i]}`;
          } else {
            this.subtypes =
              this.subtypes + `&subtype[]=${this.selected_subtypes[i]}`;
          }
        }
        query = query + `&${this.subtypes}`;
      }
      this.getServices(query);
    },
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1
        ? `?Service=${this.searchTerm}&page=1`
        : `?Service=${this.searchTerm}&page=${pageNum}`;
    },
    order: function (order) {
      this.currentPage = 1;
      document.getElementsByName("check").forEach((element) => {
        element.checked = false;
      });
      document.getElementById(order).checked = true;
      if (order == "popular" || order == "popular_2") {
        // console.log("ORDENANDO POR POPULARIDAD")
        var query = `/api/v1/services/search?q=${this.searchTerm}&page=${this.currentPage}&${this.types}`;
        if (this.selected_subtypes.length > 0) {
          for (let i = 0; i < this.selected_subtypes.length; i++) {
            if (i == 0) {
              this.subtypes = `subtype[]=${this.selected_subtypes[i]}`;
            } else {
              this.subtypes =
                this.subtypes + `&subtype[]=${this.selected_subtypes[i]}`;
            }
          }
          query = query + `&${this.subtypes}`;
        }
        this.getServices(query);
      } else if (order == "novedades" || order == "novedades_2") {
        // console.log("ORDENANDO POR NOVEDADES")
        var query = `/api/v1/services/searchnovedades?q=${this.searchTerm}&page=${this.currentPage}&${this.types}`;
        if (this.selected_subtypes.length > 0) {
          for (let i = 0; i < this.selected_subtypes.length; i++) {
            if (i == 0) {
              this.subtypes = `subtype[]=${this.selected_subtypes[i]}`;
            } else {
              this.subtypes =
                this.subtypes + `&subtype[]=${this.selected_subtypes[i]}`;
            }
          }
          query = query + `&${this.subtypes}`;
        }
        this.getServices(query);
      } else if (order == "precio1" || order == "precio1_2") {
        // console.log("ORDENANDO POR PRECIO, MAYOR A MENOR")
        var query = `/api/v1/services/searchpreciomayor?q=${this.searchTerm}&page=${this.currentPage}&${this.types}`;
        if (this.selected_subtypes.length > 0) {
          for (let i = 0; i < this.selected_subtypes.length; i++) {
            if (i == 0) {
              this.subtypes = `subtype[]=${this.selected_subtypes[i]}`;
            } else {
              this.subtypes =
                this.subtypes + `&subtype[]=${this.selected_subtypes[i]}`;
            }
          }
          query = query + `&${this.subtypes}`;
        }
        this.getServices(query);
      } else if (order == "precio2" || order == "precio2_2") {
        // console.log("ORDENANDO POR PRECIO, MENOR A MAYOR")
        var query = `/api/v1/services/searchpreciomenor?q=${this.searchTerm}&page=${this.currentPage}&${this.types}`;
        if (this.selected_subtypes.length > 0) {
          for (let i = 0; i < this.selected_subtypes.length; i++) {
            if (i == 0) {
              this.subtypes = `subtype[]=${this.selected_subtypes[i]}`;
            } else {
              this.subtypes =
                this.subtypes + `&subtype[]=${this.selected_subtypes[i]}`;
            }
          }
          query = query + `&${this.subtypes}`;
        }
        this.getServices(query);
      }
    },
    async filter_type(checkbox_state) {
      this.currentPage = 1;
      this.selected_subtypes = [];
      this.types = checkbox_state;
      var query = `/api/v1/services/search?q=${this.searchTerm}&page=${this.currentPage}&${checkbox_state}`;
      this.getServices(query);
      var response = await this.$axios.$get(
        `/api/v1/services/search?q=${this.searchTerm}&page=${this.currentPage}&${checkbox_state}`
      );
    },
    dropdown(type) {
      if (type == "order") {
        if (document.getElementById("order").classList.contains("show")) {
          document.getElementById("order").classList.remove("show");
        } else {
          document.getElementById("order").classList.add("show");
          document.getElementById("btn-filtro").classList.add("notshow");
        }
        if (
          document.getElementById("btn-order").classList.contains("notshow")
        ) {
          document.getElementById("btn-order").classList.remove("notshow");
        }
        if (document.getElementById("filter").classList.contains("show")) {
          document.getElementById("filter").classList.remove("show");
        }
      } else if (type == "filter") {
        if (document.getElementById("filter").classList.contains("show")) {
          document.getElementById("filter").classList.remove("show");
        } else {
          document.getElementById("filter").classList.add("show");
          document.getElementById("btn-order").classList.add("notshow");
        }
        if (
          document.getElementById("btn-filtro").classList.contains("notshow")
        ) {
          document.getElementById("btn-filtro").classList.remove("notshow");
        }
        if (document.getElementById("order").classList.contains("show")) {
          document.getElementById("order").classList.remove("show");
        }
      } else {
        if (document.getElementById("order_2").classList.contains("show")) {
          document.getElementById("order_2").classList.remove("show");
        } else {
          document.getElementById("order_2").classList.add("show");
        }
      }
    },
    onPageChange() {
      window.scrollTo(0, 0);
    },
    async filter_subtype(event) {
      document.getElementsByName("check").forEach((element) => {
        element.checked = false;
        if (element.value == "popular") {
          element.checked = true;
        }
      });
      const text = event[0];
      this.currentPage = 1;
      if (this.selected_subtypes.includes(text)) {
        this.selected_subtypes.splice(this.selected_subtypes.indexOf(text), 1);
      } else {
        this.selected_subtypes.push(text);
      }
      if (this.selected_subtypes.length > 0) {
        for (let i = 0; i < this.selected_subtypes.length; i++) {
          if (i == 0) {
            this.subtypes = `subtype[]=${this.selected_subtypes[i]}`;
          } else {
            this.subtypes =
              this.subtypes + `&subtype[]=${this.selected_subtypes[i]}`;
          }
        }
        var query = `/api/v1/services/search?q=${this.searchTerm}&page=${this.currentPage}&${this.subtypes}`;
        this.getServices(query);
      } else {
        query = `/api/v1/services/search?q=${this.searchTerm}&page=${this.currentPage}&${this.types}`;
        this.getServices(query);
      }
    },
    async getServices(query) {
      var response = await this.$axios.$get(query);
      this.total_services = response.total;
      this.services = response.services;
      const infoWindow = {};
      const subtype_count = response.subtype;
      for (let i = 0; i < this.services_map.length; i++) {
        infoWindow[this.services_map[i].id] = false;
        if (this.services_map[i].images_urls.length > 0) {
          this.services_map[i].first_image =
            this.services_map[i].images_urls[0];
        } else {
          this.services_map[
            i
          ].first_image = require("~/assets/images/no_images.webp");
        }
      }
      this.infoWindow = infoWindow;
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  h2 {
    font-size: 1.2rem;
  }
}
ul {
  padding-left: 0;
}
.searchbar {
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;
  margin-top: 20px;
  grid-column: 1 / 4;
  margin-left: 0;
  margin-right: 0;
  @media screen and (max-width: 768px) {
    width: 91%;
  }
}

.servicegrid {
  align-items: center;
  flex-direction: column;
  min-height: 100%;
  display: flex;
  padding-left: 0px;
  margin-left: 7.5vw;
  margin-right: 7.5vw;
  @media screen and (max-width: 768px) {
    margin: 0;
  }
}

.resultados {
  width: 90%;
  background-color: #666666;
  color: white;
  text-align: center;
  border-radius: 10px 10px 10px 10px;
  grid-column: 2 / 4;
  margin-right: 0;
  padding: 10px;
  align-self: center;
  @media screen and (max-width: 1200px) {
    margin-right: 10px;
  }
  @media screen and (max-width: 768px) {
    grid-column: 1 / 1;
    border-radius: 10px 10px 0px 0px;
  }


}
.filtros {
  width: 90%;
  margin-top: 10px;
  align-content: space-between;
  gap: 0.5rem;
  display: none;
  @media screen and (max-width: 768px) {
    display: inline-flex;
  }
}
.dropdown {
  position: relative;
  background-color: #f4f4f4;
  color: black;
  border: 1px solid #dadada;
  border-radius: 5px;
  padding: 10px;
  min-width: 18%;
  display: grid;
  margin-left: 1vw;
  height: 44px;
  @media screen and (max-width: 768px) {
    min-width: 49%;
    margin-left: 0;
  }
}
.dropdown-content {
  display: none;
  text-align: center;
  margin-top: 39px;
  z-index: 46;
  padding: 8px;
  position: absolute;
  background-color: #f4f4f4;
  border: 1px solid #dadada;
  width: 100%;
}
.dropdown-content a {
  color: black;
  text-decoration: none;
  display: block;
  font-size: 0.7rem;
  padding-left: 0.2rem;
}
.grid {
  display: grid;
  grid-gap: 1rem;
  flex: 2;
  padding-top: 17px;
  grid-template-columns: 1fr 1fr;
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  padding-right: 1vw;
  padding-left: 1vw;
  @media screen and (max-width: 768px) {
    padding-top: 8px;
    grid-gap: 0.8rem;
    padding-right: 5%;
    padding-left: 5%;
  }
}

.space {
  justify-content: space-between;
}

.map {
  grid-row: 3 / 4;
  grid-column: 3 / 4;
  align-self: baseline;
  margin-top: 1rem;
  @media screen and (max-width: 768px) {
    margin: 0;
    align-self: center;
  }
}
.order {
  grid-column: 2 / 4;
  display: flex;
  gap: 1rem;
  width: 87.5%;
  margin-left: 12.5%;
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    margin-left: 15%;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.filtercard {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  padding: 1rem;
  margin-top: 16px;
  max-width: 12.5%;
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    max-width: 15%;
  }
}
/* The container */
.container_2 {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 7px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: start;
  @media screen and (max-width: 768px) {
    font-size: 10px;
    padding-left: 25px;
    padding-top: 3px;
  }
}

/* Hide the browser's default checkbox */
.container_2 input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 8px;
  left: 6px;
  height: 15px;
  width: 15px;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
}

/* On mouse-over, add a grey background color */
.container_2:hover input ~ .checkmark {
  background-color: white;
}

/* When the checkbox is checked, add a blue background */
.container_2 input:checked ~ .checkmark {
  background-color: #f4f4f4;
  border: 0;
  height: 25px;
  width: 25px;
  top: 0;
  left: 0;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container_2 input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container_2 .checkmark:after {
  left: 9px;
  top: 5px;
  width: 8px;
  height: 16px;
  border: solid black;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.subtype {
  margin-bottom: 0;
  align-self: start;
  display: flex;
  font-size: 1.2rem;
  padding-left: 0.3rem;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
}
.order_text {
  font-size: large;
  @media screen and (max-width: 1200px) {
    font-size: medium;
  }
  @media screen and (max-width: 768px) and (min-width: 1400px) {
    font-size: x-large;
  }
}
.show {
  display: grid;
  border-top: 0px;
}
.mobile {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
}
.desktop {
  display: flex;
  width: 100%;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.filter_title {
  font-size: 1rem;
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    font-size: 0.8rem;
  }
}
</style>
