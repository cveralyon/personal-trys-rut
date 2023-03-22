<template>
  <client-only>
    <div class="form-step1_form-container">
      <div class="form-step1_form-content">
        <div class="form-step1_title">
          <h2>Regístrate</h2>
          <h4>Es así de rápido y fácil</h4>
        </div>
        <b-form @submit.prevent="registerUser">
          <div class="form-floating">
            <b-form-input
              :state="isValidName"
              type="text"
              class="form-control"
              id="user_name"
              placeholder="Nombre"
              v-model="form.first_name"
              required
              minlength="3"
            />
            <b-form-invalid-feedback>
              El nombre debe tener al menos 3 caracteres y no debe contener
              caracteres especiales.
            </b-form-invalid-feedback>
            <label for="lastName">Nombre</label>
          </div>
          <div class="form-floating">
            <b-form-input
              :state="isValidLastName"
              type="text"
              class="form-control"
              id="lastName"
              placeholder="Apellido"
              v-model="form.last_name"
              minlength="2"
              required
            />
            <b-form-invalid-feedback>
              El apellido debe tener al menos 2 caracteres y no debe contener
              caracteres especiales.
            </b-form-invalid-feedback>
            <label for="lastName">Apellido</label>
          </div>
          <div class="form-floating">
            <b-form-input
              :state="isValidEmail"
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
              v-model="form.email"
              required
            />
            <b-form-invalid-feedback>
              El email es inválido.
            </b-form-invalid-feedback>
            <label for="email">Email</label>
          </div>
          <div class="form-floating">
            <b-form-input
              :state="isValidConfirmEmail"
              type="email"
              class="form-control"
              id="emailConfirm"
              placeholder="Email"
              v-model="form.emailConfirm"
              required
            />
            <b-form-invalid-feedback>
              Los emails no coinciden.
            </b-form-invalid-feedback>
            <label for="emailConfirm">Confirme Email</label>
          </div>
          <div class="input-group input-group-lg">
            <span class="input-group-text" id="phone">+56</span>
            <b-form-input
              :state="isValidPhone"
              minlength="9"
              maxlength="9"
              type="number"
              class="form-control"
              placeholder="Telefono"
              id="telefono"
              aria-label="Telefono"
              aria-describedby="phone"
              v-model="phone"
              required
            />
            <b-form-invalid-feedback>
              El número de teléfono debe tener 9 dígitos.
            </b-form-invalid-feedback>
          </div>
          <div class="form-floating">
            <b-form-input
              :state="isValidPassword"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="form.password"
              required
              minlength="8"
            />
            <b-form-invalid-feedback>
              La contraseña debe tener al menos 8 caracteres.
            </b-form-invalid-feedback>
            <label for="password">Contraseña</label>
          </div>
          <div class="form-floating">
            <b-form-input
              :state="isValidConfirmPassword"
              type="password"
              class="form-control"
              id="passwordConfirm"
              placeholder="Password"
              v-model="form.passwordConfirm"
              required
              minlength="8"
            />
            <b-form-invalid-feedback>
              Las contraseñas no coinciden.
            </b-form-invalid-feedback>
            <label for="passwordConfirm">Confirme Contraseña</label>
          </div>

          <button type="submit" class="btn-steps__item">Registrarse</button>
        </b-form>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      phone: "",
      form: {
        first_name: "",
        last_name: "",
        email: "",
        emailConfirm: "",
        phone: "",
        password: "",
        passwordConfirm: "",
      },
    };
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
    async registerUser() {
      this.form.phone = "56"+this.phone;
      this.form.email = this.form.email.toLowerCase();
      if (window.location.href.includes("register/register_user")) {
        const response = await this.$axios
          .$post("/api/v1/users", this.form)
          .then((response) => {
            this.$router.push("/register/successfullyRegistered");
          })
          .catch((error) => {
            if (error.response.status == "422") {
              alert("El email ya se encuentra registrado");
            } else {
              alert("Error al registrar usuario");
            }
          });
      } else {
        const response = await this.$axios
          .$post("/api/v1/users", this.form)
          .catch((error) => {
            if (error.response.status == "422") {
              alert("El email ya se encuentra registrado");
            } else {
              alert("Error al registrar usuario");
            }
          });
      }
      this.login.email = this.form.email;
      this.login.password = this.form.password;
      let user = await this.$auth.loginWith("local", {
        data: this.login,
      });
      if(user.status == 200){
        this.$emit("closePopupRegBOX", true);
        alert("Usuario registrado correctamente");
      }
      window.scrollTo(0, 0);
    },
  },
  computed: {
    isValidEmail() {
      if (this.form.email.length > 0) {
        return (
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            this.form.email
          ) && this.omit_special_char(this.form.email)
        );
      }
    },
    isValidConfirmEmail() {
      if (this.form.email.length > 0 && this.form.emailConfirm.length > 0) {
        return (
          this.form.email === this.form.emailConfirm &&
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            this.form.emailConfirm
          ) &&
          this.omit_special_char(this.form.emailConfirm)
        );
      }
    },
    isValidPassword() {
      if (this.form.password.length === 0) {
        return null;
      } else {
        return this.form.password.length > 7;
      }
    },
    isValidConfirmPassword() {
      if (this.form.password.length === 0) {
        return null;
      } else {
        return (
          this.form.password === this.form.passwordConfirm &&
          this.form.password.length > 7
        );
      }
    },
    isValidName() {
      if (this.form.first_name.length === 0) {
        return null;
      } else {
        return (
          this.form.first_name.length > 2 &&
          this.omit_special_char(this.form.first_name)
        );
      }
    },
    isValidLastName() {
      if (this.form.last_name.length === 0) {
        return null;
      } else {
        return (
          this.form.last_name.length > 1 &&
          this.omit_special_char(this.form.last_name)
        );
      }
    },
    isValidPhone() {
      if (this.phone.length === 0) {
        return null;
      } else {
        return this.phone.length === 9 && /^[0-9]+$/.test(this.phone);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  position: relative;
  margin: 1rem;
  margin-right: 1rem;
  padding-right: 2rem;
}
.form-floating {
  position: relative;
  margin: 1rem;
}
input:valid {
  border: 2px solid rgb(13, 214, 23);
}
// input:invalid {
//   border: 2px solid rgb(238, 9, 9);
// }

.form-step1_form-container {
  @media screen and (max-width: 1025px) {
    // margin-bottom: 40px;
  }
  .form-step1_form-content {
    background: #ebe8e8;
    border: 1px solid#ebe8e8;
    border-radius: 10px;
    .form-step1_title {
      padding: 18px;
      padding-bottom: 1px;

      h1 {
        font-weight: bold;
      }
      h4 {
        color: #a0a0a0;
      }
    }

    .btn-steps__item {
      width: -webkit-fill-available;
      height: 50px;
      background: #62c0bc;
      border-radius: 5px;
      color: #fff !important;
      transition: 400ms;
      margin: 1rem;
      margin-top: 0px;
      &:hover {
        background: #50aca7;
      }
    }
  }
}
</style>
