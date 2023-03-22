<template>
  <div class="section">
    <img :src="imageUrl" alt="icon-agregar" class="imagen" />
    <button @click="del(img_id)">
      <img class="eliminar" src="https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/x-mark.png" alt="eliminar-icon" />
    </button>
  </div>
</template>

<script>
export default {
  name: "ImageFrame",
  props: ["imageUrl", "img_id"],
  methods: {
    async del(img_id) {
      await this.$axios.$delete(`/api/v1/images/${img_id}`);
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.section {
  border: 5px solid black;
  width: 99%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.eliminar {
  width: 30px;
}
.imagen {
  width: 100%;
  height: 100%;
  max-height: 200%;
}
</style>
