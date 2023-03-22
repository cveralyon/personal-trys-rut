<template>
  <client-only>
    <div class="pin_master">
        <div class="flex">
            <img
              id="pin"
              alt="pin-image"
              title="pin"
              src="~/assets/icons/PIN.svg"
              class="object-contain pin_2"
            />
        </div>
        <div class="subtype_icon" @click="goTo(subtype)">
            <NuxtImg preload format="webp"
              id="icon"
              alt="icon-image"
              title="icon"
              v-bind:src="subtype | loadIcon"
              class="object-cover icon"
            />
        </div>
        <small class="subtype_name">
            {{ subtype }}
        </small>
    </div>
  </client-only>
</template>

<script>
export default {
    props: ["subtype"],
    filters: {
    loadIcon: function (subt) {
      if (subt == "Observación de animales") {
        return "https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/services/Observacion+de+Animales+Negro.png";
      }
      if (subt == "Stand Up Paddle") {
        return "https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/services/Standup+Paddle+Negro.png";
      }
      if (subt == "Moto Enduro") {
        return "https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/services/Moto+Negro.png"
      }
    return (
        "https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/services/" +
        subt +
        " Negro.png"
      );
    },
  },
  methods: {
    goTo(subtype) {
        window.location.href = "/search?Service=" + subtype;
    },
  },
}
</script>

<style lang="scss" scoped>

.subtype_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 114px;
    margin: 1rem;
    cursor: pointer;
    position: relative;
    @media (max-width: 1025px) {
      min-width: 55px;
    }
}
.icon {
  width: 60.34px;
  height: 60.34px;
  @media (max-width: 1025px) {
    width: 30px;
    height: 30px;
  }
}
.subtype_name {
    font-size: 1.2rem; 
    color:white; 
    font-weight: 600;
    position: relative;
    top: 53px;
    font-family: "Source Sans Variable Light", sans-serif;
    @media (max-width: 1025px) {
      font-size: 0.8rem;
      top: 30px;
    }
}
.pin_2 {
  position: absolute;
  top: -27px;
  @media (max-width: 1025px) {
    top: -15px;
  }
}
.pin_master {
  position: relative;
  min-height: 15rem;
  text-align: center;
  margin-top: 1rem;
  align-items: flex-end;
  @media (max-width: 1025px) {
    min-height: 10rem;
  }
}
</style>