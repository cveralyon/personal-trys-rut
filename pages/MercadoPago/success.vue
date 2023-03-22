<template>
  <div>
    <div class="background">
      <div class="image">
        <img
          src="~/assets/images/MP/mercadopago.webp"
          alt="MercadoPago"
        />
      </div>
    </div>
    <div class="background_2">
      <h2 class="message">
        Se ha conectado tu cuenta con MercadoPago exitosamente!
      </h2>
    </div>
  </div>
</template>

<script>
import { mercadopagoApp } from "~/plugins/mercadopago.js";
export default {
  head() {
		return {
			title: "Rutero |  MercadoPago",
			meta: [
			{
				hid: "",
				name: "",
				content: "",
			},
			],
		};
	},
  mounted() {
    mercadopagoApp.companyGetAuthApi(
      this.$route.query.code,
      this.$route.query.state
      // this.$auth.strategy.token.get()
    );
    if (this.$route.query.code == null || this.$route.query.code == undefined) {
      if (this.$auth.user.company_id) {
        mercadopagoApp.companyRedirectToMP(this.$auth.user.company_id);
      }
    }
  },
};
</script>

 <style scoped>
.background {
  background-color: #009ee3;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 50vh;
  width: 100vw;
}
.background_2 {
  background-color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 50vh;
  width: 100vw;
}
.image {
  padding: 20%;
  height: 80%;
  width: 80%;
  margin: auto;
}
.message {
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  margin-top: 10%;
  @media screen and (max-width: 1025px) {
    margin-top: 10%;
  }
}
</style>
