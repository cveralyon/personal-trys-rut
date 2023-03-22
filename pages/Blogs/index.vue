<template>
  <div class="main">
    <SocialHead
      :title="'Rutero | Blogs'"
      :description="'Exprime al máximo tu viaje, vayas donde vayas. Los artículos de Rutero.cl están repletos de ideas de aventuras e información de primera mano que no encontrarás en ningún otro sitio.'"
      :image="'/rutero_logo.png'"
    />
    <h1 class="fontRutero">Blogs</h1>
    <div class="blogsContainer">
      <blogPreview v-for="blog in blogs" :key="blog.id" :blog="blog"/>
    </div>
  </div>
</template>

<script>

import blogPreview from '../../components/blogsComponents/blogPreview.vue';
import axios from "axios";
import SocialHead from '../../components/Landing/SocialHead.vue';

export default {
  layout: "default",
  components: {
    blogPreview,
    SocialHead
  },
  async asyncData({ query }) {
    const response = await axios.get('https://rutero-backend.herokuapp.com/api/v1/blogs');
    const blogs = [];
    response.data.forEach(blog => {
        blogs.push(blog.blog);
    });
    return { blogs };
  },
  head() {
    return {
      title: "Rutero | Blogs",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Exprime al máximo tu viaje, vayas donde vayas. Los artículos de Rutero.cl están repletos de ideas de aventuras e información de primera mano que no encontrarás en ningún otro sitio.",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "rutero, rutas, aventura, viajes, chile",
        },
      ],
    }
  },
}
</script>

<style scoped>
.fontRutero{
  font-family: Barlow,sans-serif;
  padding: 0 7.5vw;
}
.main {
  padding-top: 90px;
  @media screen and (max-width: 768px) {
    padding-top: 25px;
  }
}

.blogsContainer {
  padding: 0px;
  place-content: center;
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
}

</style>