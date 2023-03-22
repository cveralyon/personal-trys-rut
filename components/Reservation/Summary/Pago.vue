<template>
  <div class="Purshase-registerLogin-container">
    <button
      id="closeMobileQuestion"
      type="button"
      class="absolute top-0 right-0 z-10 btn-close-question"
      v-if="hidden"
      @click="hidden = !hidden">
      <x-circle-icon
        id="btnClosePopupQuestionMobile"
        class="text-gray-700"
        style="margin: 10px"/>
    </button>
    <div v-show="hidden" id="paymentBrick_container"></div>
    <section v-show="!hidden" class="Purshase-buttonSection">
        <button 
          v-if="$auth.loggedIn"
          id="create_reservation"
          class="btn btn-primary"
          @click="crearReserva()"
        >
          <img
            src="~/assets/icons/Candado.png"
            alt="candado"
            style="max-width: 17px; display: inline; margin: 5px"
          />
          Ir al Pago
        </button>
        <button 
        v-else
        id="create_reservation"
        class="btn btn-primary"
        @click="OpenPopupRegister()">
        <img
          src="~/assets/icons/Candado.png"
          alt="candado"
          style="max-width: 17px; display: inline; margin: 5px"
        />
        Ir al Pago
        </button>
    </section>
    <img
      src="~/assets/images/MP/Mercado+PAgo+Gris.png"
      style="max-width: 12rem; align-self: center; margin-top: 2rem;margin-bottom: 0rem;"
    />
  </div>
</template>

<script>
import { XCircleIcon } from 'vue-feather-icons'
export default {
  head() {
    return {
      script: [
        { src: "https://sdk.mercadopago.com/js/v2" },
        { src: "https://www.mercadopago.com/v2/security.js", view: "checkout" },
      ],
    };
  },
  data() {
    return {
      hidden: false,
      instance: false,
    };
  },
  components: {
    XCircleIcon,
  },
  props: {
    cart: {
      type: Object,
      required: true,
    },
  },
  watch: {
    hidden(newVal) {
      if (newVal) {
        console.log("hidden: ", this.hidden);
      }
    },
    mustBeLogged(newVal) {
      this.mustBeLogged = newVal;
    },
  },
  methods: {
    obmustBeLogged(args) {
      this.mustBeLogged = args;
    },
    crearReserva() {
      var reserva = {
        product_id: this.cart.productId,
        user_id: this.$auth.user.id,
        start_date: this.cart.from,
        end_date: this.cart.to,
        adults: this.cart.adults,
        kids: this.cart.childs,
        nights: this.cart.nights,
        total_cost: this.cart.totalPrice,
        status_reservation: 0,
        device_id: MP_DEVICE_SESSION_ID,
      };
      document.getElementById('pago').style.marginBottom = '0px';
      document.getElementById('pago').style.marginTop = '0px';
      if (!this.instance) {
        this.$instancePaymentBricks(reserva);
        this.instance = true;
        this.hidden = true;
      } else {
        this.hidden = true;
      }
    },
    OpenPopupRegister() {
      this.mustBeLogged = true;
      this.$emit("popup", true);
    },

  },

}
</script>

<style lang="scss" scoped>
.btn {
  background-color: #4fd1c5;
  border-color: #4fd1c5;
  margin: 0.2rem;
}
.Purshase-buttonSection {
  display: flex;
  flex-direction: column;
}
.Purshase-registerLogin-container {
  width: 30rem;
  display: block;
  margin: auto;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-between;
  height: auto;
  padding: 1.5rem;
  background-color: #ebe8e8;
  border-radius: 0.5rem;
  display: flex;
  @media screen and (max-width: 600px) {
    width: 96vw;
    margin: 0;
  }
}
</style>
