<template>
  <div class="wrapper">
    <form class="search_form" ref="form" method="get" action="../search">
      <app-input
        v-model="searchTerm"
        autocomplete="off"
        name="Service"
        class="h-16"
        required
        placeholder="e.g Torres del Paine"
      >
        <search-icon slot="prefix" />
        <select class="country" slot="append" v-model="country" name="country">
          <option value="chile">🇨🇱 Chile</option>
        </select>
      </app-input>
      <ul v-if="showResults && searchResults.length > 0" class="results">
        <div v-if="searchResults.length > 0">
          <li
            class="text-sm bg-gray-100 p-2 text-gray-700 flex items-center"
            v-if="places.length > 0 || communes.length > 0"
          >
            <map-pin-icon class="w-4 mr-2" />
            Comunas
          </li>
          <li v-for="place in places" :key="`result-${place}`">
            <button
              class="truncate-text p-4 py-2 w-full text-left hover:bg-teal-500 hover:text-white"
              type="button"
              @click="selectResult(place, 'place')"
            >
              {{ place }}
            </button>
          </li>
          <li v-if="communes.length > 0">
            <button
              class="truncate-text p-4 py-2 w-full text-left hover:bg-teal-500 hover:text-white"
              type="button"
              @click="selectResult(communes[0], 'commune')"
            >
              {{ communes[0] }}
              <span class="opacity-50 ml-2">
                {{ communes[1] }}
              </span>
            </button>
          </li>
          <li class="text-sm bg-gray-100 p-2 text-gray-700 flex items-center">
            <map-icon class="w-4 mr-2" />
            Servicios
          </li>
          <li v-for="result of searchResults" :key="`result-${result.name}`">
            <button
              class="truncate-text p-4 py-2 w-full text-left hover:bg-teal-500 hover:text-white"
              type="button"
              @click="selectResult(result, 'service')"
            >
              {{ result.name }}
              <span class="opacity-50 ml-2">
                {{ result.region }}
              </span>
            </button>
          </li>
        </div>
      </ul>
      <button type="submit" class="search_button" :disabled="searchTerm.length < 3">BUSCAR</button>
    </form>
  </div>
</template>

<script>
import AppInput from "./AppInput";
import { SearchIcon, MapIcon, MapPinIcon } from "vue-feather-icons";

export default {
  components: {
    SearchIcon,
    AppInput,
    MapIcon,
    MapPinIcon,
  },
  data: () => ({
    searchTerm: "",
    country: "chile",
    showResults: false,
    searchResults: [],
    places: [],
    isActive_alojamiento: false,
    isActive_activity: false,
  }),
  watch: {
    searchTerm(str) {
      this.searchResults = [];
      if (str.length > 2) {
        this.getSearchResults(str);
      } else {
        this.showResults = false;
      }
    },
  },
  methods: {
    async getSearchResults(str) {
      var str_2 = "q=" + str;
      if (this.isActive_activity) {
        str_2 += "&type[]=1";
      }
      if (this.isActive_alojamiento) {
        str_2 += "&type[]=0";
      }
      str_2 += "&limit=5";
      const response = await this.$axios.$get(`/api/v1/services/search?` + str_2);
      this.showResults = true;
      this.searchResults = [];
      this.places = [];
      this.communes = [];
      for (let i = 0; i < response.length; i++) {
        if (this.searchResults.length < 2) {
          this.searchResults.push(response[i].service);
        }
        if (this.places.includes(response[i].service.region)) {
          // pass  do nothing
        } else {
          if (response[i].service.region) {
            response[i].service.region_2 =
              response[i].service.region.toLowerCase();
            if (
              response[i].service.region_2.includes(str) &&
              this.places.length < 3
            ) {
              this.places.push(response[i].service.region);
            }
          }
        }
        if (response[i].service.commune) {
          if (this.communes.includes(response[i].service.commune)) {
            // pass  do nothing
          } else {
            this.communes.push([
              response[i].service.commune,
              response[i].service.region,
            ]);
          }
        }
      }
      // ORDENAR LISTA DE COMUNAS SEGUN CANTIDAD DE VECES QUE APARECE EN LA LISTA DE RESULTADOS
      let contar = this.communes.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      }, {});
      let sorted = Object.keys(contar).sort((a, b) => contar[b] - contar[a]);
      if (sorted.length > 0) {
        this.communes = sorted[0].split(",");
      }
    },
    async selectResult(result, type) {
      if (type === "service") {
        this.searchTerm = result.name;
      } else if (type === "place") {
        this.searchTerm = result;
      } else if (type === "commune") {
        this.searchTerm = result;
      }
      this.showResults = false;
      setTimeout(() => {
        this.$refs.form.submit();
      }, 10);
    },
  },
};
</script>

<style lang="scss" scoped>

.img_type {
  width: 2rem;
  @media screen and (max-width: 797px) {
    width: 1.5rem;
  }
}
.type {
  color: black;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  @media screen and (max-width: 1025px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 770px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
  }
}
.search_form {
  flex-direction: column;
  display: flex;
  box-sizing: border-box;
  position: relative;
}
.wrapper {
  z-index: 10;
  margin-top: 3%;
}
.country {
  width: 8rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  margin: 0.5rem;
  height: 3rem;
  background-color: #edf2f7;
  border: 1px solid #e2e8f0;
  appearance: none;
  margin-left: 1rem;
}
.search_button {
  margin-top: 1rem;
  width: 100%;
  color: #fff;
  padding: 1rem;
  font-weight: 700;
  font-size: 150%;
  border-radius: 0.25rem;
  background-color: #4fd1c5;
  line-height: inherit;
}
ul {
  padding: 0;
}
.results {
  position: absolute;
  top: 70px;
  left: 0px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 30;
}

.botones {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
}
.actividades {
  border-radius: 20px 0px 20px 0px;
}
.alojamientos {
  border-radius: 0px 20px 0px 20px;
}
.hover {
  gap: 1rem;
  width: 99%; 
  display:flex; 
  justify-content: center;
  opacity: 0.6;
  align-items: center;
  height: 3.5rem;
  box-shadow: rgb(0 0 0 / 70%) 0px 2px 6px;
  @media screen and (max-width: 797px) {
    gap: 0;
  }
}
.hover:hover {
  opacity: 1;
}
</style>
