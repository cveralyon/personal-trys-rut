<template>
  <client-only>
    <div class="servicecard">
      <figure
        v-if="subtype"
        class="bg-white p-2 flex top-0 left-0 float-left m-2 rounded-md shadow-md figura"
      >
        <NuxtImg preload format="webp" quality="50"
          alt="icon-preload-image"
          title="icon"
          id="icon"
          v-bind:src="subtype | loadIcon"
          class="object-cover"
          style="width: 1rem; height: 1rem"
        />
        <small style="font-size: 0.6rem; align-self: center">
          {{ subtype }}
        </small>
      </figure>
      <VueFlux
        v-if="!images || !images.length"
        :options="options_placeholder"
        :images="placeholder"
        :transitions="transitions"
        style="min-height: 12rem"
      >
      </VueFlux>
      <VueFlux
        v-else
        :options="options"
        :images="images"
        :transitions="transitions"
        style="min-height: 12rem"
      >
        <template v-slot:controls>
          <FluxControls />
        </template>
      </VueFlux>

      <nuxt-link
        :to="'services/' + id"
        style="color: black; text-decoration: none"
        title="View Service"
      >
        <div class="p-2 flex flex-col hover">
          <h2 class="title">{{ name }}</h2>
          <h4
            v-if="city"
            class="mobile"
            style="
              font-size: 0.9rem;
              color: gray;
              margin-bottom: 0.4rem;
              font-weight: 300;
            "
          >
            {{ city }}
          </h4>
          <div class="flex flex-col">
            <star-rating
              :increment="0.1"
              :max-rating="5"
              :star-size="16"
              :show-rating="false"
              :read-only="true"
              :rating="Number(rating)"
              class="stars"
            />
          </div>

          <h3 class="address desktop">{{ direccion }}</h3>
          <h4 class="region desktop">{{ localidad }}</h4>

          <div v-if="min_value" class="price">
            <h3 class="price_2 self-end text-gray-700">
              Desde {{ this.toCLP(min_value) }}
            </h3>
          </div>

          <div class="flex-button">
            <button class="button">Ver</button>
          </div>
        </div>
      </nuxt-link>
    </div>
  </client-only>
</template>

<script>
import { toCLP } from "@/plugins/helpers";
import { StarIcon } from "vue-feather-icons";
let VueFlux;
let FluxPreloader;
let FluxControls;

if (process.browser) {
  const VF = require("vue-flux");
  VueFlux = VF.VueFlux;
  FluxPreloader = VF.FluxPreloader;
  FluxControls = VF.FluxControls;
}

export default {
  props: [
    "id",
    "name",
    "rating",
    "region",
    "address",
    "subtype",
    "images",
    "commune",
    "min_value",
    "city",
    "country",
    "company_name",
  ],
  components: {
    VueFlux,
    FluxControls,
    FluxPreloader,
    StarIcon,
  },
  computed: {
    toCLP: () => toCLP,
  },
  data() {
    return {
      placeholder: [require("~/assets/images/no_images.webp")],
      options: {
        autoplay: true,
      },
      options_placeholder: {
        autoplay: false,
      },
      transitions: ["slide"],
      direccion: "",
      localidad: "",
    };
  },
  filters: {
    loadIcon: function (subt) {
      if (subt == "Observación de animales") {
        return "https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/services/Observacion+de+Animales+Negro.png";
      }
      if (subt == "Stand Up Paddle") {
        return "https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/services/Standup+Paddle+Negro.png";
      }
      return (
        "https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/services/" +
        subt +
        " Negro.png"
      );
    },
  },
  methods: {
    getDirection() {
      if (this.city) {
        this.direccion = this.city;
      }
      if (this.commune && this.city && this.commune != this.city) {
        this.direccion += ", " + this.commune;
      }
      if (this.commune && !this.city) {
        this.direccion = this.commune;
      }
      if (this.region) {
        this.localidad = this.region;
      }
      if (this.region && this.country) {
        this.localidad += ", " + this.country;
      }
      if (this.country && !this.region) {
        this.localidad = this.country;
      }
    },
  },
  mounted() {
    this.getDirection();
  },
};
</script>

<style lang="scss" scoped>

.servicecard {
  cursor: default;
  width: 100%;
  min-width: 10rem;
  max-width: 100%;
  border-radius: 0.25rem;
  -moz-box-shadow: 0 0 5px darkgrey;
  -webkit-box-shadow: 0 0 5px darkgrey;
  box-shadow: 0 0 5px darkgrey;
  &:hover {
    color: #33aca6;
  }
  @media (min-width: 769px) {
    width: 85%;
  }
  @media (min-width: 900px) {
    width: 100%;
  }
}

.button {
  color: #234e52;
  text-align: center;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-left: auto;
  font-weight: 700;
  border-radius: 0.25rem;
  background-color: #81e6d9;
  font-family: Calibre, Helvetica, Arial, sans-serif;
  font-size: 16px;
  right: 0;
}
.flex-button {
  display: flex;
  justify-content: right;
  @media (max-width: 769px) {
    display: none;
  }
}
img {
  margin-left: auto;
  margin-right: auto;
}
.title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}
.company {
  font-size: 0.7rem;
  font-weight: 500;
}
.address {
  font-size: 1rem;
  margin-top: 1%;
  font-weight: 350;
}
.region {
  font-size: 1rem;
  opacity: 0.5;
  font-weight: 200;
}
.hover {
  &:hover {
    color: #33aca6;
  }
}

.figura {
  position: relative;
  gap: 0.3rem;
  z-index: 8;
}

.stars {
  margin-top: -2%;
}

.price {
  justify-content: right;
  color: #4a5568;
  align-self: flex-end;
}
.price_2 {
  font-size: 1rem;
  font-weight: 700;
  font-weight: bolder;
  font-family: Calibre, Helvetica, Arial, sans-serif;
  color: #33aca6;
  &:hover {
    color: #33aca6;
  }
}
.star {
  z-index: 9;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  margin: 0.5rem;
  font-weight: 700;
  position: relative;
  border-radius: 0.375rem;
  display: flex;
  float: right;
  color: white;
  background-color: #33aca6;
}

@media screen and (max-width: 768px) {
  h3 {
    margin-bottom: 0;
  }
  h4 {
    margin-bottom: 0;
  }
}
.mobile {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
}
.desktop {
  display: block;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
</style>
