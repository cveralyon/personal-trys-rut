<template>
  <div class="Purshase-container">
    <div class="banner">
      <div class="bannerPhoto">
        <img class="redimension" src="~/assets/images/MP/Banner+-+Mercado+Pago.png" alt="banner-mercadoPago" />
      </div>
    </div>
    <div class="resumen">
      <h2 style="margin-top: 4%; margin-bottom: 4%;text-align: center">Resumen de Reserva</h2>
      <div v-if="cart" class="Purshase-cart-container">
        <div class="row">
          <!-- Carrito -->
          <!-- Elementos del carrito -->
          <div class="w-full max-w-lg mx-auto mt-8 text-gray-800">
            <ul class="bg-gray-100 p-4 rounded-md grid">
              <div v-if="service.images_urls.length">
                <img
                  :src="service.images_urls[0]"
                  class="object-cover object-center"
                  alt="Imagen de servicio"
                  style="max-height: 10rem; min-width: 5rem"
                />
              </div>
              <li>
                <h6 style="margin-bottom: 0">{{ service.name }}</h6>
                <h6 style="margin-bottom: 0; color: darkgray">
                  {{ cart.productName }}
                </h6>
              </li>
              <div class="info">
                <li class="mt-2 mb-2 flex">
                  <svg
                    style="height: 24px; width: 24px; color: rgb(0, 0, 255)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="512"
                    height="512"
                    viewBox="0 0 512 512"
                  >
                    <title>ionicons-v5-n</title>
                    <path
                      d="M256,48c-79.5,0-144,61.39-144,137,0,87,96,224.87,131.25,272.49a15.77,15.77,0,0,0,25.5,0C304,409.89,400,272.07,400,185,400,109.39,335.5,48,256,48Z"
                      style="
                        fill: none;
                        stroke: #000;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: 32px;
                      "
                    ></path>
                    <circle
                      cx="256"
                      cy="192"
                      r="48"
                      style="
                        fill: none;
                        stroke: #000;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: 32px;
                      "
                    ></circle>
                  </svg>
                  &nbsp;&nbsp;{{ service.address }}
                </li>
                <li class="border-t border-gray-200 mt-2 pt-2 flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 mr-4 feather feather-users"
                    data-v-415b920e=""
                  >
                    <path
                      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                      data-v-415b920e=""
                    ></path>
                    <circle cx="9" cy="7" r="4" data-v-415b920e=""></circle>
                    <path
                      d="M23 21v-2a4 4 0 0 0-3-3.87"
                      data-v-415b920e=""
                    ></path>
                    <path
                      d="M16 3.13a4 4 0 0 1 0 7.75"
                      data-v-415b920e=""
                    ></path>
                  </svg>
                  {{
                    cart.adults > 0 ? this.plural(cart.adults, "adulto") : ""
                  }}
                  {{
                    cart.adults > 0 && cart.childs > 0 ? "&nbsp;-&nbsp;" : ""
                  }}
                  {{ cart.childs > 0 ? this.plural(cart.childs, "niño") : "" }}
                </li>
                <div v-if="cart.to != null">
                  <li class="border-t border-gray-200 mt-2 pt-2 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-5 mr-4 feather feather-calendar"
                      data-v-415b920e=""
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                        data-v-415b920e=""
                      ></rect>
                      <line
                        x1="16"
                        y1="2"
                        x2="16"
                        y2="6"
                        data-v-415b920e=""
                      ></line>
                      <line
                        x1="8"
                        y1="2"
                        x2="8"
                        y2="6"
                        data-v-415b920e=""
                      ></line>
                      <line
                        x1="3"
                        y1="10"
                        x2="21"
                        y2="10"
                        data-v-415b920e=""
                      ></line>
                    </svg>
                    {{ cart.from }} - {{ cart.to }}
                  </li>
                  <li class="border-t border-gray-200 mt-2 pt-2 flex"></li>
                </div>
                <div v-else>
                  <li class="border-t border-gray-200 mt-2 pt-2 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-5 mr-4 feather feather-calendar"
                      data-v-415b920e=""
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                        data-v-415b920e=""
                      ></rect>
                      <line
                        x1="16"
                        y1="2"
                        x2="16"
                        y2="6"
                        data-v-415b920e=""
                      ></line>
                      <line
                        x1="8"
                        y1="2"
                        x2="8"
                        y2="6"
                        data-v-415b920e=""
                      ></line>
                      <line
                        x1="3"
                        y1="10"
                        x2="21"
                        y2="10"
                        data-v-415b920e=""
                      ></line>
                    </svg>
                    {{ cart.from }} {{ cart.hora_inicio }}
                  </li>
                </div>
              </div>
              <div
                class="px-4 mt-4 text-md md:text-xl text-right text-gray-700 precios"
              >
                <ul v-if="cart && cart != null">
                  <div v-if="cart.adults != 0">
                    <li>
                      <span>{{
                        this.plural(cart.adults ? cart.adults : 0, "adulto") +
                        " x " +
                        this.toCLP(cart.priceAdult)
                      }}</span>
                    </li>
                  </div>
                  <div v-if="cart.childs != 0">
                    <li>
                      <span>{{
                        this.plural(cart.childs ? cart.childs : 0, "niño") +
                        " x " +
                        this.toCLP(cart.priceChild)
                      }}</span>
                    </li>
                  </div>
                  <div v-if="cart.tipo_agenda === 1">
                    <li style="margin-top: -1rem">
                      <span>{{ "___________________" }}</span>
                    </li>
                    <li>
                      <span>{{
                        this.toCLP(
                          cart.totalPriceNight ? cart.totalPriceNight : 0
                        )
                      }}</span>
                    </li>
                    <li>
                      <span>{{
                        "x " + this.plural(cart.nights, "noche")
                      }}</span>
                    </li>
                  </div>
                  <li style="margin-top: -1rem">
                    <span>{{ "___________________" }}</span>
                  </li>
                  <li>
                    <strong>Total:&nbsp;</strong>
                    <strong class="text-gray-900" style="color: #33aca6">{{
                      this.toCLP(cart.totalPrice ? cart.totalPrice : 0)
                    }}</strong>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="pago">
      <h2 style="text-align: center; margin-top: 4%;margin-bottom: 4%;">Ir a pagar</h2>
      <div v-if="$auth.loggedIn" class="Purshase-registerLogin-container">
        <section class="Purshase-buttonSection">
          <div class="terms-checkbox">
            <input type="checkbox" id="terms-checkbox" v-model="termsAccepted">
            <label for="terms-checkbox">Acepto los <a href="/TerminosyCondiciones" target="_blank" >Términos y Condiciones</a> y la <a href="/PoliticasdeCancelacion" target="_blank">Política de Cancelación</a> de Rutero</label>
          </div>
          <button
            id="create_reservation"
            class="btn btn-primary"
            @click="crearReserva()"
            :disabled="!termsAccepted"
          >
            <img
              src="~/assets/icons/Candado.png"
              alt="candado"
              style="max-width: 17px; display: inline; margin: 5px"
            />
            Ir al Pago
          </button>
          <img
            src="~/assets/images/MP/Mercado+PAgo+Gris.png"
            style="max-width: 12rem; align-self: center; margin-top: 0.5rem"
          />
        </section>
      </div>
      <div v-else class="Purshase-registerLogin-container">
        <div v-if="step === 1">
          <section class="Purshase-buttonSection">
            <button class="btn btn-primary" @click="step = 2">
              Tengo Cuenta
            </button>
            <button class="btn btn-primary" @click="step = 3">
              Registrarme
            </button>
            <img
              src="~/assets/images/icon-rutero.webp"
              alt="rutero-icono"
              style="max-width: 12rem; align-self: center; margin-top: 0.5rem"
            />
          </section>
        </div>
        <div v-if="step === 2" class="register-item register">
          <div class="form-step1">
            <h3>Ingresa a tu cuenta</h3>

            <form @submit.prevent="userLogin">
              <div class="inputs-cont">
                <input
                  v-model="login.email"
                  class="auth-form"
                  placeholder="Correo electrónico"
                />
              </div>
              <br />
              <div class="inputs-cont">
                <input
                  type="password"
                  v-model="login.password"
                  class="auth-form"
                  placeholder="Contraseña"
                />
              </div>
              <div>
                <button style="margin-top: 1rem" class="btn">Ingresar</button>
              </div>
            </form>
            <nuxt-link to="/" class="auth-link">Recuperar contraseña</nuxt-link>
          </div>
        </div>
        <div v-if="step === 3" class="register-item">
          <div class="form-step1">
            <h3>Registrate</h3>
            <RegisterBoxForm />
          </div>
        </div>
      </div>
      <div 
        class="cond-unicasMobile">
        <img style="width: -webkit-fill-available;" src="/landing/c-unicas.webp" alt="cond-unicas" >
      </div>
    </div>
    
  </div>
</template>

<script>
import { plural, toCLP } from "@/plugins/helpers";
import { ruteroApp } from "@/plugins/mercadopago.js";

export default {
  head() {
    return {
      script: [
        { src: "https://www.mercadopago.com/v2/security.js", view: "checkout" },
      ],
    };
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      termsAccepted: false,
      step: 1,
    };
  },
  props: ["cart", "service"],
  computed: {
    plural: () => plural,
    toCLP: () => toCLP,
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
      } catch (err) {
        if (err.response.status === 401) {
          alert("Usuario o contraseña incorrectos");
          this.step = 1;
        } else {
          alert("Ha ocurrido un error");
          this.step = 1;
        }
      }
    },
    sumaPrecios() {
      var total = 0;
      for (var i = 0; i < this.cart.length; i++) {
        total += parseInt(this.cart[i].price);
      }
      return total;
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
        ref: localStorage.getItem("ref"),
      };    
      this.$axios
        .$post(
          "/api/v1/reservations",
          {
            reservation: reserva,
          },
          {
            headers: {
              Authorization: this.$auth.strategy.token.get(),
            },
          }
        )
        .then((response) => {
          window.location.href = response["preference_data"]["init_point"];
        })
        .catch((error) => {
          if (error.response.status === 422) {
            alert(
              "Los administradores no estan habilitados para hacer reservas"
            );
            window.location.reload();
          }
        });
    },
  },
};
</script>

<style scoped lang="scss" scoped>
.inputs-cont {
  display: grid;
}
.terms-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-left: 5px;
  font-size: small;
}

.terms-checkbox label {
  margin-left: 0.5rem;
}

.cond-unicasMobile {
  margin-top: 1rem;
  padding: 5%;
  border-radius: 20px;
  width: 30rem;
  @media screen and (max-width: 768px) {
    width: auto;
  }
}
.auth-form {
  color: #000000;
  border: 0.0625rem solid white;
  border-radius: 0.375rem;
  padding: 0.5rem 0.9375rem 0.5rem;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.375;
}

.auth-link {
  color: rgb(104, 102, 102);
  font-size: 0.8125rem;
  font-weight: 600;
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  text-decoration: none;
  font-family: "Barlow", sans-serif;
}
.btn {
  background-color: #4fd1c5;
  border-color: #4fd1c5;
  margin: 0.2rem;
  cursor: pointer;

}
.Purshase-buttonSection {
  display: flex;
  flex-direction: column;
}
.Purshase-container {
  display: grid;
  flex-direction: column;
  align-items: self-start;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  @media screen and (max-width: 768px) {
    display: flex;
  }
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
  @media screen and (max-width: 600px) {
    width: 90vw;
  }
}
.Purshase-cart-container {
  width: 30rem;
  display: block;
  margin: auto;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-between;
  height: auto;
  padding: 1.5rem;
  background-color: #ebe8e8;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  @media screen and (max-width: 600px) {
    width: 90vw;
  }
}
.grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1rem;
  @media screen and (max-width: 600px) {
    grid-gap: 0.6rem;
  }
}
.info {
  grid-column: 1 / 3;
}

.precios {
  margin-top: -1rem;
  grid-column: 2 / 4;
  @media screen and (max-width: 600px) {
    grid-column: 1 / 3;
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
      align-self: auto;
      padding: 0;
    }
  }
}
.bannerPhoto {
  max-width:100%;
  max-height:100%;
  @media screen and (max-width: 768px) {
    align-self: center;
  }
}
img.redimension {
  height:100%;
  width: 100%;

}
.resumen {
  grid-column: 1 / 1;
  justify-self: right;
  margin: 2rem 0rem 2rem 2rem;
  padding-right: 2rem;
  border-right: 0.0625rem solid #ebe8e8;
  @media screen and (max-width: 768px) {
    padding: 0;
    margin: auto;
    border-right: none;
  }
}

.pago {
  grid-column: 2 / 2;
  justify-self: left;
  padding: 2rem;
  margin-bottom: 12rem;
  @media screen and (max-width: 768px) {
    padding: 0;
    margin-top: 0;
  }
}
</style>
