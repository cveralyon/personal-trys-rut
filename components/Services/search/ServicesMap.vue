<template>
	<div class="flex-1 block relative">
		<gmap-map
			v-if="new_services.length"
			:center="cordinates"
			:zoom="zoom"
			:disable-double-click-zoom="true"
			:draggable="true"
			map-type-id="terrain"
			style="width: 100%"
			class="map">
			<gmap-marker
				v-for="service in services"
				:key="`service-mark-${service.id}`"
				:position="{ lat: service.lat, lng: service.lng }"
				@click="showService(service.id)"
				title="pin"
			/>
			<gmap-info-window
				v-for="service in services"
				:key="`service-info-${service.id}`"
				:position="{ lat: service.lat, lng: service.lng }"
				:opened="infoWindow[service.id]"
				@closeclick="infoWindow[service.id] = false"
				style="width: auto; max-height: 80px;"
			>

			<div class="info-window">
				<div class="img">
					<img :src="service.first_image" alt="Rutero" title="rutero_service" style="max-width: 80px; max-height: 80px;"/>
				</div>
				<div class = "info">
					<h6 style="margin-bottom: 0.25rem; font-size: 0.8rem;">{{ service.name }}</h6>
					<h6 style="color:#33aca6; margin-bottom: 0.25rem; font-size: 0.8rem;"> {{ "[ " + service.subtype  + " ]"}}</h6>
				</div>
				<nuxt-link :to="`/services/${service.id}`">
					<button class="btn more">Ver más</button>
				</nuxt-link>
				<div style="text-align: end;" v-if="service.min_value">
					<h6 style="margin-bottom: 0;">Desde</h6>
					<h6> {{ service.min_value_2 }}  </h6>
				</div>
			</div>
			</gmap-info-window>
		</gmap-map>
		<gmap-map
			v-if="new_services.length==0"
			:center="cordinates"
			:zoom="zoom"
			:draggable="true"
			map-type-id="terrain"
			style="width: 100%"
			class="map"
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
				style="width: auto; max-height: 80px;"
			/>
	</gmap-map>

	</div>
</template>

<script>
import { toCLP } from "@/plugins/helpers";

export default {
	props: ["services", "infoWindow"],
	data() {
		return {
			selected: [],
			cordinates: {},
			zoom: 4,
			new_services: [],
		}
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
				if (service.min_value) {
					service.min_value_2 = toCLP(service.min_value);
				}
			}
		},
		getCordinates() {
			let cordenadas = [];
			let lats = [];
			this.new_services = this.services.filter((service) => service.lat && service.lng);
			for (let service of this.new_services) {
				cordenadas.push({ lat: service.lat, lng: service.lng });
				lats.push(service.lat);
			}
			// Calculate the center of the map
			const lat = cordenadas.reduce((a, b) => a + b.lat, 0) / cordenadas.length;
			const lng = cordenadas.reduce((a, b) => a + b.lng, 0) / cordenadas.length;
			if (lat && lng) {
				this.cordinates = { lat, lng };
			} else {
				this.cordinates = { lat: -33.4488897, lng: -70.6692655 }
			}
		},
	},
	mounted() {
		this.getCordinates();
	},
	computed: {
      toCLP: () => toCLP,
	}
}
</script>

<style>
.map {
  @apply sticky w-full h-full;
  height: 50vh !important;
  width: 20vw !important;
  @media screen and (max-width: 768px) {
		height: 4rem !important;
		width: 90vw !important;
  }
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
