<template>
  <div class="Purshase-container">
    <div class="banner">
      <img src="~/assets/images/MP/Banner+-+Mercado+Pago.png" alt="mercadoPago-banner" />
    </div>
    <Summary class="resumen" :cart="cart" :service="service" />

    <div id="Paymobil"  class="fixed left-0 bottom-0 w-full pagosticky">
      <div class="flex flex-col z-20 m-2 rounded-md overflow-y-auto"
        style="box-shadow: 0 0 1rem #929496">
        <div >
          <div class="pago" >
            <Pago v-if="!mostrarweb" id="pago" :cart="cart" @popup = "obmustBeLogged"/>
          </div>           
        </div>
      </div>
    </div>
    
    <div  id="Payweb" class="pago pagoWeb" >
      <h2 style="text-align: center; margin-top: 4%;margin-bottom: 4%;">Ir a pagar</h2>
      <Pago v-if="mostrarweb" id="pago" :cart="cart" @popup = "obmustBeLogged"/>
    </div>

    <div v-if="mustBeLogged">
      <Popuplogin @closePopup="mustBeLogged = !mustBeLogged" />
    </div>
  </div>
</template>

<script>
import { XCircleIcon } from 'vue-feather-icons'
import { plural, toCLP } from "@/plugins/helpers";
import Summary from "./Summary/Summary.vue";
import Popuplogin from "@/components/Popuplogin.vue";
import Pago from "./Summary/Pago.vue";

export default {
  name: "ReserveSummaryBricks",
  components: {
    Summary,
    Popuplogin,
    Pago,
    XCircleIcon,
  },
  data() {
    return {
      QuestionmobileFormShown: false,
      mustBeLogged: false,
      mostrarmobil: false,
      mostrarweb: false,
    };
  },
  props: ["cart", "service"],
  computed: {
    plural: () => plural,
    toCLP: () => toCLP,
  },
  created() {
    if (process.browser) {
      window.addEventListener("resize", this.checkScreen);
      this.checkScreen();
    }
  },
  watch: {
    mustBeLogged(newVal) {
      this.mustBeLogged = newVal;
    },
  },
  methods: {
    obmustBeLogged(args) {
      this.mustBeLogged = args;
    },
    hideQuestion() {
      this.QuestionmobileFormShown = !this.QuestionmobileFormShown;
    },
    checkScreen() {
      if (process.browser) {
        this.winsowWidth = window.innerWidth;
        if (this.winsowWidth <= 1025) {
          this.mostrarweb = false;
          return;
        }
        this.mostrarweb = true;
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.Purshase-container {
  display: grid;
  flex-direction: column;
  align-items: self-start;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;

  }
}
.banner {
  background-color: #03b5fc;
  width: 100%;
  height: 4rem;
  align-self: center;
  display: flex;
  justify-content: center;
  grid-column: 1 / 3;
  // margin-top: 1%;
  img {
    width: 40%;
    height: 100%;
    max-width: 40rem;
    padding-top: 0.8rem;
    padding-bottom: 0.7rem;
  }
  @media screen and (max-width: 768px) {
    img {
      width: 70%;
    }
  }
  @media screen and (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 3rem;
    // margin-top: 20px;
    img {
      width: 100%;
      max-height: 2rem;
      align-self: center;
      padding: 0;
    }
  }
}
.resumen {
  grid-column: 1 / 1;
  justify-self: right;
  margin: 2rem 0rem 2rem 2rem;
  padding-right: 2rem;
  border-right: 0.0625rem solid #ebe8e8;
  @media screen and (max-width: 768px) {
    padding: 0;
    margin: 0;
    border-right: none;
  }
}
.pago {
  grid-column: 2 / 2;
  justify-self: left;
  padding: 2rem;
  margin-bottom: 12rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 0;
    margin: auto;
    padding: 0;
    margin-top: 0;
  }
}
.pagoWeb {
  @media screen and (max-width: 768px) {
      display: none;

  }
}
.pagosticky {
  display: none;
  z-index: 4;
  max-height: 45rem;
  overflow: scroll;

  @media screen and (max-width: 1025px) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: block;
  }
  
}
</style>
