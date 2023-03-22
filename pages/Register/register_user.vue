<template>
  <div>
    <form>
      <div class="register-item">
        <div class="form-step1">
          <div class="form-step1_info">
            <img
              class="form-step1_logo"
              src="~/assets/images/icon-rutero.webp"
            />
            <h2>
              Rutero te ayuda a encontrar los mejor
              <strong>servicios outdoor</strong> y hacer reservas en un solo
              lugar!
            </h2>
            <img
              class="form-step1_img"
              src="~/assets/images/mobile-v.webp"
            />
          </div>
          <RegisterBoxForm />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import RegisterBoxForm from "../../components/Register/RegisterBoxForm.vue";

export default {
  components: {
    RegisterBoxForm,
  },
  layout: "empty",
  head() {
		return {
			title: "Rutero |  Registro",
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
    return {
      step: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.register-item {
  display: grid;
  align-items: center;
  min-height: 80vh;
  padding-top: 2rem;
  margin-right: 20vh;
  margin-left: 20vh;
  @media screen and (max-width: 1025px) {
    margin-right: 0;
    margin-left: 0;
  }
}
.form-step1 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 45%);
  justify-content: space-between;
  padding-right: 50px;
  padding-left: 50px;

  @media screen and (max-width: 1025px) {
    grid-template-columns: 100%;
    row-gap: 20px;
    padding: 1rem;
  }
  .form-step1_info {
    display: grid;
    row-gap: 20px;
    height: fit-content;
    .form-step1_logo {
      width: 95%;
      @media screen and (max-width: 1025px) {
        width: 50%;
      }
    }
    h2 {
      width: 75%;
      font-size: 34px;
      @media screen and (max-width: 426px) {
        font-size: 24px;
      }
    }
    .form-step1_img {
      width: 40%;
      justify-self: end;
      @media screen and (max-width: 1025px) {
        width: 30%;
      }
    }
  }
}

</style>
