<template>
  <div>
      <h2 style="margin-top: 4%;margin-bottom: 4%; text-align: center">Resumen de Reserva</h2>
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
</template>

<script>
import { plural, toCLP } from "@/plugins/helpers";

export default {
  props: ["cart", "service"],
  computed: {
    plural: () => plural,
    toCLP: () => toCLP,
  },  
}
</script>
<style lang="scss" scoped>

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
</style>
