<template>
  <footer>
    <div class="icon_footer">
    </div>
    <div class="content_footer">
      <div v-if="austerra" class="logo">
        <NuxtImg loading="lazy" format="webp" src="/footer/Logo_Blanco.png" alt="Rutero-image" title="Rutero"/>
        <span style="color: white;">® RUTERO {{ currYear }}</span>
      </div>
      <div class="about">
        <p style="margin-bottom: 0.5rem;" v-if="austerra" >SOBRE RUTERO:</p>
        <a href="/TerminosyCondiciones" style="padding: 4px 10px 4px 0px;">Términos y Condiciones</a>
        <a href="/PoliticasdePrivacidad" style="padding: 4px 10px 4px 0px;">Políticas de Privacidad</a>
        <a href="/TerminosdePago" style="padding: 4px 10px 4px 0px;">Términos de Pago</a>
        <a href="/PoliticasdeCancelacion" style="padding: 4px 10px 4px 0px;">Políticas de Cancelación</a>
      </div>
      <div class="contact">
        <a href="tel:56966762873" style="color:white; display:flex; gap: 10px; text-decoration: none;">
          (+569) 6676 2873
          <NuxtImg loading="lazy" format="webp" quality="50" src="/footer/Phone.png" alt="Phone-image" title="phone" style="max-width:1.5rem;"/>
        </a>
        <a href="mailto:equipo@rutero.cl" style="color:white; display:flex; gap: 10px; text-decoration: none; float: right;">
          equipo@rutero.cl
          <NuxtImg loading="lazy" format="webp" quality="50" src="/footer/Email.png" alt="Email-image" title="email" style="max-width:1.5rem;"/>
        </a>
      </div>
      <div v-if="austerra" class="social">
        <a href="https://www.instagram.com/rutero.cl/" target="_blank">
          <NuxtImg loading="lazy" format="webp" quality="50" src="/footer/Instagram.png" alt="Instagram-image" title="instagram" style="max-width:4rem;"/>
        </a>
        <a href="https://www.facebook.com/rutero.cl/" target="_blank">
          <NuxtImg loading="lazy" format="webp" quality="50" src="/footer/Facebook.png" alt="Facebook-image" title="facebook" style="max-width:4rem;"/>
        </a>
        <a href="https://wa.me/56966762873" target="_blank">
          <NuxtImg loading="lazy" format="webp" quality="50" src="/footer/Whastapp.png" alt="Messenger-image" title="whatssap" style="max-width:4rem;"/>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  MessageCircleIcon,
} from "vue-feather-icons";
export default {
  name: "AppFooter",
  data: () => ({
    currYear: 2018,
    austerra: null,
  }),
  components: {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    MessageCircleIcon,
  },
  mounted() {
    if (localStorage.getItem("ref") === "austerra") {
      this.austerra = false;
    }
    else {
      this.austerra = true;
    }
  },
  watch: {
    austerra(){
      if (localStorage.getItem("ref") === "austerra") {
      this.austerra = false;
      }
      else {
      this.austerra = true;
      }
    }
  },
};
</script>

<style lang="scss" scoped>

footer {
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
}

.icon_footer {
  background-color: transparent;
  width: 100%;
  height: 100%;
  min-height: 30rem;
  background-image: url("/footer/Footer.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width:  1025px) {
    min-height: 10rem;
  }
}
.content_footer {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #263238;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 0;
  @media screen and (max-width:  1025px) {
    flex-direction: column;
    gap: 2rem;
  }
}

.logo {
  max-width: 20rem;
}

.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 800;
  font-family: "Source Sans Variable Light", sans-serif;
  a {
    color: white;
    text-decoration: underline;
    font-weight: 300;
  }
}
.social {
  display: flex;
  gap: 25px;
}
</style>
