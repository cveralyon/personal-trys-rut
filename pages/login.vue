<template>
  <client-only>
  <div class="center">
    <nuxt-link to="/">
      <img src="~/assets/images/icon-rutero.webp" alt="rutero-icon" class="auth-logo" />
    </nuxt-link>
    <a style="display: none;" href="/TerminosyCondiciones">ATRAS</a>
    <div style="text-align: center;max-width: 15rem;">
      <div class="form-floating">
        <b-form-input
          :state="isValidEmail"
          type="email"
          class="auth-form"
          id="email"
          placeholder="Correo electrónico"
          v-model="login.email"
        />
        <b-form-invalid-feedback>
          El email es inválido.
        </b-form-invalid-feedback>
        <label for="email">Correo electrónico:</label>
      </div>
      <div v-if="!this.recPass">
        <div class="form-floating">
        <b-form-input
          type="password"
          class="auth-form"
          id="password"
          placeholder="Contraseña"
          v-model="login.password"
        />
        <label for="password">Contraseña:</label>
        </div>
        <div>
          <button @click="userLogin()" class="auth-btn">Ingresar</button>
        </div>
        <a @click="recuperarPass()" class="auth-link">Recuperar contraseña</a>

      </div>
      <div v-else >
        <button @click="enviarCorreoPass()" class="auth-btn">Enviar</button>
      </div>
    </div>
    <button style="color:white;" @click="home()">.</button>
  </div>
  </client-only>
</template>

<script>
export default {
  layout: "login",
    head() {
    return {
      title: "Rutero |  Iniciar sesión",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Inicie sesión en Rutero para acceder a su cuenta y reservar tu proxima aventura.",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://www.rutero.cl/login",
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://www.rutero.cl/login'
        }
      ],
    };
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      recPass: false,
    };
  },
  computed: {
    isValidEmail() {
      if (this.login.email.length > 0) {
        return (
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            this.login.email
          ) && this.omit_special_char(this.login.email)
        );
      }
    },
  },
  methods: {
    omit_special_char(palabra) {
      for (var i = 0; i < palabra.length; i++) {
        if (
          palabra[i] == ";" ||
          palabra[i] == "!" ||
          palabra[i] == "”" ||
          palabra[i] == "’" ||
          palabra[i] == "," ||
          palabra[i] == "~" ||
          palabra[i] == ":" ||
          palabra[i] == ")" ||
          palabra[i] == "(" ||
          palabra[i] == "{" ||
          palabra[i] == '"' ||
          palabra[i] == "}" ||
          palabra[i] == "[" ||
          palabra[i] == "]" ||
          palabra[i] == "#" ||
          palabra[i] == "%" ||
          palabra[i] == "~" ||
          palabra[i] == "|" ||
          palabra[i] == "+" ||
          palabra[i] == "<" ||
          palabra[i] == ">" ||
          palabra[i] == "^" ||
          palabra[i] == "*" ||
          palabra[i] == "&" ||
          palabra[i] == "%"
        ) {
          return false;
        }
      }
      return true;
    },
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        this.$gtm.push({ event: 'login', user: response.data.user });
        dataLayer.push({
          event: "login",
          user: response.data.user,
        });
        if (this.$auth.user.type === 'admin') {
            this.$router.push("/admin/company/"+this.$auth.user.company_id+"/Reservas/activas");
        } else {
          this.$router.push("/User/Reservations");
      }
      } catch (err) {
        alert("Ha ocurrido un error");
      }
    },
    recuperarPass(){
      this.recPass = true;
    },
    async enviarCorreoPass(){

      const response = await this.$axios.$post(
                  '/api/v1/users/forgot_password',
                  {email:this.login.email}
                  ).then(response => {
                  alert("Si hay alguna cuenta asociada al correo, se enviara un correo para recuperar la contraseña")

                }).catch(error => {
                  alert("Ha ocurrido un error encontrando su usuario, intente nuevamente")

                });
      window.location.href = "./";
    },
    home(){
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.form-floating {
  position: relative;
  margin-bottom: 1rem;
  min-width: 15rem;

}
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}

.auth-logo {
  display: block;
  margin: 0 auto;
  width: 207px;
  margin-bottom: 3.5rem;
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

.auth-btn {
  width: -webkit-fill-available;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 1.125rem;
  color: white;
  position: relative;
  padding: 0.875rem 33%;
  background-color: #36b0a7;
}

.auth-btn:hover {
  background-color: white;
  color: #36b0a7;
  transition: all 0.2s ease;
  cursor: pointer;
}

.auth-btn:active {
  background-color: #36b0a7;
}

.auth-link {
  color: white;
  font-size: 0.8125rem;
  font-weight: 600;
  float: left;
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  text-decoration: none;
  font-family: "Barlow", sans-serif;
  cursor: pointer;
}
.auth-link:hover {
  color: #36b0a7;
  font-size: 0.8125rem;
  font-weight: 600;
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  text-decoration: none;
  font-family: "Barlow", sans-serif;
}

</style>
