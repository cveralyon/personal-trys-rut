<template>
  <div class="blog-card">
    <nuxt-link
        :to="'./' + slug"
        style="color: black; text-decoration: none"
      >
      <!-- <VueFlux
        :images="background"
        :options="options_placeholder"
        :transitions="transitions"
      >
      </VueFlux> -->

      <div class="layer" id="background">
        <p class="see-more">+ VER MÁS</p>
        <p class="blog-card-title">{{blogTitle}}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
let VueFlux;
let FluxPreloader;
let FluxControls;
if (process.browser) {
  const VF = require("vue-flux");
  VueFlux = VF.VueFlux;
  FluxPreloader = VF.FluxPreloader;
  FluxControls = VF.FluxControls;
}

export default {
  name: 'cardBlogs',
  props:["blogTitle", "id" ,"background", "slug"],
  components: {
    VueFlux,
    FluxControls,
    FluxPreloader,
  },
  data() {
    return {
      options: {
        autoplay: true,
      },
      options_placeholder: {
        autoplay: false,
      },
      transitions: ["slide"],
    }
  },
  created() {
    this.setbackground();
  },
  methods: {
  }
}
</script>

<style>
.layer {
  width: 100%;
  height: 100%;
  padding: 0;
  position: absolute;
  top: 0;
  background-color: rgba(53,53,53,0.8);
}
.layer:hover {
  background: linear-gradient(
        rgba(80, 209, 197, 0.8),
        rgba(41, 53, 59, 0.8)
      );
}
.blog-card-title {
  padding: 5% 20% 0 6%;
  color: #EAF7F6;
  font-size: 1.4vw;
  position: absolute;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size: 5vw !important;
  }
}
.see-more {
  color: #EAF7F6;
  display: none;
  font-size: 1.4vw;
  padding: 4% 0 0 6%;
  font-weight: 500;
}
.blog-card {
  margin-bottom: 3.125rem;
  max-width: 100%;
  position: relative;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  height: 16vh;
  border-left: thick solid #ffff;
  transition: all .3s ease;
  box-sizing: border-box; 
  background-image: url(https://dgoz6t0l59f4w.cloudfront.net/blog_articles/covers/000/000/178/medium/Mirador-Sierra-Nevada_rutero.jpg?1621821584);
  @media screen and (max-width: 768px) {
    margin-left: 7.5vw;
    margin-right: 7.5vw;
  }
}
.blog-card:hover {
  height: 24vh;
  border-left: 0;
  border-right: thick solid #ffff;
}
.blog-card:hover .see-more {
  display: block;
}
</style>