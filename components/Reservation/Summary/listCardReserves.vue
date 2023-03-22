<template> 
  <div v-if="reserva" class="bg-gray-200 p-4 rounded-md">
    <div  class="grid1" >
      <div class="imagen-card" v-if="reserva.images_urls.length">
        <img
          :src="reserva.images_urls[0]"
          class="object-cover object-center"
          alt="Imagen de servicio"
          style="height: 100%; width: 100%"
          
        />
      </div>
      <li class="names">
        <h4 class="nombreServicio">{{ reserva.name }}</h4>
        <h5 class="nombreProducto mt-2">
          {{ reserva.productName }}
        </h5>
        <div class="mt-2" v-if="reserva.to != null">
          <li class="border-t border-gray-200 flex">
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
          <li class="border-t border-gray-200 flex"></li>
        </div>
        <div class="mt-2" v-else>
          <li class="border-t border-gray-200 flex">
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
      </li>
      <div class="estado-conteiner">
        <div class="text-gray-700 preciosmobile" style="font-size: x-large;">
          <div v-if="reserva && reserva != null">
            <strong>Total:&nbsp;</strong>
            <strong class="text-gray-900" style="color: #33aca6">{{
              this.toCLP(reserva.totalPrice ? reserva.totalPrice : 0)
            }}</strong>
          </div>
        </div>
        <h6  class="titulo-estado">Estado:</h6>
        <button v-if="reserva.status === 1" disabled class="estado" style="background-color: #fcee21;font-weight: 700;" >Pendiente</button>
        <span v-if="reserva.status === 1">¡A la espera de Confirmación!</span>
        <button v-else-if="reserva.status === 2" disabled class="estado" style="background-color: #39b54a" >Confirmada</button>
        <button v-else-if="reserva.status === 4 && $auth.user.type === 'admin'" disabled class="estado" style="background-color: #ed1c24" >Cancelada</button>
        <button v-else disabled class="estado" style="background-color: #ed1c24" >Cancelada</button>
      </div>
      <div class="text-gray-700 precios" style="font-size: x-large;">
        <div v-if="reserva && reserva != null">
          <strong>Total:&nbsp;</strong>
          <strong class="text-gray-900" style="color: #33aca6">{{
            this.toCLP(reserva.totalPrice ? reserva.totalPrice : 0)
          }}</strong>
        </div>
      </div>

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
      window.open(`https://wa.me/${this.reserva.phone}`, "_blank");}
  },
}
</script>
<style lang="scss" scoped>
.nombreServicio{
  margin-bottom: 0;
  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
}
.nombreProducto{
  margin-bottom: 0; 
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
.titulo-estado{
  margin-top: auto;
  @media screen and (max-width: 600px) {
    margin-top: 10px;
  }
}
.estado-conteiner{
  height: min-content;
  margin: auto;
  margin-right: 0px;
  margin-left: 0px;
  @media screen and (max-width: 600px) {
  }
}
.estado {
  height: 3rem;
  background-color: #0fd655;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: auto;
  border-radius: 40px;
  width: 100%;
  margin-bottom: 1rem;
  @media screen and (max-width: 600px) {
    margin-top: 10px;
    margin: 0px;
  }
  
}

.grid1 {
  display: grid;
  grid-template-columns: 11vw 23vw 16vw 13vw;
  grid-gap: 1rem;
  @media screen and (max-width: 600px) {
    display: inline-block;
    grid-template-columns: none;
  }
}

.names {
  grid-column-start: 2;
  list-style-type: none;
  // margin-left: -4rem;
  @media screen and (max-width: 600px) {
    margin-left: 5.5rem;
    margin-top: -5rem;
    margin-bottom: 1rem;
  }
}
.precios {
  height: min-content;
  margin: auto;
  @media screen and (max-width: 600px) {
    display: none;
  }
}
.preciosmobile{
  display: none;
  @media screen and (max-width: 600px) {
    display: block;
    text-align: center;
    height: min-content;
    margin: auto;
  }
}
</style>
