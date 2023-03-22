<template>
  <div>
    <div class="step-1__bg"></div>
    <div class="register-item">
      <div class="banner_landing">
        <div class="banner_form">
          <h2
            class="font-bold text-4xl mt-3 mb-0 text-gray-900 leading-tight z-10 relative self-start lg:text-5xl slide-in"
          >
            ¡Su <span>registro</span> se hizo exitosamente!
          </h2>

          <h2 class="font-light">
            Solo falta confirmar la cuenta en tu correo electrónico
          </h2>

          <h2>Cualquier duda contactar a equipo@rutero.cl</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Rutero | Registro completado",
      meta: [
        {
          hid: "",
          name: "",
          content: "",
        },
      ],
    };
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700&display=swap");
* {
  font-family: "Source Sans Pro", sans-serif;
}
.step-1__bg {
  position: fixed;
  background: #f1f1f1;
  width: 100%;
  height: 100vh;
  z-index: -1;
  top: 0;
  left: 0;
}
.navbar-register {
  width: fit-content;
  max-width: 1280px;
  padding: 40px 1rem;
  position: absolute;
  top: 0;
  margin: 0 auto;
}
h1 {
  font-size: 40px;

  @media only screen and (max-width: 768px) {
    font-size: 26px !important;
  }
}
h2 {
  font-size: 24px;
}
h3 {
  font-size: 18.72px;
}
h4 {
  font-size: 16px;
}
h5 {
  font-size: 13.28px;
}
h5 {
  font-size: 10.72px;
}
.register-item {
  display: grid;
  align-items: center;
  min-height: 80vh;
}
.banner_landing {
  grid-template-columns: 52% 47%;
  justify-content: space-between;
  margin: auto;
  @media only screen and (max-width: 769px) {
    grid-template-columns: 100%;
    padding-top: 10px;
  }
  .banner_img {
    display: grid;
    row-gap: 30px;
    justify-content: center;
    max-width: 40rem;
    img {
      width: 80%;
      margin: 0 auto;
    }
    .ruteroLogo {
      width: 30%;
    }
  }
  .banner_form {
    background: #fff;
    padding: 50px 10%;
    margin: 1rem;
    border-radius: 10px;
    border: 1px solid #bbb;
    text-align: center;
    display: grid;
    row-gap: 40px;
    max-width: 40rem;
    max-height: 32rem;
    .font-light {
      font-weight: 100;
    }
    span {
      color: #62c0bc;
    }
  }
}
</style>
