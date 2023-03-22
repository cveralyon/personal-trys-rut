<template>
  <div class="Purshase-container">
    <h2 style="margin: 2rem">Detalles de Reservacion</h2>
    <div class="Purshase-cart-container">
      <div class="row">
        <!-- Carrito -->
        <!-- Elementos del carrito -->
        <div class="w-full max-w-lg mx-auto mt-8 text-gray-800">
          <ul class="bg-gray-100 p-4 rounded-md">
            <li>
              <strong>{{ reserve.productName }}</strong>
            </li>

            <li class="border-t border-gray-200 mt-4 pt-4 flex">
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
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-415b920e=""></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-415b920e=""></path>
              </svg>
              {{ this.plural(reserve.adults, "adulto") }}&nbsp;-&nbsp;
              {{ reserve.kids > 0 ? this.plural(reserve.kids, "niño") : "" }}
            </li>
            <li class="border-t border-gray-200 mt-4 pt-4 flex">
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
                <line x1="16" y1="2" x2="16" y2="6" data-v-415b920e=""></line>
                <line x1="8" y1="2" x2="8" y2="6" data-v-415b920e=""></line>
                <line x1="3" y1="10" x2="21" y2="10" data-v-415b920e=""></line>
              </svg>
              {{ reserve.start_date }} - {{ reserve.end_date }}
            </li>

            <li class="flex justify-between">
              <strong class="text-lg"></strong>
              <strong>{{ this.plural(reserve.nights, "noche") }}</strong>
            </li>
            <li class="flex justify-between border-t border-gray-300 pt-4 mt-4">
              <strong class="text-lg">Total </strong>
              <strong class="text-lg">{{ reserve.total_cost_clp }}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="Purshase-registerLogin-container">
      <section class="Purshase-buttonSection">
        <button class="btn btn-primary" @click="aceptar()">Aceptar</button>
        <button class="btn btn-primary" @click="rechazar()">Rechazar</button>
      </section>
    </div>
    <div style="margin-bottom: 4rem"></div>
  </div>
</template>

<script>
import { plural, toCLP } from '@/plugins/helpers'

export default {
  data () {
    return {
      step: 1
    }
  },
  props: ['reserve'],
  computed: {
    plural: () => plural,
    toCLP: () => toCLP
  },
  methods: {
    aceptar () {
      this.reserve.status_reservation = 2
      this.$axios
        .$patch(
          `/api/v1/reservations/${this.reserve.id}`,
          {
            reservation: this.reserve,
            reservation_token: this.$route.query.auth
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`
            }
          }
        )
        .then((_response) => {
          this.$router.push('../../admin/reservations')
        })
        .catch((_error) => {
          alert('Error al aceptar la reservacion')
        })
    },
    rechazar () {
      this.reserve.status_reservation = 3
      this.$axios
        .$patch(
          `/api/v1/reservations/${this.reserve.id}`,
          {
            reservation: this.reserve,
            reservation_token: this.$route.query.auth
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`
            }
          }
        )
        .then((_response) => {
          this.$router.push('../../admin/reservations')
        })
        .catch((_error) => {
          alert('Error al rechazar la reservacion')
        })
    }
  }
}
</script>

<style scoped>

.btn {
  background-color: #4fd1c5;
  border-color: #4fd1c5;
  margin: 0.2rem;
}
.Purshase-buttonSection {
  display: flex;
  flex-direction: column;
}
.Purshase-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
}
.Purshase-registerLogin-container {
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-between;
  width: -webkit-fill-available;
  height: auto;
  padding: 1.5rem;
  background-color: #ebe8e8;
  border-radius: 0.5rem;
}
.Purshase-cart-container {
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-between;
  height: auto;
  padding: 1.5rem;
  background-color: #ebe8e8;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}
</style>
