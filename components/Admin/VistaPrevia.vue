<template>
  <div v-if="$auth.loggedIn">
      <h2>Vista Previa de {{service.name}}</h2>
      <button class="btn btn-secondary " @click="cerrarVistaPrevia()">
          Volver
      </button>
      <!-- <vue-iframe
        :src="src"
        :height="height"
        :width="width"
        @load="onLoad"
        /> -->
  </div>
</template>

<script>

export default {
  props: ["id"],
  data() {
    return {
      service: {},
      };
  },
  async asyncData({ params }) {
    return { id: params.id };
  },
  methods: {
    async getService() {
      const response = await this.$axios.$get(`/api/v1/services/${this.id}`);
      this.service = response.data.service;
    },
    cerrarVistaPrevia() {
			document.getElementsByClassName("infotab")[2].style.display = "none";
      document.getElementById("Perfil_2").style.display = "grid";
    },
    onLoad() {
      this.height = this.$refs.iframe.contentWindow.document.body.scrollHeight + 'px';
      this.width = this.$refs.iframe.contentWindow.document.body.scrollWidth + 'px';
      this.src = "/services/" + this.service.id;
    },
  },
  mounted() {
    this.getService();
  },
};
</script>

<style lang="postcss" scoped>
</style>
