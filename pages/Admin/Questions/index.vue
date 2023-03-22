<template>
  <client-only>
    <div
      v-if="$auth.loggedIn && $auth.user.type == 'admin' && ($auth.user.company_id == 2 || $auth.user.company_id == 1175)"
      class="overflow-auto table"
    >
    <h2 style="margin-bottom: 1rem;"> Dashboard Preguntas a Servicios</h2>
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
        <template v-slot:cell(button)="data">
          <template
            v-if="data.item.status === 'Respondido' || data.item.status === 'Respondido Oculto'"
          >
            <!-- check box que este marcado si el estado es Respondido y que al desmarcarlo cambie el estado a Respondido Oculto -->
            <b-form-checkbox
              v-model="data.item.isChecked"
              @change="update_status(data.item)"
            ></b-form-checkbox>
          </template>
        </template>
    </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </client-only>
</template>

<script>

import axios from "axios";
export default {
  async asyncData({ params }) {
    const response = await axios.get(
      "https://rutero-backend.herokuapp.com/api/v1/questions/questions_dashboard"
    );
    let items = response.data;
    items.forEach((item) => {
      const date = new Date(item.created_at);
      item.created_at = date.toLocaleDateString() + " " + date.toLocaleTimeString();
      const date_2 = new Date(item.updated_at);
      item.updated_at = date_2.toLocaleDateString() + " " + date_2.toLocaleTimeString();
      if (item.status === "Respondido"){
        item.isChecked = true;
      }
      else if (item.status === "Respondido Oculto"){
        item.isChecked = false;
      }
    });
    return { items };
  },
  data() {
    return {
      perPage: 30,
      currentPage: 1,
      campos: [
        { key: "id", sortable: true },
        { key: "user_id", sortable: true, label: "U.id" },
        { key: "user_name", sortable: true, label: "Usuario" },
        { key: "user_phone", sortable: true, label: "U.phone" },
        { key: "service_id", sortable: true, label: "S.id" },
        { key: "service_name", sortable: true, label: "Servicio" },
        { key: "service_phone", sortable: true, label: "S.phone" },
        { key: "question" },
        { key: "answer" },
        { key: "status", sortable: true },
        { key: "ref", sortable: true },
        { key: "created_at", sortable: true, label: "Created" },
        { key: "updated_at", sortable: true, label: "Update" },
      ],
    };
  },
  methods: {
    filtrar_items(items) {
      if (this.$auth.user.id == 1133) {
        items = items.filter((item) => item.service_phone == '56966762873');
      }

      if (this.$auth.user.company_id == 1175) {
        items = items.filter((item) => item.ref == 'austerra');
      }
      return items;
    },
    async update_status(item){
      console.log(item.status);
      const qStatus = item.status === 'Respondido' ? 6 : 3;
      if(qStatus === 6){
        item.status = 'Respondido Oculto';
      }
      else if(qStatus === 3){
        item.status = 'Respondido';
      }
      const response = await axios.patch(
          `https://rutero-backend.herokuapp.com/api/v1/questions/${item.id}`,
          { status: qStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$auth.strategy.token.get()}`
            }
          });
      console.log('update status');
    },
  },
  mounted() {
    this.items = this.filtrar_items(this.items);
  },
  computed: {
    rows() {
      return this.items.length;
    },
    fields() {
      if (this.$auth.user.company_id === 2) {
        this.campos.push(
          { key: "button", label: "Mostrar" },
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
  padding: 50px 7.5vw;
}
</style>
