<template>
  <div class="image">
    <img
      src="https://rutero-prod.s3.sa-east-1.amazonaws.com/reserva_exitosa_2.jpg"
      alt="MercadoPago"
      v-if="
        this.$route.query.sitestatus != undefined &&
        this.$route.query.sitestatus != null &&
        this.$route.query.sitestatus == 'success'
      "
    />
    <img
      src="https://rutero-prod.s3.sa-east-1.amazonaws.com/reserva_fracasada.jpg"
      alt="MercadoPago"
      v-else-if="
        this.$route.query.sitestatus != undefined &&
        this.$route.query.sitestatus != null &&
        this.$route.query.sitestatus == 'failure'
      "
    />
    <div v-else style="margin-top: 15rem">
      <h2 class="info">¡Lo sentimos algo ha salido mal, intentalo nuevamente!</h2>
    </div>
  </div>
</template>

<script>
import { pageApp } from "~/plugins/mercadopago.js";

export default {
  name: "CheckoutPage",
  head() {
    return {
      script: [],
    };
  },
  mounted() {
    document.body.style.zoom = "100%";
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.image {
  height: 100%;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  padding: auto;
  @media screen and (max-width: 1025px) {
    width: 80%;
  }
}
.info {
  font-size: 1.5rem;
  font-weight: normal;
  text-align: center;
  margin-top: 10%;
  @media screen and (max-width: 1025px) {
    font-size: 1.2rem;
    margin-top: 25%;
  }
}

.boton {
  background-color: #33aca6;
  border-radius: 10px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 40%;

  @media screen and (max-width: 1025px) {
    font-size: 1.2rem;
    padding: 10px 20px;
  }
}
</style>
