<template>
  <div>
    <gmap-map
      :center="cordinates"
      :zoom="zoom"
      :disable-double-click-zoom="true"
      :draggable="true"
      map-type-id="terrain"
      style="width: 100%"
      class="map w-full h-full map-container-4"
    >
      <gmap-marker
        v-for="service in services"
        :key="`service-mark-${service.id}`"
        :position="{ lat: service.lat, lng: service.lng }"
        @click="showService(service.id)"
      />
      <gmap-info-window
        v-for="service in services"
        :key="`service-info-${service.id}`"
        :position="{ lat: service.lat, lng: service.lng }"
        :opened="infoWindow[service.id]"
        @closeclick="infoWindow[service.id] = false"
        style="width: auto; max-height: 80px"
      >
        <div class="info-window">
          <div class="img">
            <img :src="service.first_image" alt="Rutero" style="max-width: 80px;"/>
          </div>
          <div class = "info">
            <h6 style="margin-bottom: 0.25rem;">{{ service.name }}</h6>
            <h6 style="color:#33aca6; margin-bottom: 0.25rem;"> {{ "[ " + service.subtype  + " ]"}}</h6>
          </div>
          <nuxt-link :to="`/services/${service.id}`">
            <button class="btn more">Ver más</button>
          </nuxt-link>
          <div style="text-align: end;">
            <h6 style="margin-bottom: 0;">Desde</h6>
            <h6> {{ service.min_value }}  </h6>
          </div>
        </div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>

import SearchBoxBar from "~/components/SearchBoxBar/SearchBoxBar.vue";
import axios from "axios";
import { plural, toCLP } from "@/plugins/helpers";


export default {
  layout: "admin",
  data() {
    return {
      cordinates: { lat: -33.4488897, lng: -70.6692655 },
      zoom: 5,
    };
  },
  components: {
    SearchBoxBar,
  },
  async asyncData({ params }) {
    const services = [];
    const response = await axios.get(
      `https://rutero-backend.herokuapp.com/api/v1/services/active_services`
    );
    for (let i = 0; i < response.data.length; i++) {
      const service = response.data[i];
      if (service.service.min_value) {
        service.service.min_value = toCLP(service.service.min_value);
      }
      if (service.service.type == 1) {
        service.service.type = "Actividades";
      } else {
        service.service.type = "Alojamientos";
      }
      if (service.service.lat && service.service.lng) {
        services.push(service.service);
      } 
    }
    const infoWindow = {};
    services.forEach((service) => {
      infoWindow[service.id] = false;
    });
    return {
      services,
      infoWindow,
    };
  },
  methods: {
    showService(id) {
      for (let service of this.services) {
        if (service.id == id) {
          this.infoWindow[service.id] = true;
          // centrar mapa
          this.cordinates = { lat: service.lat, lng: service.lng };
        } else {
          this.infoWindow[service.id] = false;
        }
      }
    },
  },
  computed: {
    plural: () => plural,
    toCLP: () => toCLP,
  },
};
</script>

 <style scoped>

.map-container-4 {
  width: 100vw !important;
  height: 98vh !important;
}

.info-window {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
}

.more {
  background-color: #33aca6 !important;
  color: white !important;
  font-size: inherit !important;
}
</style>
