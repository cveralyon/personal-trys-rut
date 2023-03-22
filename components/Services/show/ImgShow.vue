<template>
  <client-only>
    <div class="img-main-cont">
      <div class="padding">
        <carousel
          v-bind:value="selectedID"
          ref="carousel"
          :loop="true"
          :perPage="1"
          :scroll-per-page="true"
          :pagination-enabled="false"
          :navigation-enabled="true"
          :navigation-prev-label="`<`"
          :navigation-next-label="`>`"
          :autoplay="false"
          :centerMode="true"
          v-on:page-change="update_value"
        >
          <slide v-for="(item, idx) in items" :key="idx">
            <clazy-load v-bind:src="item">
              <img
                v-bind:src="item"
                class="responsive"
                :alt="`${service.region} ${service.city} ${service.subtype} en rutero.cl`"
                :title="`${service.region} ${service.city} ${service.subtype} en rutero.cl`"
              />
              <div class="preloader" slot="placeholder"><Preloader /></div>
            </clazy-load>
          </slide>
        </carousel>
      </div>

      <div class="carousel-image">
        <div class="gallery-container">
          <img
            class="gallery__item"
            v-for="(item, idx) in minis"
            :key="idx"
            v-bind:src="item"
            v-on:click="selectedID = idx"
            :alt="`${service.region} ${service.city} ${service.subtype} en rutero.cl`"
            :title="`${service.region} ${service.city} ${service.subtype} en rutero.cl`"
          />
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import Preloader from "~/components/Services/show/Preloader.vue";
export default {
  data() {
    return {
      selectedID: 0,
    };
  },
  props: ["items", "minis", "service"],
  methods: {
    update_value(val) {
      this.selectedID = val;
    },
  },
  components: {
    Preloader,
  },
};
</script>

<style lang="scss" scoped>
body {
  color: #333;
}
a,
a:visited {
  color: #333;
}

.gallery-container {
  margin-left: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  @media screen and (max-width: 1025px) {
    padding-right: 2rem;
    padding-left: 1rem;
    margin: 0;
  }
  @media screen and (max-width: 576px) {
    padding: 0 2rem;
    margin: 0;
  }
}

.VueCarousel-slide img {
  height: auto;
  // max-width: 4rem;
}

.carousel-image {
  max-height: 18.5rem;
  max-width: 36rem;
  overflow-y: scroll;
  width: 40%;
  @media screen and (max-width: 1025px) {
    max-height: 8.8rem;
    margin-top: 0rem;
    width: 100%;
  }
}
.VueCarousel-inner {
  flex-basis: 326px;
}

.img-main-cont {
  margin-top: 30px;
  width: 100%;
  display: flex;
  @media screen and (max-width: 1025px) {
    margin: 0 2rem;
    margin-top: 30px;
  }
  @media screen and (max-width: 576px) {
    margin: 0;
    display: block;
  }
}

.responsive {
  width: 100%;
  max-height: 30rem;
  min-height: 30rem;
  object-fit: cover;
  max-width: 800px;
  @media screen and (max-width: 1025px) {
    min-height: 16rem;
    max-height: 16rem;
    margin-bottom: 4px;
  }
}
.gallery__item {
  width: 100%;
  height: 100%;
  max-height: 5.5rem;
  object-fit: cover;
  @media screen and (max-width: 1025px) {
    max-height: 3.5rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
}

.preloader {
  margin-top: 10rem;
  @media screen and (max-width: 1025px) {
    margin-top: 2rem;
  }
}
.padding {
  padding: 0;
  width: 61.5%;
  margin-right: 1.5rem;
  @media screen and (max-width: 576px) {
    padding: 0 2rem;
    width: 100%;
    margin: 0;
  }
}
</style>
