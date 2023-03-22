<template>
  <div>
    <div v-if="banner && service.id != 5319" class="banner">
      <div class="bannerPhoto">
        <img
          class="redimension"
          alt="banner-royal"
          src="~/assets/images/RoyalGuard/logo_royal.png"
        />
      </div>
      <p class="bannertext">| Reserva hoy y llévate un 24 Pack ¡GRATIS!</p>
    </div>
    <div v-if="step === 1" class="container-main">
      <div v-if="!service.images_urls || !service.images_urls.length">
        <ImgShow
          :items="[require('~/assets/images/no_images.webp')]"
          :service="service"
        />
        <SocialHead :title="service.name" :image="'/rutero_logo.png'" />
      </div>
      <div v-else>
        <ImgShow
          :items="service.images_urls"
          :minis="service.images_mini"
          :service="service"
        />
        <SocialHead :title="service.name" :image="service.images_urls[0]" />
      </div>
      <div class="services-cont">
        <!-- Informacion del servicio como nombre, descripcion, etc -->
        <div class="data-service-container">
          <div class="subtype flex">
            {{ service.subtype }}
          </div>

          <div class="flex items-start mt-4 justify-between">
            <div v-if="service.name">
              <h1
                class="text-gray-900 text-xxl font-semibold"
                style="margin-bottom: 5%"
              >
                {{ service.name }}
              </h1>
            </div>
          </div>

          <h3
            class="text-gray-800 text-md address"
            v-if="service.address"
            style="margin-bottom: 1%"
          >
            {{ service.address }}
          </h3>
          <h2
            class="text-gray-600 text-md direccion"
            v-if="this.direccion"
            style="margin-bottom: 1%"
          >
            {{ this.direccion }}
          </h2>
          <h3
            class="text-gray-400 text-md localidad"
            v-if="this.localidad"
            style="margin-bottom: 1%"
          >
            {{ this.localidad }}
          </h3>

          <div v-if="service.rating">
            <star-rating
              :increment="0.1"
              :max-rating="5"
              :star-size="16"
              :show-rating="false"
              :read-only="true"
              :rating="Number(service.rating)"
            />
          </div>
          <!-- //aqui parte la descipcion-->
          <li class="border-t border-gray-200 flex mt-4"></li>
          <!-- Con read more -->
          <!-- <ReadMore
            v-if="service.description"
            :longText="service.description"
          /> -->
          <div class="condUnicasMobile">
            <img
              class="redimension"
              src="/landing/c-unicas.webp"
              alt="cond-unicas"
            />
          </div>
          <!-- Sin read more -->
          <div v-if="service.description">
            <app-content
              tag="article"
              class="mt-6 leading-relaxed text-sm"
              :html="service.description"
            />
          </div>
          <br />
        </div>
        <!-- ++++++++++++=========BLOQUE DE COMPONENTES WEB VIEW==========++++++++++++++ -->
        <!-- Este es el bloque de los forms web  -->
        <div class="boxes">
          <ReserveForm
            v-if="service.status == 2"
            class="form-sticky"
            :products="service.products"
            :isActivity="isActivity()"
            :min_price="min_price"
            @obtainNewStep="obNewStep"
            @obtainFares="obFares"
          />
          <FreeForm v-else class="form-sticky" />
          <!-- Termina el bloque de los forms web  -->
          <div
            class="form-sticky"
            style="margin-top: 1rem; padding: 5%; border-radius: 20px"
          >
            <img
              style="width: -webkit-fill-available"
              src="/landing/c-unicas.webp"
              alt="cond-unicas"
            />
          </div>
          <!-- Este es el bloque de questions web  -->
          <Questions
            :service="service"
            class="form-question-sticky"
            @mustBeLogged="obmustBeLogged"
          />
          <!-- Termina el bloque de questions web  -->
          <QuestionsView :service="service" class="form-question-sticky-2" />
        </div>
        <!-- ++++++++++++=========FIN BLOQUE WEB VIEW==========++++++++++++++ -->
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 reserve-form-container">
        <!-- ++++++++++++=========BLOQUE DE COMPONENTES MOBILE VIEW==========++++++++++++++ -->
        <!-- Este es el bloque de los forms mobile  -->
        <div
          id="reserveFromeMobileContainerMAIN"
          class="fixed left-0 bottom-0 w-full form"
        >
          <div
            id="reserveFromeMobileContainer"
            style="background-color: white"
            class="shadow-spread flex flex-col m-2 rounded-md overflow-y-auto"
            :class="{ '': !mobileFormShown }"
          >
            <div
              v-if="!mobileFormShown"
              class="flex justify-between items-center"
            >
              <!-- MALA PRACTICA PERO ES LO UNICO QUE FUNCIONA  -->
              <div v-if="service.products">
                <div v-if="service.products.length > 0">
                  <div v-if="service.products[0].price_adult">
                    <span class="text-gray-900">
                      <small class="text-gray-700">Desde</small>
                      <strong class="block">
                        {{ this.min_price }}
                      </strong>
                    </span>
                  </div>
                  <div v-else>
                    <span class="text-gray-900">
                      <strong class="block">
                        <small class="text-gray-700">Desde</small>
                        {{ "-" }}
                      </strong>
                    </span>
                  </div>
                </div>
                <div v-else>
                  <span class="text-gray-900">
                    <small class="text-gray-700">Desde</small>
                    <strong class="block">
                      {{ "-" }}
                    </strong>
                  </span>
                </div>
              </div>
              <div v-else>
                <span class="text-gray-900">
                  <small class="text-gray-700">Desde</small>
                  <strong class="block">
                    {{ "-" }}
                  </strong>
                </span>
              </div>
              <!-- FIN DE MALA PRACTICA PERO ES LO UNICO QUE FUNCIONA -->
              <button
                type="button"
                class="submit flex-1 mx-6 text-white font-bold rounded-md submit-btn"
                @click="showReserveMovile"
              >
                Reservar
              </button>
            </div>

            <div v-if="mobileFormShown">
              <button
                type="button"
                class="absolute top-0 right-0 m-4 z-10"
                @click="hideReserveMovile"
              >
                <x-circle-icon
                  id="btnClosePopupReserveMobile"
                  class="text-gray-700"
                  style="margin: -6px"
                />
              </button>
              <ReserveForm
                v-if="service.status == 2"
                :products="service.products"
                :isActivity="isActivity()"
                :min_price="min_price"
                @obtainNewStep="obNewStep"
                @obtainFares="obFares"
              />
              <FreeForm v-else />
            </div>
          </div>
        </div>
        <!-- Termina el bloque de los forms mobile  -->
        <!-- Este es el bloque de question mobile  -->
        <div
          id="mobileQuestionContainer"
          class="fixed left-0 bottom-0 w-full form"
          style="display: contents"
        >
          <div
            class="flex flex-col z-20 m-2 rounded-md overflow-y-auto"
            style="box-shadow: 0 0 1rem #929496"
          >
            <div
              v-if="!QuestionmobileFormShown"
              class="flex justify-between items-center"
            >
              <button
                type="button"
                class="d-md-none btn-questions-mobile"
                @click="showQuestion"
              >
                <img
                  class="wsp"
                  src="https://rutero-prod.s3.sa-east-1.amazonaws.com/img/WhatsApp.svg.webp"
                />Haz una pregunta
              </button>
            </div>

            <div v-if="QuestionmobileFormShown">
              <button
                id="closeMobileQuestion"
                type="button"
                class="absolute top-0 right-0 z-10 btn-close-question"
                @click="hideQuestion"
              >
                <x-circle-icon
                  id="btnClosePopupQuestionMobile"
                  class="text-gray-700"
                  style="margin: 10px"
                />
              </button>
              <Questions :service="service" @mustBeLogged="obmustBeLogged" />
            </div>
          </div>
        </div>
        <!-- Termina el bloque de question mobile  -->
        <!-- ++++++++++++=========FIN BLOQUE MOBILE VIEW==========++++++++++++++ -->
      </div>
      <div v-if="service.lng && service.lat" class="mapa">
        <li class="border-t border-gray-200 mt-4 pt-4 flex"></li>
        <h4 class="font-bold text-lg mb-4">Ubicación</h4>
        <gmap-map
          :center="{ lat: service.lat, lng: service.lng }"
          :zoom="10"
          map-type-id="terrain"
          class="w-full h-64"
        >
          <gmap-marker
            :position="{ lat: service.lat, lng: service.lng }"
            :clickable="true"
            @click="showInfoWindow"
          />
          <gmap-info-window
            :position="{ lat: service.lat, lng: service.lng }"
            :key="service.id"
            :options="{ maxWidth: '150px' }"
            :opened="infoWindowOpened"
            @closeclick="infoWindowOpened = false"
          >
            <div>
              <h4 style="font-size: medium">{{ service.name }}</h4>
              <p style="margin-bottom: 0.5rem">{{ service.address }}</p>
              <star-rating
                v-if="service.rating"
                :increment="0.1"
                :max-rating="5"
                :star-size="16"
                :show-rating="false"
                :read-only="true"
                :rating="Number(service.rating)"
                style="margin-bottom: 0.5rem"
              />
              <div class="view-link">
                <a
                  target="_blank"
                  style="
                    text-decoration: none;
                    color: #1a73e8;
                    cursor: pointer;
                    padding-bottom: 10px;
                  "
                  @click="gotomap"
                  ><span>Ver en Google Maps</span></a
                >
              </div>
            </div>
          </gmap-info-window>
        </gmap-map>
      </div>
      <div class="question">
        <QuestionsView :service="service" />
      </div>
    </div>
    <div v-if="step === 2 && !test && banner" style="margin-top: 1rem">
      <ReserveSummary :cart="fares" :service="service" />
    </div>
    <div v-else-if="step === 2 && !test">
      <ReserveSummary :cart="fares" :service="service" />
    </div>
    <div v-else-if="step === 2">
      <ReserveSummaryBricks :cart="fares" :service="service" />
    </div>
    <!-- POP UP DE LOGIN/REGITER -->
    <div v-if="mustBeLogged">
      <PopuploginVue @closePopup="mustBeLogged = !mustBeLogged" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PopuploginVue from "~/components/Popuplogin.vue";
import { XCircleIcon } from "vue-feather-icons";
import ImgShow from "@/components/Services/show/ImgShow.vue";
import ReserveSummary from "@/components/Reservation/ReserveSummary.vue";
import ReserveSummaryBricks from "@/components/Reservation/ReserveSummaryBricks.vue";
import Questions from "@/components/Services/show/questions.vue";
import ReserveForm from "@/components/Reservation/Form/ReserveForm.vue";
import AppContent from "~/components/Services/show/AppContent.vue";
import FreeForm from "@/components/Reservation/Form/FreeForm.vue";
import { plural, toCLP } from "@/plugins/helpers";
import SocialHead from "~/components/Landing/SocialHead.vue";
import ReadMore from "~/components/ReadMore.vue";
import QuestionsView from "~/components/Services/show/QuestionsView.vue";

let VueFlux;
let FluxPreloader;
let FluxControls;
if (process.browser) {
  const VF = require("vue-flux");
  VueFlux = VF.VueFlux;
  FluxPreloader = VF.FluxPreloader;
  FluxControls = VF.FluxControls;
}
export default {
  head() {
    return {
      title: "Rutero | " + this.service.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seo_description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            this.service.name +
            ", " +
            this.service.subtype +
            ", " +
            this.service.city +
            ", " +
            this.direccion +
            ", " +
            this.localidad +
            ", camping, carpas camping, camping el sauce, camping valle del elqui, carpa 4 personas, carpa 4 personas, glamping, camping salto del laja, camping en pucón, camping pucón, valdivia camping, acampar, camping 7 tazas, acampado, camping puerto varas, camping villarica, camping lago ranco, trekking, mochila camping, carpa para 6 personas, camping frutillar, carpas de camping, carpas camping, camping cajon del maipo, cajon del maipo camping",
        },
      ],
    };
  },
  components: {
    PopuploginVue,
    XCircleIcon,
    AppContent,
    ReserveForm,
    FreeForm,
    ReserveSummary,
    ReserveSummaryBricks,
    VueFlux,
    FluxControls,
    FluxPreloader,
    ImgShow,
    SocialHead,
    Questions,
    ReadMore,
    QuestionsView,
  },
  data() {
    return {
      questDisp: "none",
      mobileFormShown: false,
      QuestionmobileFormShown: false,
      id: "",
      service: {},
      imagenes: [],
      step: 1,
      mustBeLogged: false,
      transitions: ["slide"],
      options: {
        autoplay: true,
      },
      min_price: "",
      direccion: "",
      localidad: "",
      infoWindowOpened: false,
      seo_description: "",
      test: this.$route.query.test,
      banner: null,
    };
  },
  async asyncData({ params, error }) {
    return await axios
      .get(`https://rutero-backend.herokuapp.com/api/v1/services/${params.id}`)
      .then((res) => {
        // console.log(res.data);
        return {
          service: res.data.data.service,
          id: params.id,
        };
      })
      .catch((e) => {
        error({ statusCode: 404, message: "Post not found" });
      });
  },
  watch: {
    step(newVal) {
      if (newVal === 2) {
        window.scrollTo(0, 0);
      }
    },
    mustBeLogged(newVal) {
      this.mustBeLogged = newVal;
    },
  },
  computed: {
    plural: () => plural,
    toCLP: () => toCLP,
  },
  methods: {
    gotomap() {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${this.service.lat},${this.service.lng}`,
        "_blank"
      );
    },
    isActivity() {
      if (this.service.type == 1) {
        return true;
      } else {
        return false;
      }
    },
    async getService() {
      this.seo_description =
        "¡Reserva y Paga Seguro! " +
        this.service.subtype +
        " en " +
        this.service.city +
        ", " +
        this.service.region +
        ". Cancelación Gratuita. Sin cargo por servicio. Opiniones de usuarios y fotos de " +
        this.service.city;
      if (this.service.products && this.service.products[0].price_adult) {
        this.min_price = this.service.products[0].price_adult;
        for (let i = 0; i < this.service.products.length; i++) {
          if (
            this.service.products[i].price_adult &&
            this.service.products[i].status == 1
          ) {
            if (this.service.products[i].price_adult < this.min_price) {
              this.min_price = this.service.products[i].price_adult;
            }
          }
        }
        this.min_price = toCLP(this.min_price);
      }
      if (this.service.city) {
        this.direccion = this.service.city;
      }
      if (
        this.service.commune &&
        this.service.city &&
        this.service.commune != this.service.city
      ) {
        this.direccion += ", " + this.service.commune;
      }
      if (this.service.commune && !this.service.city) {
        this.direccion = this.service.commune;
      }
      if (this.service.region) {
        this.localidad = this.service.region;
      }
      if (this.service.region && this.service.country) {
        this.localidad += ", " + this.service.country;
      }
      if (this.service.country && !this.service.region) {
        this.localidad = this.service.country;
      }
    },
    obNewStep(args) {
      this.step = args;
    },
    obFares(args) {
      this.fares = args;
    },
    obmustBeLogged(args) {
      this.mustBeLogged = args;
    },
    obtainFromForm() {
      this.obNewStep();
      this.obFares();
    },
    showInfoWindow() {
      this.infoWindowOpened = true;
    },
    showQuestion() {
      document.getElementById("mobileQuestionContainer").style.display =
        "block";
      this.QuestionmobileFormShown = true;
    },
    hideQuestion() {
      document.getElementById("mobileQuestionContainer").style.display =
        "contents";
      this.QuestionmobileFormShown = !this.QuestionmobileFormShown;
    },
    showReserveMovile() {
      document.getElementById(
        "reserveFromeMobileContainer"
      ).style.backgroundColor = "none";
      document.getElementById("reserveFromeMobileContainer").style.padding = 0;
      document.getElementById(
        "reserveFromeMobileContainerMAIN"
      ).style.zIndex = 100;
      this.mobileFormShown = true;
    },
    hideReserveMovile() {
      document.getElementById(
        "reserveFromeMobileContainer"
      ).style.backgroundColor = "white";
      document.getElementById("reserveFromeMobileContainer").style.padding =
        "1rem";
      document.getElementById(
        "reserveFromeMobileContainerMAIN"
      ).style.zIndex = 2;
      this.mobileFormShown = !this.mobileFormShown;
    },
  },
  mounted() {
    this.getService();
    if (localStorage.getItem("ref") === "austerra") {
      this.banner = false;
    } else {
      this.banner = true;
    }
    const utm_source = this.$route.query.utm_source
    const utm_medium = this.$route.query.utm_medium
    const utm_content = this.$route.query.utm_content
    const ref_suda =  utm_source + '_' + utm_medium
    if(utm_medium){
      localStorage.setItem('ref', ref_suda)
    }
    console.log(utm_source, utm_medium, utm_content)


  },
};
</script>

<style lang="scss" scoped>
.wsp {
  margin-inline-start: -12px;
  margin-right: 8px;
  max-height: 34px;
  max-width: 34px;
  display: inline;
}
.btn-close-question {
  padding: 0.3rem;
}
.container-main {
  padding: 0 7.5vw;
  max-width: 1450px;
  @media (min-width: 1450px) {
    margin: 0 auto;
    margin-top: 1rem;
  }
  @media screen and (max-width: 1025px) {
    margin: 0rem;
    padding: 0rem;
    margin-top: 1rem;
  }
}
.subtype {
  margin-top: 0rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  max-width: 7rem;
  background-color: #33aca6;
  margin-bottom: 1rem;
  border-radius: 5px;
  padding: 2px;
  text-align: center;
  justify-content: center;
  @media screen and (max-width: 1025px) {
    margin-top: 1rem;
  }
}
.condUnicasMobile {
  display: none;
  @media screen and (max-width: 1025px) {
    display: block;
    margin: auto;
  }
}
.shadow-spread {
  padding: 1rem;
  box-shadow: 0 0 1rem #929496;
  z-index: 1;
}
.services-cont {
  display: flex;
  width: 100%;
  @media screen and (max-width: 1025px) {
    margin: 0 2rem;
    display: block;
    width: auto;
  }
}
.data-service-container {
  padding-top: 2rem;
  width: 70%;
  margin-right: 1rem;
  @media screen and (max-width: 1025px) {
    padding-top: 0;
    width: 100%;
    margin-right: 0;
  }
}
.reserve-form-container {
  width: 100%;
  max-width: 30rem;
  z-index: 20;
}
h3 {
  font-size: 1.2em;
  font-weight: inherit;
}
img {
  width: 400px;
}
.submit-btn {
  background-color: #33aca6;
  color: white;
  margin-left: 6.5rem;
  margin-right: 0;
  min-height: 3rem;
}
.form-sticky {
  z-index: 80;
  background-color: white;
  // position: sticky;
  // top: 6.5rem;
  @media screen and (max-width: 1025px) {
    display: none;
  }
}
.form-question-sticky {
  z-index: 80;
  margin-top: 1rem;
  // position: sticky;
  // top: 28rem;
  @media screen and (max-width: 1025px) {
    display: none;
  }
}
.form-question-sticky-2 {
  z-index: 80;
  margin-top: 2rem;
  // position: sticky;
  // top: 41rem;
  @media screen and (max-width: 1025px) {
    display: none;
  }
}
.form {
  display: none;
  z-index: 90;
  @media screen and (max-width: 1025px) {
    display: block;
  }
}
.btn-questions-mobile {
  transition: box-shadow 0.3s linear;
  min-width: 200px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
  border-radius: 20px;
  background-color: #fff;
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
  text-align: center;
  padding: 2px 15px;
  font-size: 13px;
  font-weight: 700;
  color: #5b676c;
  display: block !important;
  z-index: 80;
  @media screen and (max-width: 1025px) {
    margin-bottom: 72px;
  }
}
.view-link {
  &:hover {
    text-decoration: underline;
  }
}
.boxes {
  width: 40%;
  margin-left: 1rem;
  margin-top: -5vh;
  @media screen and (min-width: 1100px) {
    margin-top: -7vh;
  }
  @media screen and (min-width: 1150px) {
    margin-top: -9vh;
  }
  @media screen and (min-width: 1200px) {
    margin-top: -11vh;
  }
  @media screen and (min-width: 1450px) {
    margin-top: -13vh;
  }
}
.mapa {
  @media screen and (max-width: 1025px) {
    padding: 0 2rem;
  }
}
.question {
  display: none;
  @media screen and (max-width: 1025px) {
    display: block;
  }
}
.banner {
  background-color: #002855;
  width: 100%;
  height: 4rem;
  align-self: center;
  display: flex;
  justify-content: center;
  grid-column: 1 / 3;
  margin-top: 1%;
  @media screen and (max-width: 768px) {
    img {
      width: 70%;
    }
  }
  @media screen and (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 3rem;
    margin-top: 20px;
    // margin-bottom: 2rem;

    img {
      width: 100%;
      max-height: 2rem;
      align-self: center;
      padding: 0;
    }
  }
}
img.redimension {
  height: 100%;
  width: 100%;
  // @media screen and (max-width: 600px) {
  //   max-width: 21%;
  // }
}
.bannertext {
  margin-bottom: 0px;
  font-size: 20px;
  font-family: sans-serif;
  color: white;
  align-self: center;
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
}
.bannerPhoto {
  max-width: 8%;
  align-self: center;
  max-height: fit-content;
  @media screen and (max-width: 600px) {
    max-width: 21%;
    max-height: 100%;
  }
}
</style>
