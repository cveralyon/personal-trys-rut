<template>
  <div v-if="$auth.loggedIn" class="service_grid">
    <h2 class="service-title">Mis servicios</h2>
    <div class="buttons">
      <div class="MercadoPago">
        <img
          src="~/assets/images/MP/mercadopago.webp"
          alt="MercadoPago"
          class="MP"
          @click="authMercadoPago()"
          style="border-radius: 5%; border: 1px solid #000"
        />
      </div>
      <button
        class="btn btn-primary"
        @click="newService()"
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
            variant="primary"
            @click="viewService(data.item.id)"
            size="sm"
          >
            Ver
          </b-button>
          <b-button
            variant="success"
            @click="editService(data.item.id)"
            size="sm"
          >
            Editar
          </b-button>
        </template>
      </b-table>
    </div>

    <div v-else class="w-full pb-4 relative">
      <ul class="grid">
        <li
          v-for="service of services"
          :key="`service-${service.id}`"
          :ref="`service-${service.id}`"
          class="item"
        >
          <ServiceCard
            :id="service.id"
            :name="service.name"
            :address="service.address"
            :commune="service.commune"
            :region="service.region"
            :rating="service.rating"
            :images="service.images_urls"
          />
        </li>
      </ul>
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

// import axios from "axios";
import ServiceCard from "~/components/Services/search/ServiceCard.vue";
import { mercadopagoApp } from "~/plugins/mercadopago.js";
export default {
  head() {
    return {
      title: "Admin | Servicios",
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
      services: [],
      perPage: 30,
      currentPage: 1,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Nombre", sortable: true },
        { key: "address", label: "Dirección", sortable: true },
        { key: "commune", label: "Comuna", sortable: true },
        { key: "region", label: "Región", sortable: true },
        { key: "rating", label: "Rating", sortable: true },
        { key: "service_status", label: "Estado", sortable: true },
        { key: "subtype", label: "Subtipo", sortable: true },
        { key: "actions", label: "Acciones", sortable: false },
      ],
    };
  },
  methods: {
    async search() {
      const response = await this.$axios.$get(
        "/api/v1/services/manage_services",
        {
          headers: {
            Authorization: this.$auth.strategy.token.get(),
          },
        }
      );
      for (let i = 0; i < response.services.length; i++) {
        this.services.push(response.services[i]);
      }
    },
    newService() {
      this.$router.push("/admin/services/new");
    },
    authMercadoPago() {
      mercadopagoApp.companyRedirectToMP(this.$auth.user.company_id);
    },
    blogs() {
      this.$router.push("/admin/blogs");
    },
    viewService(id) {
      window.open(`https://www.rutero.cl/services/${id}`);
    },
    editService(id) {
      this.$router.push("/admin/services/" + id);
    },
  },
  mounted() {
    this.search();
  },
  computed: {
    rows() {
      return this.services.length;
    },
  },
};
</script>

<style lang="postcss" scoped>
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
.grid {
  display: grid;
  grid-gap: theme("spacing.4");
  flex: 2;
  padding-right: 10%;
  padding-left: 10%;
}
.item {
  display: block;
  border: 0px;
  @apply flex flex-col;
  @apply bg-white rounded-md shadow;
}
.servicegrid {
  align-items: center;
  width: 70%;
  flex-direction: column;
  min-height: 100%;
  display: flex;
  padding-left: 2%;
}
.MercadoPago {
  width: 45%;
  height: 100%;
  border: 1px;
  outline: 0px;
  cursor: pointer;
  @media (min-width: 66em) {
    width: 20%;
  }
}
.buttons {
  align-items: center;
  margin-top: 2%;
  margin-bottom: 2%;
  height: 50%;
  margin-left: 2%;
}
.Mp {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.MP:hover {
  background-color: gray;
}
</style>
