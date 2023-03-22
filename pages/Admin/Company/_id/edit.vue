<template>
  <client-only>
    <div class="edit">
      <h2>Editar Compañia</h2>
      <b-form class="form" @submit.prevent="updateCompany">
        <div class="form-floating">
          <b-form-input
            :state="isValidName"
            type="text"
            class="form-control"
            id="name"
            placeholder="Nombre"
            v-model="company.name"
            required
            minlength="3"
            style="margin-bottom: 1rem"
          />
          <b-form-invalid-feedback>
            El nombre debe tener al menos 3 caracteres y no debe contener
            caracteres especiales.
          </b-form-invalid-feedback>
          <label for="nombre">Nombre</label>
        </div>
        <div class="form-floating">
          <b-form-input
            :state="isValidEmail"
            type="email"
            class="form-control"
            id="email"
            placeholder="Email"
            v-model="company.email"
            style="margin-bottom: 1rem"
            required
          />
          <b-form-invalid-feedback>
            El email es inválido.
          </b-form-invalid-feedback>
          <label for="email">Correo</label>
        </div>
        <div class="input-group" style="margin-bottom: 10px">
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
            v-model="company.phone"
            required
          />
          <b-form-invalid-feedback>
            El número de teléfono debe tener 9 dígitos.
          </b-form-invalid-feedback>
        </div>
        <div class="form-floating">
          <b-form-input
            :state="isValidRut"
            type="text"
            class="form-control"
            id="rut"
            placeholder="Rut"
            v-model="rut"
            required
            style="margin-bottom: 1rem"
          />
          <b-form-invalid-feedback>
            El rut es inválido.
          </b-form-invalid-feedback>
          <label for="rut">Rut</label>
        </div>
        <button type="submit" class="boton">Guardar</button>
      </b-form>
    </div>
  </client-only>
</template>

<script>

import axios from "axios";
import { validate, clean, format, getCheckDigit } from "rut.js";
export default {
  data() {
    return {
      company: {
        name: "",
        email: "",
        phone: "",
      },
      rut: "",
      token: "",
    };
  },
  async asyncData({ params }) {
    const response = await axios.get(
      `https://rutero-backend.herokuapp.com/api/v1/companies/${params.id}`
    );
    if (!response.data.data.company.phone) {
      response.data.data.company.phone = " ";
    } else {
      response.data.data.company.phone =
        response.data.data.company.phone.slice(2);
    }
    return {
      company: response.data.data.company,
      rut: response.data.data.company.rut,
    };
  },
  methods: {
    getToken() {
      this.token =this.$route.query.token
    },
    async checkClickLinkUpdateData() {
      const form = {};
      form.valid_contact = 1;
      const response = await axios
        .patch(
          `https://rutero-backend.herokuapp.com/api/v1/companies/${this.company.id}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        });
    },
    async updateCompany() {
      const form = {};
      form.name = this.company.name;
      form.email = this.company.email;
      form.phone = "56" + this.company.phone;
      form.rut = this.rut;
      form.status = this.company.status;
      form.id = this.company.id;
      const response = await axios
        .patch(
          `https://rutero-backend-staging.herokuapp.com/api/v1/companies/${this.company.id}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          alert("Compañia editada con éxito");
          this.$router.push(`/admin/company/${this.$route.params.id}`);
        })
        .catch((error) => {
          if (error.response.data.status === 500) {
            alert("No se pudo editar la compañia");
          } else {
            alert(error.response.data.message);
          }
          console.log(error);
        });
    },
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
  },
  mounted() {
    this.checkClickLinkUpdateData();
  },
  beforeMount() {
    this.getToken();
  },
  watch: {
    rut(rut) {
      if (rut.length > 2) {
        this.rut = format(rut);
      }
    },
  },
  computed: {
    isValidPhone() {
      if (this.company.phone.length === 0) {
        return null;
      } else {
        return (
          this.company.phone.length === 9 && /^[0-9]+$/.test(this.company.phone)
        );
      }
    },
    isValidEmail() {
      if (this.company.email.length > 0) {
        return (
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            this.company.email
          ) && this.omit_special_char(this.company.email)
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
    isValidName() {
      if (this.company.name.length === 0) {
        return null;
      } else {
        return (
          this.company.name.length > 2 &&
          this.omit_special_char(this.company.name)
        );
      }
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5vh;
  border: 1px solid;
  padding: 3rem;
  border-radius: 25px;
  background-color: #dedede;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;
}
.edit {
  padding: 30px 7.5vw;
}
.boton {
  align-self: center;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #000;
  background-color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  width: 10vw;
  min-width: 150px;
}
.boton:hover {
  background-color: #33aca6;
  color: #fff;
}
</style>
