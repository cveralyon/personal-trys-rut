<template>
    <div v-if="$auth.loggedIn" class="service_grid">
      <h2 class="service-title">Servicios Recomendados</h2>
      <div class="buttons">
        <div class="form-floating">
          <b-form-input
            class="auth-form"
            style="min-width: 10rem;"
            id="id-service"
            placeholder="Ingrese un id..."
            v-model="serviceId"
          />
          <label for="id-service">Id del Servicio:</label>
        </div>
        <button
          class="btn btn-primary"
          @click="getservice()"
          style="margin: 0.5rem"
        >
          Agregar servicio
        </button>
      </div>
      <div
        class="overflow-auto"
        style="padding: 0 7.5vw"
        v-if="$auth.user.company_id == 2"
      >
        <b-table
          id="my-table"
          :striped="true"
          :bordered="true"
          :small="true"
          :hover="true"
          :items="services"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template #cell(actions)="data">
            <b-button
              variant="danger"
              @click="deleteService(data.item.service_id)"
              size="m"
            >
              Quitar
            </b-button>
          </template>
        </b-table>
      </div>
  
      <div style="padding: 0 7.5vw">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import ServiceCard from "~/components/Services/search/ServiceCard.vue";
  export default {
    head() {
      return {
        title: "Admin | Servicios Recomendados",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "description",
          },
        ],
      };
    },
    components: { ServiceCard },
    data() {
      return {
        serviceId: "",
        services: [],
        perPage: 30,
        currentPage: 1,
        newService: null,
        fields: [
          { key: "ranking", label: "Rank"},
          { key: "service_id", label: "Service Id"},
          { key: "name", label: "Nombre"},
          { key: "actions", label: "Acciones"},
        ],
      };
    },
    methods: {//https://rutero-backend-staging.herokuapp.com/api/v1/recommended_services
      async getservice() {
        await axios
          .get(`https://rutero-backend-staging.herokuapp.com/api/v1/services/${this.serviceId}`)
          .then((response) => {
            if (response.data.data.service == null) {
              alert("El servicio no existe");
              return;
            }else{
              this.newService = response.data.data.service;
              this.creteRecommended();
              this.serviceId = "";
            }}).catch((e) => {
              console.log(e);
            });
      },
      async creteRecommended() {
        await axios.post(`https://rutero-backend-staging.herokuapp.com/api/v1/recommended_services`,
            { service_id: this.newService.id , ranking: 0, name: this.newService.name })
          .then((response) => {
            console.log(`Response: ${response.data}`);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      async getRecommended() {
        axios.get(`https://rutero-backend-staging.herokuapp.com/api/v1/recommended_services`)
          .then((response) => {
            this.services = response.data;
          });
      },
      async deleteService(id) {
         // await this.$axios
        axios.delete(`https://rutero-backend-staging.herokuapp.com/api/v1/recommended_services/${id}`)
          .then((response) => {
            console.log(`Response: ${response.data}`);
            this.getRecommended();
          })         
      },
    },
    mounted() {
      this.getRecommended();
    },
    computed: {
      rows() {
        this.getRecommended();
        return this.services.length;
        
      },
    },
  };
  </script>
  
<style lang="scss" scoped>
a {
    h2 {
        font-size: 1.2rem;
    }
}
.grid {
display: grid;
grid-gap: theme("spacing.4");
flex: 2;
}
.item {
@apply flex flex-col;
@apply bg-white rounded-md shadow;
}
@screen md {
.grid {
    grid-template-columns: 1fr 1fr;
}
}
.service-title {
text-align: center;
padding: 1.25rem 0 0 0.625rem;
font-weight: 600;
line-height: 1.2;
margin-top: 12%;
margin-bottom: 10%;
@media (min-width: 66em) {
    margin-top: 1%;
    margin-bottom: 2%;
}
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  margin-bottom: 2%;
  height: 50%;
  margin-left: 2%;
}
</style>
  