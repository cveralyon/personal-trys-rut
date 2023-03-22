<template>
  <div class="main">
    <div class="row">
      <h3 class="form-section-title">Tipo de Servicio:</h3>
    </div>
    <div class="row">
      <button class="Alojamiento" @click="showAlojamiento()">
        <label class="info_5">
          <input
            id="AlojamientoType"
            type="radio"
            name="radio"
            value="0"
            v-model="service.type"
          />
          <span>Alojamiento</span>
        </label>
      </button>
      <button class="Actividad" @click="showActividad()">
        <label class="info_5">
          <input
            id="ActividadType"
            type="radio"
            name="radio"
            value="1"
            v-model="service.type"
          />
          <span>Actividad</span>
        </label>
      </button>
    </div>
    <div class="row">
      <div
        id="Alojamiento"
        class="form-group col-12 col-md-12 alojamiento-type"
      >
        <label class="d-block">Tipo de Alojamiento</label>
        <div class="form-group">
          <select class="form-select form-select-lg" v-model="service.subtype">
            <option
              name="subtype"
              v-for="accommodation in accommodation_list"
              :key="accommodation.id"
              :value="accommodation"
            >
              {{ accommodation }}
            </option>
          </select>
        </div>
      </div>
      <div id="Actividad" class="form-group col-12 col-md-12 alojamiento-type">
        <label class="d-block">Tipo de Actividad</label>
        <div class="form-group">
          <select class="form-select form-select-lg" v-model="service.subtype">
            <option
              name="subtype"
              v-for="activity in activity_list"
              :key="activity.id"
              :value="activity"
            >
              {{ activity }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="form-group col-12 col-md-8">
      <label for="Nombre">Nombre del servicio</label>
      <input type="text" class="form-control" v-model="service.name" />
    </div>
    <div v-if="service.lng && service.lat && service.id" class="row">
      <h4 class="font-bold text-lg mb-4 mt-8">Ubicación</h4>
      <gmap-map
        :center="{ lat: service.lat, lng: service.lng }"
        :zoom="10"
        map-type-id="terrain"
        class="map h-64"
      >
        <gmap-marker :position="{ lat: service.lat, lng: service.lng }" />
      </gmap-map>
    </div>
    <div class="row">
      <div class="form-group col-12 col-md-6">
        <label for="latitud"> Latitud</label>
        <input type="text" class="form-control" v-model="service.lat" />
      </div>
      <div class="form-group col-12 col-md-6">
        <label for="longitud">Longitud</label>
        <input type="text" class="form-control" v-model="service.lng" />
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12 col-md-8">
        <label for="Direccion">Dirección</label>
        <input type="text" class="form-control" v-model="service.address" />
      </div>
      <div class="form-group col-12 col-md-4">
        <label for="Pais">Pais</label>
        <!-- <input type="text" class="form-control" v-model="service.country" /> -->
        <select
          id="Pais"
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          v-model="service.country"
        >
          <option>Chile</option>
          <option v-for="pais in paises" :key="pais.id" :value="pais">
            {{ pais.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12 col-md-4">
        <label for="Ciudad">Ciudad</label>
        <input type="text" class="form-control" v-model="service.city" />
      </div>
      <div class="form-group col-12 col-md-4">
        <label for="Region">Region</label>
        <!-- <input type="text" class="form-control" v-model="service.region" /> -->
        <select
          id="Region"
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          v-model="regionAUX"
        >
          <option>Seleccione una region</option>
          <option
            v-for="region in regiones"
            :key="region.id"
            :value="region.name_region"
          >
            {{ region.name_region }}
          </option>
        </select>
      </div>
      <div class="form-group col-12 col-md-4">
        <label for="Comuna">Comuna</label>
        <!-- <input type="text" class="form-control" v-model="service.commune" /> -->

        <select
          id="Comuna"
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          v-model="service.commune"
        >
          <option v-if="service.commune">
            {{ service.commune }}
          </option>
          <option>Seleccione una comuna</option>
          <option
            v-for="comuna in comunas"
            :key="comuna.id"
            :value="comuna.name_comuna"
          >
            {{ comuna.name_comuna }}
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <label for="Descripcion">Descripción</label>
      <wysiwyg v-model="service.description" />
    </div>
    <div v-if="service.id">
      <label> Imagenes del servicio </label>
      <div v-if="service.images" class="imagenes">
        <div v-for="image in service.images" :key="image.img_id">
          <ImageFrame :imageUrl="image.url" :img_id="image.img_id" />
        </div>
      </div>
      <ImageInput :service_id="this.id" />
    </div>
    <!-- Parte de los productos -->
    <h2>Productos</h2>
    <div v-if="service.products">
      <div v-if="service.products.length > 0">
        <div class="row" v-for="product in service.products" :key="product.id">
          <Form :product="product" />
        </div>
      </div>
    </div>
    <h3>Agregar Producto</h3>
    <Form @update:product="productsUpdate" :product="{}" />
    <div>
      <h3 class="form-section-title" v-if="active">Servicio Activo</h3>
      <h3 class="form-section-title" v-else>Servicio Inactivo</h3>
      <label class="switch" for="status">
        <input id="status" type="checkbox" v-model="active" />
        <span class="slider round"></span>
      </label>
    </div>
    <h2>
      <button class="btn btn-primary" @click="save">Guardar</button>
    </h2>
  </div>
</template>

<script>
import Form from "~/components/Products/Form";
import ImageFrame from "~/components/Admin/Form/ImageFrame";
import ImageInput from "~/components/Admin/Form/ImageInput";

export default {
  props: ["id", "service"],
  components: {
    Form,
    ImageFrame,
    ImageInput,
  },
  data() {
    return {
      regiones: [],
      regionAUX: "hola",
      Todascomunas: [],
      comunas: [],
      paises: [],
      active: false,
      accommodation_list: [
        "Camping",
        "Glamping",
        "Motorhome",
        "Hostal",
        "Cabaña",
        "Lodge",
        "Otros",
      ],
      activity_list: [
        "Kayak",
        "Buceo",
        "Paracaidismo",
        "Randonnee",
        "Snowboard",
        "Tour",
        "Windsurf",
        "Cabalgata",
        "Kitesurf",
        "Mountain Bike",
        "Bicicleta",
        "Parapente",
        "Stand Up Paddle",
        "Trail Running",
        "Canopy",
        "Montañismo",
        "Pesca",
        "Ski Acuático",
        "Surf",
        "Trekking",
        "Ski",
        "Escalada",
        "Moto Enduro",
        "Observación de animales",
        "Rafting",
        "Slackline",
        "Paintball",
        "Vela",
        "Canyoning",
        "Otros",
      ],
    };
  },
  methods: {
    productsUpdate(product) {
      this.service.products.push(product);
    },
    async getService() {
      const response = await this.$axios.$get(`/api/v1/services/${this.id}`, {
        params: {
          all: true,
        },
      });
      this.service = response.data.service;
      this.regionAUX = this.service.region
        ? this.service.region
        : "Seleccione una region";
      this.service.commune = this.service.commune
        ? this.service.commune
        : "Seleccione una comuna";
      document.getElementById("Region").value = this.service.region;
      document.getElementById("Comuna").value = this.service.commune;
      if (this.service.type == "Alojamiento" || this.service.type == 0) {
        document.getElementById("AlojamientoType").click();
      } else if (this.service.type == "Actividad" || this.service.type == 1) {
        document.getElementById("ActividadType").click();
      }
      if (
        this.service.service_status == 1 ||
        this.service.service_status == 2
      ) {
        this.active = true;
      }
    },
    async getRegions() {
      const response = await this.$axios.$get(`/api/v1/regions`);
      this.regiones = response;
    },
    async getComunas() {
      const response = await this.$axios.$get(`/api/v1/comunas`);
      this.Todascomunas = response;
    }, // aqui setear las info que viene del backend
    showAlojamiento() {
      document.getElementById("Alojamiento").style.display = "block";
      document.getElementById("Actividad").style.display = "none";
    },
    showActividad() {
      document.getElementById("Actividad").style.display = "block";
      document.getElementById("Alojamiento").style.display = "none";
    },
    save() {
      this.service.region = this.regionAUX;
      this.service.commune = this.service.commune;
      this.service.products_attributes = this.service.products;
      this.service.service_type = this.service.type;
      this.service.status = this.active ? 1 : 0;
      for (let i = 0; i < this.service.products.length; i++) {
        this.service.products[i].status = this.service.products[i].status ? 1 : 0;
      }
      if (
        this.service.type != null &&
        this.service.subtype != null &&
        this.service.name != null &&
        this.service.region != null &&
        this.service.commune != null &&
        this.service.address != null &&
        this.service.products.length > 0 &&
        this.service.lng != null &&
        this.service.lat != null
      ) {
        if (this.id) {
          this.$axios
            .$patch(`/api/v1/services/${this.id}`, this.service)
            .then((response) => {
              this.$router.push("../../admin/services");
            })
            .catch((error) => {
            });
        } else {
          this.$axios
            .$post("/api/v1/services", this.service)
            .then((response) => {
              this.$router.push("../../admin/services");
            })
            .catch((error) => {
            });
        }
      } else {
        alert(
          "Para crear un servicio debe completar todos los campos y crear al menos 1 producto"
        );
      }
    },
  },
  mounted() {
    this.getRegions();
    this.getComunas();
    if (this.id) {
      this.getService();
    }
  },
  watch: {
    regionAUX(newVal) {
      this.comunas = [];
      for (var i = 0; i < this.Todascomunas.length; i++) {
        if (this.Todascomunas[i].name_region == newVal) {
          this.comunas.push(this.Todascomunas[i]);
        }
      }
    },
    active(newVal) {
      this.service.region = this.regionAUX;
      if (newVal) {
        if (
          this.service.type != null &&
          this.service.subtype != null &&
          this.service.name != null &&
          this.service.region != null &&
          this.service.commune != null &&
          this.service.address != null &&
          this.service.products.length > 0 &&
          this.service.lng != null &&
          this.service.lat != null
        ) {
          // pass
        } else {
          this.active = false;
          alert(
            "Para activar un servicio debe completar todos los campos y crear al menos 1 producto"
          );
          document.getElementById("status").checked = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.main {
  padding: 0 7.5vw;
}
.form-section-title {
  font-size: em(20);
  line-height: line-height-em(20, 24);
  font-weight: 600;
  padding-top: em(20);
  vertical-align: middle;
}

.Alojamiento {
  display: block;
  border: rgba(0, 0, 0, 0.3) solid 1px;
  background-color: rgb(206, 204, 204);
  border-top-right-radius: 20%;
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
  border-top-left-radius: 20%;
  height: 90%;
  width: 45% !important;
  text-align: center;
}
.Alojamiento:checked {
  background-color: #33aca6;
  color: white;
}
.Alojamiento:hover {
  cursor: pointer;
}

.Actividad {
  display: block;
  border: rgba(0, 0, 0, 0.3) solid 1px;
  background-color: rgb(206, 204, 204);
  border-top-right-radius: 20%;
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
  border-top-left-radius: 20%;
  height: 90%;
  width: 45% !important;
  margin-left: 2vw;
  text-align: center;
}
.Actividad:checked {
  background-color: #33aca6;
  color: white;
}
.Actividad:hover {
  cursor: pointer;
}
.info_5 {
  font-weight: bold;
  font-size: 3vh;
  width: 100%;
  height: 100%;
  margin-bottom: 0%;
}
.optcontent {
  display: none;
}
.alojamiento-type {
  display: none;
}
.actividad-type {
  display: none;
}
.map {
  width: 35vh !important;
  height: 35vh !important;
  background-color: #30354e;
  margin-bottom: em(20);
  @media (min-width: 66em) {
    width: 50vh !important;
    height: 37vh !important;
  }
}
.description {
  height: 10vh;
}
.imagenes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1em;

  max-width: 50%;
  max-height: 50%;
  flex-wrap: wrap;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
