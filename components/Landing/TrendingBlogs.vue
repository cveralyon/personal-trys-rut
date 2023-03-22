<template>
  <div class="gallery-container">
    <div v-for="blog of listBlogs"
      :key="`blog-${blog.slug}`"
      :ref="`blog-${blog.slug}`"
      class="gallery-item"
      :style="{
        'background-image':
          'linear-gradient(#0000, rgba(41, 53, 59, 0.8)), url(' +
          blog.cover +
          ')',
      }"
      @click="goBlog(blog.slug)">
      <div class="layer-blog-access-2">
        <p class="see-more">+ VER MÁS</p>
        <h2 class="name-blog">{{ blog.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
props: {
  listBlogs: {
    type: Array,
    default: () => [],
  },
},

methods: {
  goBlog(event) {
    window.open(`https://www.ruterocamping.com/blog/${event}`, "_blank");
  },
},

}
</script>

<style lang="scss" scoped>
.gallery-container {
  display: flex;
  flex-direction: row;
  height: 30vw;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: #b7b7b7 #fff;
  margin: 1% 8% 2% 8%;
  @media screen and (max-width: 769px) {
    height: 54vw;
  }
  .gallery-item {
    flex: 1;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    min-width: 30%;
    &:hover {
      .layer-blog-access-2 {
        background: linear-gradient(
          rgba(80, 209, 197, 0.8),
          rgba(41, 53, 59, 0.8)
        );
      }
      .see-more {
        visibility: visible;
      }
    }
    @media screen and (max-width: 769px) {
      min-width: 43%;
    }
  }
}

.gallery-container::-webkit-scrollbar {
  width: 8px;
}

.gallery-container::-webkit-scrollbar-track {
  background: #b7b7b7;
}

.gallery-container::-webkit-scrollbar-thumb {
  background-color: #fff;
}

.layer-blog-access-2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.see-more {
  color: #fff;
  visibility: hidden;
  font-size: 2vw;
  padding: 6% 10% 0 6%;
  font-weight: 500;
  align-self: flex-end;
  font-family: 'Bebas Neue', sans-serif !important;
}

.name-blog {
  width: 80%;
  padding-left: 2vw;
  padding-bottom: 2vw;
  font-size: 1.5rem;
  color: #fff;
  @media screen and (max-width: 769px) {
    font-size: 1rem;
    padding: 2vw;
    width: 100%;
  }
}
</style>