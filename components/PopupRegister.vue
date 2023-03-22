<template>
  <div>
    <div v-if="!popupREGISTER && showbuttonREGISTER"
      class="flex justify-between items-center">
      <button
        type="button"
        class="d-md-none btn-show-popup"
        @click="showPopup">
        <img src="https://rutero-prod.s3.sa-east-1.amazonaws.com/img/WhatsApp.svg.webp" > boton show popup
      </button>
    </div>
    <div v-if="popupREGISTER" id="popupREGISTER" class="popupMAINcontainer fixed left-0 bottom-0 w-full z-100">
      <div class="SECONDREG-form z-20 m-2 rounded-md overflow-y-auto">
        <button
            type="button"
            class="top-0 right-0 z-10 btn-close-popup"
            @click="hidePopup">
            <x-circle-icon id="btnClosePopupREGISTER" class="text-gray-700"/>
        </button>
        <div class="register-form">
          <RegisterBoxForm @closePopupRegBOX="popupREGISTERaux=!popupREGISTERaux"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterBoxForm from "~/components/Register/RegisterBoxForm.vue";
import { XCircleIcon } from "vue-feather-icons";

export default {
  components: {
    RegisterBoxForm,
    XCircleIcon,
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      popupREGISTER: true,
      popupREGISTERaux: false,
    }
  },
  props: {
    showbuttonREGISTER: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });

      } catch (err) {
        if (err.response.status === 401) {
          alert("Usuario o contraseña incorrectos HOLA");
          this.step = 1;
        } else {
        alert("Ha ocurrido un error");
        this.step = 1;
        }
      }
    },
    showPopup() {
      this.popupREGISTER = true
    },
    hidePopup() {
      this.$emit("closePopupReg", false);
    },
  },
  watch: {
    popupREGISTERaux() {
      if(this.$auth.loggedIn){
        this.hidePopup();
      }
    },
  },

}
</script>


<style lang="scss" scoped>
  .login-form {
    text-align: -webkit-center;

  }
  .SECONDREG-form {
    position: relative;
    width: 30%;
    height: 95%;
    background-color: #ebe8e8;
    padding: 1rem;
    box-shadow: 0 0 20px rgb(0 0 0 / 40%);

   @media screen and (max-width: 1025px) {
      width: 93%;
      height: 96%;

    }
    @media screen and (max-width: 700px) {
    }
    @media screen and (max-width: 391px) {
    }
    @media screen and (max-width: 376px) {
    }
    @media screen and (max-width: 321px) {
    }
  }
  .popupMAINcontainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popupSECONDcontainer {
    position: relative;
    width: 30%;
    height: 80%;
    background-color: #ebe8e8;
    padding: 5rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }
  .btn-close-popup{
    float: right;
    margin: 0.7rem;
    z-index: 100;
    padding-right: 0rem;
  }

  .btn-show-popup {
      transition: box-shadow .3s linear;
      min-width: 200px;
      box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
      border-radius: 20px;
      background-color: #fff;
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translate(-50%);
      z-index: 10;
      text-align: center;
      padding: 2px 15px;
      font-size: 13px;
      font-weight: 700;
      color: #5b676c;
      display: block!important;
      z-index: 80;
      @media screen and (max-width: 1370px) {
        margin-bottom: 72px;
      }
      @media screen and (max-width: 1025px) {
        margin-bottom: 72px;
      }
      @media screen and (min-width: 1800px) {
        margin-bottom: 72px;
      }
      @media screen and (min-width: 1650px) {
        margin-bottom: 72px;
      }
  
  }
  .inputs-cont {
  display: grid;
  text-align: left;

  }
  .auth-form {
    color: #000000;
    border: 0.0625rem solid white;
    border-radius: 0.375rem;
    padding: 0.5rem 0.9375rem 0.5rem;
    font-size: 1rem;
    font-weight: normal;
    line-height: 1.375;
  }

  .auth-link {
    color: rgb(104, 102, 102);
    font-size: 0.8125rem;
    font-weight: 600;
    display: inline-block;
    text-align: center;
    margin: 0 auto;
    text-decoration: none;
    font-family: "Barlow", sans-serif;
  }
  .btn {
    margin-top: 1rem;
    color: white;
    background-color: #33aca6;
    border-color: #4fd1c5;
    margin: 0.2rem;
    padding: 11px;
    margin-right: 0;
    margin-left: 0;
    width: -webkit-fill-available;
  }
  .btn-r {
    margin-top: 1rem;
    color:  #33aca6;
    background-color: #ebe8e8;
    border-color: white;
    margin: 0.2rem;
    padding: 11px;
    margin-right: 0;
    margin-left: 0;
    width: -webkit-fill-available;
  }

  </style>
  