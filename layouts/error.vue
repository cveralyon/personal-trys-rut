<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

nuxt-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  font-size: 20px;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
}

nuxt-link:hover {
  background-color: #3e8e41;
}
</style>
