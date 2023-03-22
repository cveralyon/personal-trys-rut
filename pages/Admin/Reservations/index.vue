<template>
  <client-only>
    <div
      v-if="
        $auth.loggedIn &&
        $auth.user.type == 'admin' &&
        $auth.user.company_id == 2
      "
      class="table"
    >
      <EmailResender
        v-if="showPopup"
        v-on:close="closePopup"
        :rowData="selectedRow"
        @close="showPopup = false"
      />
      <b-table
        id="my-table"
        :striped="true"
        :bordered="true"
        :small="true"
        :hover="true"
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template v-slot:cell(status)="data">
          <td v-bind:class="{ 'yellow': data.item.status === 'Creada', 'green': data.item.status === 'Aceptada', 'red': data.item.status === 'Rechazada', 'orange': data.item.status === 'Expirada' }">
            {{ data.item.status }}
          </td>
        </template>
        <template v-slot:cell(inputField)="data">
          <template
            v-if="
              data.item.status === 'Creada' || data.item.status === 'Aceptada'
            "
          >
            <b-form-input
              style="min-width: 100px"
              type="number"
              v-model="data.item.inputFieldValue"
            />
          </template>
        </template>
        <template v-slot:cell(button)="data">
          <template
            v-if="
              data.item.status === 'Creada' || data.item.status === 'Aceptada'
            "
          >
            <b-button variant="danger" @click="refund_amount(data.item)">
              Reembolsar
            </b-button>
          </template>
        </template>
        <template v-slot:cell(resend)="data">
          <b-button variant="success" @click="handleRowClick(data.item)">
            E
          </b-button>
        </template>
      </b-table>
      
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
    <!-- RESERVAS DE AUSTERRA -->
    <div
      v-else-if="
        $auth.loggedIn &&
        $auth.user.type == 'admin' &&
        $auth.user.company_id == 1175
      "
      class="overflow-auto table"
    >
      <b-table
        id="my-table"
        :striped="true"
        :bordered="true"
        :small="true"
        :hover="true"
        :items="austerra_items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
      ></b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="austerra_rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </client-only>
</template>

<script>
import EmailResender from "~/components/Admin/EmailResender.vue";
import axios from "axios";
export default {
  components: {
    EmailResender,
  },
  async asyncData({ params }) {
    const response = await axios.get(
      "https://rutero-backend.herokuapp.com/api/v1/reservations/reservations_dashboard"
    );
    let items = response.data;
    items.forEach((item) => {
      item.created_at = item.created_at.split("T")[0];
    });
    let austerra_items = items.filter((item) => item.ref == "austerra");
    return { items, austerra_items };
  },
  data() {
    return {
      selectedRow: {},
      showPopup: false,
      perPage: 30,
      currentPage: 1,
      campos: [
        { key: "id", sortable: true },
        { key: "company_name", sortable: true, label: "Compañía" },
        { key: "service_name", sortable: true, label: "Servicio" },
        { key: "product_name", sortable: true, label: "Producto" },
        { key: "user_name", sortable: true, label: "Usuario" },
        { key: "fono" },
        { key: "pax", sortable: true },
        { key: "total_cost", sortable: true, label: "Valor" },
        { key: "start_date", sortable: true, label: "Inicio" },
        { key: "end_date", sortable: true, label: "Fin" },
        { key: "status", sortable: true, label: "Status" },
        { key: "mp_status", sortable: true, label: "MP Status" },
        { key: "created_at", sortable: true, label: "Creada" },
        { key: "ref", sortable: true, label: "Ref" },
        { key: "refunded", label: "Reemb." },
      ],
    };
  },
  methods: {
    closePopup() {
      this.showPopup = false;
    },
    handleRowClick(item, index, event) {
      this.selectedRow = item;
      this.showPopup = true;
    },
    async refund_amount(item) {
      await this.$axios
        .$post(
          `/api/v1/reservations/mp_refund/${item.id}`,
          { amount: item.inputFieldValue },
          {
            headers: {
              Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            },
          }
        )
        .then((response) => {
          item.inputFieldValue = "";
          alert(`Se han reembolsado exitosamente ${response.refunded} pesos`);
        })
        .catch((e) => {
          item.inputFieldValue = "";
          alert(
            `No se ha podido reembolsar el monto. Actualmente se ha reembolsado ${e.response.data.error.amount} pesos de esta reserva.`
          );
        });
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
    austerra_rows() {
      return this.austerra_items.length;
    },
    fields() {
      if (this.$auth.user.company_id === 2) {
        this.campos.push(
          { key: "inputField", label: "Monto" },
          { key: "button", label: "Reembolsar" },
          { key: "resend", label: "Email" }
        );
        return this.campos;
      } else {
        return this.campos;
      }
    },
  },
};
</script>
<style scoped>
.table {
  padding: 50px 1.5vw;
}
.yellow {
  background-color: yellow;
  border-radius: 20px;
  padding: 6px;
  color: white;

}

.green {
  background-color: green;
  border-radius: 20px;
  padding: 6px;
  color: white;

}

.red {
  background-color: red;
  border-radius: 20px;
  padding: 6px;
  color: white;
}

.orange{
  background-color: orange;
  border-radius: 20px;
  padding: 6px;
  color: white;

}
</style>
