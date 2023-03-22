<template>
  <client-only>
    <div class="edit">
      <h2>Editar Datos</h2>
      <b-form class="form" @submit.prevent="updateuser">
        <div class="form-floating">
          <b-form-input
            :state="isValidName"
            type="text"
            class="form-control"
            id="name"
            placeholder="Nombre"
            v-model="user.first_name"
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
            :state="isValidName"
            type="text"
            class="form-control"
            id="lastname"
            placeholder="Apellido"
            v-model="user.last_name"
            required
            minlength="2"
            style="margin-bottom: 1rem"
          />
          <b-form-invalid-feedback>
            El nombre debe tener al menos 2 caracteres y no debe contener
            caracteres especiales.
          </b-form-invalid-feedback>
          <label for="nombre">Apellido</label>
        </div>
        <div class="form-floating">
          <b-form-input
            :state="isValidEmail"
            type="email"
            class="form-control"
            id="email"
            placeholder="Email"
            v-model="user.email"
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
            v-model="user.phone"
            required
          />
          <b-form-invalid-feedback>
            El número de teléfono debe tener 9 dígitos.
          </b-form-invalid-feedback>
        </div>
        <button type="submit" class="boton">Guardar</button>
      </b-form>
    </div>
  </client-only>
</template>

<script>

import axios from "axios";
export default {
  data() {
    return {
      user: {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      },
      meta: [
				{
					hid: "description",
					name: "description",
					content: "Únete a una comunidad de viajeros y aventuras en Rutero. Créate una cuenta gratis y rápido con tu dirección de correo electrónico.",
				},
				{
          hid: "og:url",
          property: "og:url",
          content: "https://www.rutero.cl/User/Profile/edit",
        },
			],
      link: [
        {
          rel: 'canonical',
          href: 'https://www.rutero.cl/User/Profile/edit'
        }
      ],
    };
  },
  methods: {
    async updateuser() {
      const form = {};
      form.first_name = this.user.first_name;
      form.last_name = this.user.last_name;
      form.email = this.user.email;
      form.phone = "56" + this.user.phone;
      const response = await axios.patch(
          `https://rutero-backend.herokuapp.com/api/v1/users/${this.user.id}`,
          { first_name: this.user.first_name,
            last_name: this.user.last_name,
            email: this.user.email,
            phone: "56" + this.user.phone,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$auth.strategy.token.get()}`
            }
          })
        .then((response) => {
          this.$auth.user.first_name = this.user.first_name,
          this.$auth.user.last_name = this.user.last_name,
          this.$auth.user.email = this.user.email,
          this.$auth.user.phone = "56" + this.user.phone,
          alert("Datos editados con éxito");
          this.$router.push(`/User/Profile/`);
        })
        .catch((error) => {
          if (error.response.data.status === 500) {
            alert("No se pudo hacer el cambio");
          } else {
            alert(error.response.data.message);
          }
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
    async getUser() {
            if (!this.$auth.loggedIn) {
                this.$router.push("/login");
            } 
            else{
                const response = await this.$axios.get(
                    `https://rutero-backend.herokuapp.com/api/v1/users/${this.$auth.user.id}`
                );
                this.user = response.data.data.user;
                this.user.phone = this.user.phone.substring(2);
            }
        },
  },
  created() {
    this.getUser();
  },
  computed: {
    isValidPhone() {
      if (this.user.phone.length === 0) {
        return null;
      } else {
        return (
          this.user.phone.length === 9 && /^[0-9]+$/.test(this.user.phone)
        );
      }
    },
    isValidEmail() {
      if (this.user.email.length > 0) {
        return (
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            this.user.email
          ) && this.omit_special_char(this.user.email)
        );
      }
    },
    isValidName() {
      if (this.user.first_name.length === 0) {
        return null;
      } else {
        return (
          this.user.first_name.length > 2 &&
          this.omit_special_char(this.user.first_name)
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
