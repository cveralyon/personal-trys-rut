<template>
  <div>
    <div v-if="popup" id="popup" class="popupMAINcontainer fixed left-0 bottom-0 w-full z-100">
      <div class="popupSECONDcontainer z-20 m-2 rounded-md overflow-y-auto">
        <div>
          <button
            type="button"
            class="top-0 right-0 z-10 btn-close-popup"
            @click="hidePopup">
            <x-circle-icon id="btnClosePopupLOGIN" class="text-gray-700"/>
          </button>
          <div class="login-form">
            <h2 style="color:#33aca6;padding-top:5px;">¡Hola! &#9996; </h2>
            <h3>Para seguir debes ingresar con tu usuario</h3>

            <form style="margin-top:2rem" @submit.prevent="userLogin">
              <div class="inputs-cont" >
                <label for="email" class="p-1">Correo electrónico:</label>
                <input
                  id="email"
                  v-model="login.email"
                  class="auth-form"
                  placeholder="Correo electrónico"
                />
              </div>
              <div class="inputs-cont">
                <label for="pass" style="margin-top: 5px;" class="p-1">Contraseña:</label>
                <input
                  id="pass"
                  type="password"
                  v-model="login.password"
                  class="auth-form"
                  placeholder="Contraseña"
                />
              </div>
              <div>
                <button style="margin-top: 1rem;" class="btn"><b>Ingresar</b></button>
              </div>
            </form>
            <!-- <nuxt-link to="/" class="auth-link">Recuperar contraseña</nuxt-link> -->
            <button  class="btn-r" @click="showPopupRegister"><b>Crear cuenta</b></button>
          </div>

        </div>
      </div>
    </div>
    <div v-if="register_popup">
      <PopupRegisterVue @closePopupReg ="register_popup=!register_popup" />
    </div>
  </div>
</template>

<script>
import { XCircleIcon } from 'vue-feather-icons'
import PopupRegisterVue from './PopupRegister.vue'

export default {
  components: {
    XCircleIcon,
    PopupRegisterVue
  },
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      register_popup: false,
      popup: true
    }
  },
  props: {
    showbutton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async userLogin () {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login
        })
        if (response.status === 200) {
          this.popup = false
        }
      } catch (err) {
        if (err.response.status === 401) {
          alert('Usuario o contraseña incorrectos')
          this.step = 1
        } else {
          alert('Ha ocurrido un error')
          this.step = 1
        }
      }
    },
    showPopupRegister () {
      this.register_popup = true
    },
    showPopup () {
      this.popup = true
    },
    hidePopup () {
      this.$emit('closePopup', false)
    }
  },
  watch: {
    register_popup (newVal) {
      if (newVal === false && this.$auth.loggedIn) {
        this.popup = false
        this.$emit('closePopup', false)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .login-form {
    text-align: -webkit-center;

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

    @media screen and (max-width: 1025px) {
      width: 86%;
      height: 77%;
      padding: 3rem;

    }
  }
  .btn-close-popup{
    padding: 0.3rem;
    float: right;
    margin: -1.3rem;
    z-index: 100;
    padding-right: 0rem;
  }
  .inputs-cont {
  display: grid;
  text-align: left;

  }
  .auth-form {
    color: #000000;
    border: 0.0625rem solid #6c757d6e;
    border-radius: 0.375rem;
    padding: 0.5rem 0.9375rem 0.5rem;
    font-size: 1rem;
    font-weight: normal;
    line-height: 1.375;
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
