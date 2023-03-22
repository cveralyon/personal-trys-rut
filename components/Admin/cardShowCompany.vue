<template> 
  <div v-if="reserva" class="grid0">
    <div class="bg-gray-200 rounded-md grid00">
      <div  class="grid1" >
        <div class="imagen-card"  v-if="reserva.images_urls.length">
          <img
            :src="reserva.images_urls[0]"
            class="object-cover object-center"
            alt="Imagen de servicio"
            style="height: 100%; width: 100%"
            />
        </div>
        <div class="names">
          <h4 class="nombreServicio" >{{ reserva.name.split(' ')[0] }}</h4>
          <h5 class="nombreProducto">
            {{ reserva.productName }}
          </h5>
        </div>
        <div class="info">
          <li class="border-gray-300 mt-2 pt-2 flex">
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
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-415b920e=""></path>
              <circle cx="9" cy="7" r="4" data-v-415b920e=""></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-415b920e=""></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-415b920e=""></path>
            </svg>
            {{
              reserva.adults > 0 ? this.plural(reserva.adults, "adulto") : ""
            }}
            {{
              reserva.adults > 0 && reserva.childs > 0 ? "&nbsp;-&nbsp;" : ""
            }}
            {{ reserva.childs > 0 ? this.plural(reserva.childs, "niño") : "" }}
          </li>
          <div v-if="reserva.to != null">
            <li class="border-t border-gray-300 mt-2 pt-2 flex">
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
              {{ reserva.from }} al {{ reserva.to }}
            </li>
          </div>
          <div v-else>
            <li class="border-t border-gray-300 mt-2 pt-2 flex">
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
              {{ reserva.from }} {{ reserva.hora_inicio }}
            </li>
          </div>
        </div>
        <div
          class="text-right text-gray-700 precios">
          <ul v-if="reserva && reserva != null">
            <div v-if="reserva.adults != 0">
              <li>
                <span>{{
                  this.plural(reserva.adults ? reserva.adults : 0, "adulto") +
                  " x " +
                  this.toCLP(reserva.priceAdult)
                }}</span>
              </li>
            </div>
            <div v-if="reserva.childs != 0">
              <li>
                <span>{{
                  this.plural(reserva.childs ? reserva.childs : 0, "niño") +
                  " x " +
                  this.toCLP(reserva.priceChild)
                }}</span>
              </li>
            </div>
            <div v-if="reserva.tipo_agenda === 1">
              <li style="margin-top: -1rem">
                <span>{{ "___________________" }}</span>
              </li>
              <li>
                <span>{{
                  this.toCLP(
                    reserva.totalPriceNight ? reserva.totalPriceNight : 0
                  )
                }}</span>
              </li>
              <li>
                <span>{{
                  "x " + this.plural(reserva.nights, "noche")
                }}</span>
              </li>
            </div>
            <li style="margin-top: -1rem">
              <span>{{ "___________________" }}</span>
            </li>
            <li>
              <strong>Total:&nbsp;</strong>
              <strong class="text-gray-900" style="color: #33aca6">{{
                this.toCLP(reserva.totalPrice ? reserva.totalPrice : 0)
              }}</strong>
            </li>
          </ul>
        </div>
      </div>
      <div class="grid3">
        <a v-if="reserva.status != 1" type="button" :href="'mailto:'+reserva.email" class="email">
          <NuxtImg format="webp" src="/footer/Email.png" alt="Email-image" title="email" style="max-width:1.5rem;"/>
          Enviar Correo
        </a>
        <a v-if="reserva.status != 1" type="button" :href="'tel:'+reserva.phone" class="phone">
          <NuxtImg format="webp"  src="/footer/Phone.png" alt="Phone-image" title="phone" style="max-width:1.5rem;"/>
          +{{ reserva.phone }}
        </a>
        <a v-if="reserva.status != 1" type="button" @click="gowsp" class="whatsapp" >WhatsApp</a>

      </div>
    </div>
   
    <div class="grid2">
      <h6 style="margin-top: auto;">Estado:</h6>
      <div v-if="reserva.status === 1" class="reserve-buttonos">
        <button  class="estado" style="background-color: #39b54a" @click="aceptar()" >Aceptar</button>
        <button  class="estado" style="background-color: #ed1c24" @click="rechazar()" >Rechazar</button>
      </div>
      <button v-else-if="reserva.status === 2" disabled class="estado" style="background-color: #39b54a" >Confirmada</button>
      <button v-else disabled class="estado" style="background-color: #ed1c24" >Cancelada</button>
      <div v-if="reserva.status != 1" style="align-self: center;" class="border-t border-gray-300 mt-2 pt-2 flex"></div>
      <button v-if="reserva.status != 1" @click="gowspReagendar" class="reagendar" >Reagendar</button>
      <div><span></span></div>
    </div>
  </div>
    
</template>


<script>
import { plural, toCLP } from "@/plugins/helpers";
export default {
  props: ["reserva"],
  computed: {
    plural: () => plural,
    toCLP: () => toCLP,
  },
  data () {
    return {
    }
  },
  methods: {
    
    gowsp() {
      window.open(`https://wa.me/${this.reserva.phone}`, "_blank");
    },
    gowspReagendar() {
      window.open(`https://wa.me/${this.reserva.phone}?text=Hola+${this.reserva.name}%2c+quisiera+cambiar+la+fecha+de+una+reserva+que+tengo+con+ustedes+por+medio+de+Rutero.cl.`, "_blank");
    },
    gowspCancelar() {
      window.open(`https://wa.me/${this.reserva.phone}?text=Hola+${this.reserva.name}%2c+quisiera+cancelar+una+reserva+que+tengo+con+ustedes+por+medio+de+Rutero.cl.`, "_blank");
    },
    aceptar () {
      this.reserva.status_reservation = 2;
      this.$axios
        .$patch(
          `/api/v1/reservations/${this.reserva.id}`,
          {
            reservation: {
              status_reservation: 2
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.$auth.strategy.token.get()}`
            }
          }
        )
        .then((_response) => {
          window.location.reload();
        })
        .catch((_error) => {
          alert('Error al aceptar la reservacion')
        })
    },
    rechazar () {
      this.reserva.status_reservation = 3;
      this.$axios
        .$patch(
          `/api/v1/reservations/${this.reserva.id}`,
          {
            reservation: {
              status_reservation: 3
            },          
          },
          {
            headers: {
              Authorization: `Bearer ${this.$auth.strategy.token.get()}`
            }
          }
        )
        .then((_response) => {
          window.location.reload();
        })
        .catch((_error) => {
          alert('Error al rechazar la reservacion')
        })
    }
  },



}
</script>
<style lang="scss" scoped>
.reserve-buttonos{
  text-align: center;
  display: flex;
  max-height: 70%;
  gap: 0.5rem;
  @media screen and (max-width: 600px) {
    max-height: 100%;
  }
}
.nombreServicio{
  margin-bottom: 5px;
  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
}
.nombreProducto{
  margin-bottom: 5px;
  color: darkgray;
  @media screen and (max-width: 600px) {
  font-size: 14px;
  }
}
.imagen-card{
  height: 11vw; 
  width: 11vw; 
  @media screen and (max-width: 600px) {
    height: 5rem; 
    width: 5rem;
  }
}
.email{
  height: 100%;
  background-color: #9ea0a3;
  color: white;
  padding: 10px;
  align-items: center;
  text-decoration: none;
  display: inline-flex;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%; 
  justify-self: center;
  gap: 6px;
  justify-content: center;
  @media screen and (max-width: 600px) {
    height: auto;
  }

}
.phone{
  gap: 6px;
  height: 100%;
  background-color: #9ea0a3;
  color: white;
  padding: 10px;
  align-items: center;
  text-decoration: none;
  display: inline-flex;
  justify-self: center;
  justify-self: center;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;  
  justify-content: center;
  @media screen and (max-width: 600px) {
    height: auto;
  }
}
.whatsapp {
  gap: 6px;
  justify-self: center;
  height: 100%;
  background-color: #25D366;
  color: white;
  padding: 10px;
  align-items: center;
  text-decoration: none;
  display: inline-flex;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;  
  justify-content: center;
  @media screen and (max-width: 600px) {
    height: auto;
  }
}

.estado {
  height: 100%;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: auto;
  border-radius: 40px;
  width: 100%;
  margin-bottom: 0rem;
  @media screen and (max-width: 600px) {
    height: 130%;
  }
}
.cancelarReserva {
  height: 70%;
  border: none;
  color: #33aca6;
  padding: 0px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  font-weight: 800;
  margin-bottom: 1rem;
}
.cancelarReserva:hover {
    background-color: #27847f;;
    color: white;
}
.reagendar {
  height: 100%;
  background-color: #33aca6;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  font-weight: 700;
  border-radius: 5px;
  width: 100%;
  @media screen and (max-width: 600px) {
    height: 130%;
  }
}
.reagendar:hover {
  background-color: #27847f;

}
.grid0 {
  display: grid;
  width: auto;
  grid-template-columns: 69% 30%;
  grid-gap: 1rem;
  @media screen and (max-width: 600px) {
    background-color: #e5e7eb;
    border-radius: 6px;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 0.6rem;
    padding: 10px;
  }
}
.grid00{
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  @media screen and (max-width: 600px) {
    grid-gap: 0rem;

  }
}
.grid1 {
  padding: 2rem;
  grid-column-start: 1;
  display: grid;
  grid-template-columns: 25% 40% 30%;
  grid-gap: 1rem;
  grid-template-rows: 90px;
  padding-bottom: 0rem;

  @media screen and (min-width: 1800px) {
    grid-template-columns: 11vw 17vw 15vw;
  }

  @media screen and (max-width: 600px) {
    display: block;
    padding: 0px;
  }
}
.grid2 {
  padding-inline: 0.5rem;
  grid-column-start: 2;
  display: grid;
  grid-template-columns: repeat(1,1fr);
  grid-gap: 1rem;
  width: inherit;
  @media screen and (max-width: 600px) {
    grid-column-start: 1;
    display: contents;
    padding-inline: 0.5rem;

  }
}
.grid3 {
  padding-inline: 2rem;
  padding-bottom: 2rem;
  display: grid;
  grid-gap: 1rem;
  width: inherit;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 600px) {
    grid-column-start: 1;
    display: contents;
    padding-inline: 0.5rem;

  }
}


.names {
  grid-column-start: 2;
  grid-column-end: 3;
  list-style-type: none;
  // margin-left: -2.5rem;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 600px) {
    margin-left: 5.8rem;
    margin-top: -5rem;  
  }
}
.info {
  grid-column-start: 1;
  grid-column-end: 2;
  padding-left: 13px;
  min-width: max-content;
  align-self: self-end;
  margin-top: 4vw;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1800px) {
    margin-top: 6vw;
  }
  @media screen and (max-width: 600px) {
    margin-top: 2.5rem;
    padding-left: 0px;
  }

}
.precios {
  grid-column-start: 3;
  font-size: large;
  place-self: end;
  @media screen and (max-width: 600px) {
    padding-bottom: 1rem;
    padding-top: 1.2rem;
  }
}
</style>
