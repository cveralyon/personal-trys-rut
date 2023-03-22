<template>
  <div class="partners">
      <p id="partners" class="partner-title">PARTNERS</p>
      <div class="partners-container">
        <div id="partner1" class="partner1" @click="openBanner($event)">
          <NuxtImg
            id="partner1-img"
            src="/landing/Logo-RAC_SALFARENT_RAC_Logo-PNG-Azul.webp"
            :style="{ filter: 'opacity(' + opacitypartner1 + '%)' }"
            alt="partner1-image"
            title="partner1"
            class="partner-img"
            @mouseover="isEntering($event)"
            @mouseleave="isLeaving($event)"
          />
        </div>
        <div id="partner2" class="partner2" @click="openBanner($event)">
          <NuxtImg
            id="partner2-img"
            src="/landing/Log-WL.webp"
            :style="{ filter: 'opacity(' + opacityTent + '%)', maxWidth: 'inherit', margin: 'auto' }"
            alt="partner2-image"
            title="partner2"
            class="partner-img"
            @mouseover="isEntering($event)"
            @mouseleave="isLeaving($event)"
          />
        </div>
        <div id="partner3" class="partner3" @click="openBanner($event)">
          <NuxtImg
            id="partner3-img"
            src="/landing/Logo-Atakama-Alta.webp"
            :style="{ filter: 'opacity(' + opacitypartner3 + '%)' }"
            alt="partner3-image"
            title="partner3"
            class="partner-img"
            @mouseover="isEntering($event)"
            @mouseleave="isLeaving($event)"
          />
        </div>
      </div>
      <div
        v-if="!isHiddenpartner3 && isHiddenTent && isHiddenpartner1"
        id="partner3-redirect"
        class="partner-banner_3"
        @click="redirect($event)"
      >
        <NuxtImg 
          src="/landing/banner-Atakama.webp" 
          alt="partner3-b-image" 
          title="partner3-banner"
        />
      </div>
      <div
        v-if="!isHiddenTent && isHiddenpartner3 && isHiddenpartner1"
        id="partner2-redirect"
        class="partner-banner_2"
        @click="redirect($event)"
      >
        <NuxtImg
          src="/landing/banner-WL.webp"
          alt="partner2-b-image"
          title="partner2-banner"
        />
      </div>
      <div
        v-if="!isHiddenpartner1 && isHiddenTent && isHiddenpartner3"
        id="partner1-redirect"
        class="partner-banner_1"
        @click="redirect($event)"
      >
        <NuxtImg
          src="/landing/Banner_Salfa_Rent.webp"
          alt="partner1rent-b-image"
          title="partner1rent-banner"
        />
      </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    isHiddenpartner3: true,
    isHiddenTent: true,
    isHiddenpartner1: true,
    opacitypartner3: 50,
    opacityTent: 50,
    opacitypartner1: 50,
    isClickedpartner3: false,
    isClickedpartner2: false,
    isClickedpartner1: false,
  }),
  props: ["goEquipment"],
  watch: {
    goEquipment(){
      this.fungoEquipment()
    }
  },
  methods: {
    fungoEquipment() {
      this.isHiddenpartner3 = true;
      this.opacitypartner3 = 50;
      this.isClickedpartner3 = false;
      this.isHiddenTent = true;
      this.opacityTent = 50;
      this.isClickedTent = false;
      this.isHiddenpartner1 = !this.isHiddenpartner1;
      this.isClickedpartner1 = true;
      this.opacitypartner1 = 100;
    },
    openBanner(event) {
      const targetId = event.currentTarget.id;
      if (targetId === "partner3") {
        this.isHiddenTent = true;
        this.opacityTent = 50;
        this.isClickedpartner2 = false;
        this.isHiddenpartner1 = true;
        this.opacitypartner1 = 50;
        this.isClickedpartner1 = false;
        this.isHiddenpartner3 = !this.isHiddenpartner3;
        if (this.isHiddenpartner3) {
          this.isClickedpartner3 = false;
          this.opacitypartner3 = 50;
        } else {
          this.isClickedpartner3 = true;
          this.opacitypartner3 = 100;
        }
      } else if (targetId === "partner2") {
        this.isHiddenpartner3 = true;
        this.opacitypartner3 = 50;
        this.isClickedpartner3 = false;
        this.isHiddenpartner1 = true;
        this.opacitypartner1 = 50;
        this.isClickedpartner1 = false;
        this.isHiddenTent = !this.isHiddenTent;
        if (this.isHiddenTent) {
          this.isClickedpartner2 = false;
          this.opacityTent = 50;
        } else {
          this.isClickedpartner2 = true;
          this.opacityTent = 100;
        }
      } else if (targetId === "partner1") {
        this.isHiddenpartner3 = true;
        this.opacitypartner3 = 50;
        this.isClickedpartner3 = false;
        this.isHiddenTent = true;
        this.opacityTent = 50;
        this.isClickedTent = false;
        this.isHiddenpartner1 = !this.isHiddenpartner1;
        if (this.isHiddenpartner1) {
          this.isClickedpartner1 = false;
          this.opacitypartner1 = 50;
        } else {
          this.isClickedpartner1 = true;
          this.opacitypartner1 = 100;
        }
      }
    },
    isEntering(event) {
      const targetId = event.currentTarget.id;
      if (targetId === "partner3-img") {
        this.opacitypartner3 = 100;
      } else if (targetId === "partner2-img") {
        this.opacityTent = 100;
      } else if (targetId === "partner1-img") {
        this.opacitypartner1 = 100;
      }
    },
    isLeaving(event) {
      const targetId = event.currentTarget.id;
      if (targetId === "partner3-img" && !this.isClickedpartner3) {
        this.opacitypartner3 = 50;
      } else if (targetId === "partner2-img" && !this.isClickedpartner2) {
        this.opacityTent = 50;
      } else if (targetId === "partner1-img" && !this.isClickedpartner1) {
        this.opacitypartner1 = 50;
      }
    },
    redirect(event) {
      const targetId = event.currentTarget.id;
      if (targetId === "partner3-redirect") {
        window.open("https://atakamaoutdoor.cl/?ref=RUTERO.CL", "_blank");
      } else if (targetId === "partner2-redirect") {
        window.open("https://www.wildlama.com/?ref=RUTERO.CL", "_blank");
      } else if (targetId === "partner1-redirect") {
        window.open("https://www.salfarent.cl/?ref=RUTERO.CL", "_blank");
      }
    },

  }
}
</script>

<style lang="scss" scoped>

.partner3,
.partner2,
.partner1 {
  flex: 1;
  cursor: pointer;
  max-width: 70%;
  height: auto;
  margin: auto;
}

.partner-banner_3 {
  max-width: 70%;
  height: auto;
  margin: 0 auto;
  cursor: pointer;
  margin-bottom: 30px;
  width: 95vw;
  @media screen and (max-width: 1025px) {
    max-width: 100%;
  }
}

.partner-banner_2 {
  max-width: 55%;
  height: auto;
  margin: 0 auto;
  cursor: pointer;
  margin-bottom: 30px;
  width: 95vw;
  @media screen and (max-width: 1025px) {
    max-width: 100%;
  }
}

.partner-banner_1 {
  max-width: 64%;
  height: auto;
  margin: 0 auto;
  cursor: pointer;
  margin-bottom: 30px;
  @media screen and (max-width: 1025px) {
    max-width: 100%;
  }
}

.partner-title {
  margin: 0 0 30px 120px;
  font-family: BebasNeue-Regular;
  font-size: 3rem;
  @media screen and (max-width: 1025px) {
    margin: 0 0 30px 85px;
  }
}
.partners-container {
  padding: 0 10% 2% 10%;
  flex-direction: row;
  display: flex;
  column-gap: 35px;
  @media screen and (max-width: 1025px) {
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    padding: 0;
    padding-bottom: 10%;
    row-gap: 20px;
  }
}
.partners {
  width: 100%;
  background-color: white;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.partner-img {
  width: 51vw;
}
</style>