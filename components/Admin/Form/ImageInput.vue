<template>
  <div>
    <section style="margin-top: 1%">
      <!-- Campo para subir imagen *importante* -->
      <input
        type="file"
        name="image_file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        @change="setImage"
        multiple
      />
    </section>
    <section v-if="this.imageFile" style="margin-top: 1%">
      <button type="submit" @click="upload" class="btn btn-secondary">
        Subir Imagen
      </button>
    </section>
  </div>
</template>

<script>
export default {
  props: ['service_id'],
  data () {
    return {
      imageFile: null
    }
  },
  methods: {
    setImage (e) {
      e.preventDefault()
      this.imageFile = e.target.files
    },
    async upload () {
      const headers = { 'Content-Type': 'multipart/form-data' }
      if (this.imageFile !== null) {
        for (let i = 0; i < this.imageFile.length; i++) {
          const formData = new FormData()
          formData.append('image_file', this.imageFile[i])
          formData.append('image_file_name', this.imageFile.name)
          formData.append('image_file_size', this.imageFile.size)
          formData.append('service_id', this.service_id)
          const response = await this.$axios.$post(
            '/api/v1/images',
            formData,
            headers
          )
        }
        window.location.reload()
      }
    }
  }
}
</script>

<style scoped></style>
