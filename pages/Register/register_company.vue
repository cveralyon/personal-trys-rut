<template>
  <client-only>
    <div>
      <div v-if="step === 1" class="register-item">
        <div class="form-step1">
          <div class="form-step1_info">
            <img
              class="form-step1_logo"
              src="~/assets/images/icon-rutero.webp"
            />
            <h1>
              Rutero te ayuda a visibilizar tu
              <strong>servicio outdoor</strong> y recibir reservas de forma
              sencilla
            </h1>
            <img
              class="form-step1_img"
              src="~/assets/images/mobile-v.webp"
            />
          </div>
          <div class="form-step1_form-container">
            <h3>PASO <strong>1</strong> DE <strong>3</strong></h3>
            <div class="form-step1_form-content">
              <div class="form-step1_title">
                <h2>Regístrate</h2>
                <h4>Es así de rápido y fácil</h4>
              </div>
              <b-form @submit="submit_company">
                <div class="form-step1_itemGroup inputItem">
                  <h3>Datos del administrador</h3>
                  <div class="form-floating">
                    <b-form-input
                      :state="isValidName"
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder="Nombre"
                      required
                      minlength="3"
                      v-model="form.admin.first_name"
                    />
                    <b-form-invalid-feedback>
                      El nombre debe tener al menos 3 caracteres y no debe
                      contener caracteres especiales.
                    </b-form-invalid-feedback>
                    <label for="form.admin.first_name">Nombre</label>
                  </div>
                  <div class="form-floating">
                    <b-form-input
                      :state="isValidLastName"
                      type="text"
                      class="form-control"
                      id="lastName"
                      placeholder="Apellido"
                      required
                      v-model="form.admin.last_name"
                    />
                    <b-form-invalid-feedback>
                      El apellido debe tener al menos 2 caracteres y no debe
                      contener caracteres especiales.
                    </b-form-invalid-feedback>
                    <label for="lastName">Apellido</label>
                  </div>
                  <div class="form-floating">
                    <b-form-input
                      :state="isValidEmail"
                      type="email"
                      class="form-control"
                      id="form.admin.email"
                      placeholder="form.admin.email"
                      required
                      v-model="form.admin.email"
                    />
                    <b-form-invalid-feedback>
                      El email es inválido.
                    </b-form-invalid-feedback>
                    <label for="form.admin.email">Email</label>
                  </div>
                  <div class="form-floating">
                    <b-form-input
                      :state="isValidConfirmEmail"
                      type="email"
                      class="form-control"
                      id="form.admin.emailConfirm"
                      required
                      v-model="form.admin.emailConfirm"
                      placeholder="form.admin.email"
                    />
                    <b-form-invalid-feedback>
                      Los emails no coinciden.
                    </b-form-invalid-feedback>
                    <label for="form.admin.emailConfirm">Confirme Email</label>
                  </div>
                  <div
                    class="input-group input-group-lg"
                    style="margin: 0; padding-right: 0"
                  >
                    <span class="input-group-text" id="phone">+56 &nbsp;</span>
                    <b-form-input
                      :state="isValidPhone"
                      type="number"
                      class="form-control"
                      placeholder="Telefono"
                      id="telefono"
                      aria-label="Telefono"
                      aria-describedby="phone"
                      required
                      v-model="phone"
                    />
                  </div>
                  <div class="form-floating usertype">
                    <div>
                      <input
                        id="persona"
                        type="radio"
                        name="tipo-servicio"
                        value="true"
                        required
                        v-model="form.type"
                        @click="closeEmpresa()"
                      />
                      <label for="persona">Persona Natural</label>
                      <input
                        id="empresa"
                        type="radio"
                        name="tipo-servicio"
                        value="false"
                        v-model="form.type"
                        @click="openEmpresa()"
                      />
                      <label for="empresa">Empresa</label>
                    </div>
                  </div>
                  <div class="form-floating empresa">
                    <b-form-input
                      :state="isValidCompanyName"
                      type="text"
                      class="form-control"
                      id="company_name"
                      placeholder="Nombre Empresa"
                      v-model="form.company.name"
                      :required="form.type === 'false'"
                    />
                    <b-form-invalid-feedback>
                      El nombre debe tener al menos 3 caracteres y no debe
                      contener caracteres especiales.
                    </b-form-invalid-feedback>
                    <label for="name">Nombre Empresa</label>
                  </div>
                  <div class="form-floating persona">
                    <b-form-input
                      :state="isValidRut"
                      type="text"
                      class="form-control"
                      id="rut_persona"
                      placeholder="Rut"
                      v-model="rut"
                      :required="form.type === 'true'"
                    />
                    <b-form-invalid-feedback>
                      El rut es inválido.
                    </b-form-invalid-feedback>
                    <label for="rut">Rut Persona</label>
                  </div>
                  <div class="form-floating empresa">
                    <b-form-input
                      :state="isValidRut"
                      type="text"
                      class="form-control"
                      id="rut"
                      placeholder="Rut"
                      v-model="rut"
                      :required="form.type === 'false'"
                    />
                    <b-form-invalid-feedback>
                      El rut es inválido.
                    </b-form-invalid-feedback>
                    <label for="rut">Rut Empresa</label>
                  </div>
                  <div class="form-floating">
                    <b-form-input
                      :state="isValidPassword"
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                      required
                      v-model="form.admin.password"
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
                      required
                      placeholder="Password"
                      v-model="form.admin.passwordConfirmation"
                    />
                    <b-form-invalid-feedback>
                      Las contraseñas no coinciden.
                    </b-form-invalid-feedback>
                    <label for="passwordConfirm">Confirme Contraseña</label>
                  </div>
                </div>
                &nbsp;
                <button type="submit" class="btn-steps__item">Continuar</button>
              </b-form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 2" class="register-item">
        <h3>PASO <strong>2</strong> DE <strong>3</strong></h3>
        <section v-if="selected.length < 1">
          <h2 class="title">¿Qué tipo de Servicios entregas?</h2>
          <div class="form-step3">
            <div class="activities" @click="selected = 'actividad'">
              <input
                id="actividad"
                type="radio"
                name="actividad"
                value="1"
                v-model="service_form.service.service_type"
              />
              <label for="activities" class="subtitle">Actividades</label>
              <img
                src="~/assets/images/activity-v.webp"
              />
            </div>
            <div class="alojamientos" @click="selected = 'alojamiento'">
              <input
                id="alojamiento"
                type="radio"
                name="alojamiento"
                value="0"
                v-model="service_form.service.service_type"
              />
              <label for="alojamientos" class="subtitle">Alojamientos</label>
              <img
                src="~/assets/images/camping-v.webp"
              />
            </div>
          </div>
        </section>
        <section>
          <div v-if="selected.length >= 1" class="select-servicio_bg"></div>
          <b-form id="serviceType">
            <div v-if="selected == 'alojamiento'" class="select-servicio_item">
              <img
                src="~/assets/images/camping-v.webp"
              />
              <div class="select-servicio_item_form">
                <label for="alojamiento">¿Qué tipo de Alojamiento?</label>
                <select
                  id="alojamiento"
                  name="alojamiento"
                  v-model="service_form.service.subtype"
                >
                  <option value="" disabled selected>
                    Tipo de Alojamiento
                  </option>
                  <option
                    v-for="(alojamiento, index) in alojamientos"
                    :key="index"
                    :value="alojamiento.value"
                  >
                    {{ alojamiento.name }}
                  </option>
                </select>
                <button class="btn-steps__item" @click="next()">
                  CONTINUAR
                </button>
              </div>
            </div>
            <div v-if="selected == 'actividad'" class="select-servicio_item">
              <img
                src="~/assets/images/camping-v.webp"
              />
              <div class="select-servicio_item_form">
                <label for="activity">¿Qué tipo de Actividad?</label>
                <select
                  id="activity"
                  name="activity"
                  v-model="service_form.service.subtype"
                >
                  <option value="" disabled selected>Tipo de Actividad</option>
                  <option
                    v-for="(activity, index) in activities"
                    :key="index"
                    :value="activity.value"
                  >
                    {{ activity.name }}
                  </option>
                </select>
                <button class="btn-steps__item" @click="next()">
                  CONTINUAR
                </button>
              </div>
            </div>
          </b-form>
        </section>
      </div>
      <div v-if="step === 3" class="register-item">
        <div class="form-step1">
          <div class="form-step1_info">
            <img
              class="form-step1_logo"
              src="~/assets/images/icon-rutero.webp"
            />
            <h1>
              Rutero te ayuda a visibilizar tu
              <strong>servicio outdoor</strong> y recibir reservas de forma
              sencilla
            </h1>
            <img
              class="form-step1_img"
              src="~/assets/images/mobile-v.webp"
            />
          </div>
          <div class="form-step1_form_container">
            <h3>PASO <strong>3</strong> DE <strong>3</strong></h3>
            <div class="form-step1_form-content">
              <div class="form-step1_title">
                <h2>Selecciona un nombre para tu servicio</h2>
              </div>
              <div class="form-step1_itemGroup inputItem">
                <div class="form-floating-2">
                  <b-form-input
                    :state="isValidNameService"
                    type="text"
                    required
                    placeholder="Nombre de Servicio"
                    v-model="service_form.service.name"
                  />
                  <b-form-invalid-feedback>
                    El nombre de servicio debe tener almenos 3 caracteres.
                  </b-form-invalid-feedback>
                </div>
                <div class="form-step1_TyC">
                  <p>
                    al hacer click en "
                    <strong>Continuar</strong>
                    ", aceptas nuestras
                    <a href="#">Condiciones</a>
                    , la
                    <a href="#">Política de datos</a> y la
                    <a href="#">Política de cookies</a>. Es posible que te
                    enviemos notificaciones por SMS, que puedes desactivar
                    cuando quieras
                  </p>
                </div>
                <button class="btn-steps__item" @click="submit_service()">
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 4" class="register-item">
        <h2>Terminado</h2>
      </div>
    </div>
  </client-only>
</template>

<script>
import { validate, clean, format, getCheckDigit } from "rut.js";
export default {
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
      id: "",
      step: 1,
      selected: "",
      selectedActivity: "",
      rut: "",
      phone: "",
      form: {
        type: "true",
        company: {
          name: "",
          rut: "",
          phone: "",
          email: "",
        },
        admin: {
          first_name: "",
          last_name: "",
          email: "",
          emailConfirm: "",
          password: "",
          passwordConfirmation: "",
        },
      },
      service_form: {
        service: {
          name: "",
          subtype: "",
          status: 2,
          service_type: "",
        },
      },
      login: {
        email: "",
        password: "",
      },
      alojamientos: [
        {
          name: "Camping",
          value: "Camping",
        },
        {
          name: "Glamping",
          value: "Glamping",
        },
        {
          name: "Motorhome",
          value: "Motorhome",
        },
        {
          name: "Lodge",
          value: "Lodge",
        },
        {
          name: "Hostales",
          value: "Hostales",
        },
        {
          name: "Cabaña",
          value: "Cabaña",
        },
      ],
      activities: [
        {
          name: "Observación de animales",
          value: "Observación de animales",
        },
        {
          name: "Buceo",
          value: "Buceo",
        },
        {
          name: "Cabalgata",
          value: "Cabalgata",
        },
        {
          name: "Canopy",
          value: "Canopy",
        },
        {
          name: "Escalada",
          value: "Escalada",
        },
        {
          name: "Kayak",
          value: "Kayak",
        },
        {
          name: "Kitesurf",
          value: "Kitesurf",
        },
        {
          name: "Montañismo",
          value: "Montanismo",
        },
        {
          name: "Moto Enduro",
          value: "Moto Enduro",
        },
        {
          name: "Mountain Bike",
          value: "Mountain Bike",
        },
        {
          name: "Paracaidismo",
          value: "Paracaidismo",
        },
        {
          name: "Parapente",
          value: "Parapente",
        },
        {
          name: "Pesca",
          value: "Pesca",
        },
        {
          name: "Rafting",
          value: "Rafting",
        },
        {
          name: "Randonnee",
          value: "Randonnee",
        },
        {
          name: "Ski",
          value: "Ski",
        },
        {
          name: "Ski Acuático",
          value: "Ski Acuático",
        },
        {
          name: "Slackline",
          value: "Slackline",
        },
        {
          name: "Paintball",
          value: "Paintball",
        },
        {
          name: "Surf",
          value: "Surf",
        },
        {
          name: "Tour",
          value: "Tour",
        },
        {
          name: "Trail Running",
          value: "Trail Running",
        },
        {
          name: "Trekking",
          value: "Trekking",
        },
        {
          name: "Vela",
          value: "Vela",
        },
        {
          name: "Windsurf",
          value: "Windsurf",
        },
        {
          name: "Otro",
          value: "Otro",
        },
      ],
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
    next() {
      this.step++;
      this.service_form.service.service_type = this.selected;
    },

    async submit_company() {
      this.step++;
      this.form.admin.email = this.form.admin.email.toLowerCase();
      this.form.company.email = this.form.admin.email;
      this.form.company.rut = this.rut;
      this.form.company.phone = "56" + this.phone;
      this.login.email = this.form.admin.email;
      this.login.password = this.form.admin.password;
      const response = await this.$axios
        .$post("/api/v1/companies", this.form)
        .then((response) => {})
        .catch((error) => {
          if (error.response.status == "422") {
            this.step--;
            alert("El email ya se encuentra registrado");
          } else {
            this.step--;
            alert("Error al registrar compañia");
          }
        });
      let user = await this.$auth
        .loginWith("local", {
          data: this.login,
        })
        .catch((error) => {
          this.step--;
          alert("Error al registrar compañia");
        });
    },
    async submit_service() {
      if (this.selected == "actividad") {
        this.service_form.service.service_type = 1;
      }
      const response = await this.$axios
        .$post("/api/v1/services", this.service_form)
        .then((response) => {
        })
        .catch((error) => {
        });
      this.$router.push("/register/successfullyRegistered");
    },
    openEmpresa() {
      document.getElementsByClassName("empresa")[0].style.display = "block";
      document.getElementsByClassName("empresa")[1].style.display = "block";
      document.getElementsByClassName("persona")[0].style.display = "none";
    },
    closeEmpresa() {
      document.getElementsByClassName("empresa")[0].style.display = "none";
      document.getElementsByClassName("empresa")[1].style.display = "none";
      document.getElementsByClassName("persona")[0].style.display = "block";
    },
  },
  watch: {
    rut(rut) {
      if (rut.length > 2) {
        this.rut = format(rut);
      }
    },
  },
  computed: {
    isValidEmail() {
      if (this.form.admin.email.length > 0) {
        return (
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            this.form.admin.email
          ) && this.omit_special_char(this.form.admin.email)
        );
      }
    },
    isValidConfirmEmail() {
      if (
        this.form.admin.email.length > 0 &&
        this.form.admin.emailConfirm.length > 0
      ) {
        return (
          this.form.admin.email === this.form.admin.emailConfirm &&
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            this.form.admin.emailConfirm
          ) &&
          this.omit_special_char(this.form.admin.emailConfirm)
        );
      }
    },
    isValidPassword() {
      if (this.form.admin.password.length === 0) {
        return null;
      } else {
        return this.form.admin.password.length > 7;
      }
    },
    isValidConfirmPassword() {
      if (this.form.admin.password.length === 0) {
        return null;
      } else {
        return (
          this.form.admin.password === this.form.admin.passwordConfirmation
        );
      }
    },
    isValidRut() {
      if (this.rut.length === 0) {
        return null;
      } else {
        var regex = /^[0-9.]+[-|‐]{1}[0-9kK]{1}$/;
        return (
          regex.test(this.rut) && this.rut.length > 9 && this.rut.length < 13
        );
      }
    },
    isValidCompanyName() {
      if (this.form.company.name.length === 0) {
        return null;
      } else {
        return this.form.company.name.length > 2;
      }
    },
    isValidName() {
      if (this.form.admin.first_name.length === 0) {
        return null;
      } else {
        return (
          this.form.admin.first_name.length > 2 &&
          this.omit_special_char(this.form.admin.first_name)
        );
      }
    },
    isValidLastName() {
      if (this.form.admin.last_name.length === 0) {
        return null;
      } else {
        return (
          this.form.admin.last_name.length > 1 &&
          this.omit_special_char(this.form.admin.last_name)
        );
      }
    },
    isValidPhone() {
      if (this.phone.length === 0) {
        return null;
      } else {
        return this.phone.length === 9;
      }
    },
    isValidNameService() {
      if (this.service_form.service.name.length === 0) {
        return null;
      } else {
        return this.service_form.service.name.length > 2;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-step1_itemGroup {
  border-radius: 2%;
}
.input-group {
  position: relative;
  margin: 1rem;
  margin-right: 1rem;
  padding-right: 2rem;
  @media screen and (max-width: 1025px) {
    margin: 0;
    padding-right: 0;
  }
}
.form-floating {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.form-floating-2 {
  position: relative;
  margin: 1rem;
  background: #f5f5f5;
  border: 1px solid #b0b1b1;
  border-radius: 5px;
  padding: 5px 10px;
  input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-size: 1.2rem;
    padding: 0.5rem;
    &::placeholder {
      color: #b0b1b1;
    }
  }
}
.register {
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  align-items: center;
  display: flex;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.register-item {
  display: grid;
  align-items: center;
  min-height: 80vh;
  padding: 15px;
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
  padding: 50px;
  @media screen and (max-width: 1025px) {
    grid-template-columns: 100%;
    row-gap: 20px;
    padding: 0;
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
  .form-step1_form-container {
    padding: 1rem;
    border-radius: 2%;
    border: 1px solid #bbb;
    @media screen and (max-width: 1025px) {
      margin-bottom: 40px;
    }
    .form-step1_form-content {
      background: #fff;
      border-radius: 10px;
      .form-step1_title {
        padding: 20px;
        h1 {
          font-weight: bold;
        }
        h4 {
          color: #a0a0a0;
        }
      }
    }
  }
}
.inputItem {
  position: relative;
  border-top: 1px solid #4d4d4d;
  border: 1px solid #bbb;
  padding: 10px;
  grid-column-gap: 20px;
  column-gap: 20px;
}
.form-step1_TyC {
  padding: 20px;
  a {
    color: #4fd1c5 !important;
  }
}
.btn-steps__item {
  width: 100%;
  height: 50px;
  background: #62c0bc;
  border-radius: 5px;
  color: #fff !important;
  transition: 400ms;
  &:hover {
    background: #50aca7;
  }
}
.usertype {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 5px;
  width: fit-content;
}
.activities {
  border-radius: 0 80px 0 80px;
  filter: grayscale(100%);
  background: #aedad8;
  height: 500px;
  padding: 40px;
  align-items: center;
  border: 1px solid #d5dfde;
  justify-self: end;
  max-width: 70%;
  margin-right: 20px;
  cursor: pointer;
}
.activities:hover {
  filter: grayscale(0%);
}
.alojamientos {
  border-radius: 80px 0px 80px 0;
  filter: grayscale(100%);
  background: #aedad8;
  height: 500px;
  padding: 40px;
  align-items: center;
  border: 1px solid #d5dfde;
  justify-self: start;
  max-width: 70%;
  margin-right: 20px;
  cursor: pointer;
}
.alojamientos:hover {
  filter: grayscale(0%);
}
.form-step3 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 48%);
  margin: 20px;
}
.options {
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 100px;
  margin-bottom: 500px;
}
.title {
  font-size: 40px;
  font-weight: 700;
  text-align: center;
}
.select-servicio_bg {
  display: flex;
  align-items: center;
  position: absolute;
  display: block;
  height: 400px;
  width: 100%;
  left: 0;
  background: #aedad8;
  z-index: -1;
}
.select-servicio_item {
  display: grid;
  grid-template-columns: 44% 54%;
  align-items: center;
  justify-content: space-between;
}
.select-servicio_item_form {
  display: grid;
  row-gap: 10px;
  label {
    font-size: 40px;
    @media screen and (max-width: 1025px) {
      font-size: 30px;
    }
  }
}
.empresa {
  display: none;
}
.persona {
  display: block;
}

input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
