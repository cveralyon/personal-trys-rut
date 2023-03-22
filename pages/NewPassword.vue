<template>
  <client-only>
  <div class="center">
    <nuxt-link to="/">
      <img src="~/assets/images/icon-rutero.webp" alt="rutero-icon" class="auth-logo" />
    </nuxt-link>

    <div style="text-align: center;max-width: 15rem;">
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
      <div>
        <button @click="reserPassword()" class="auth-btn">Guardar</button>
      </div>
    </div>
  </div>
</client-only>
</template>

<script>
export default {
  layout: "login",
    head() {
    return {
      title: "Rutero |  Recuperar contraseña",
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
      form: {
        password: "",
        passwordConfirm: "",
        token: "",
      },
      recPass: false,
    };
  },
  computed: {
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
  },
  methods: {
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
            this.$router.push("/admin");
        } else {
          this.$router.push("/");
      }
      } catch (err) {
        alert("Ha ocurrido un error");
      }
    },
    async reserPassword(){
      if(this.$route.query.token != undefined){
        this.form.token = this.$route.query.token;
        try {
        let response = await this.$axios.$post("/api/v1/users/reset_password", {password:this.form.password, token:this.form.token})
        .then((response) => {
          alert("Tu contraseña ha sido cambiada con éxito");
          this.$router.push("/login");
        })
        } catch (err) {
          alert("Ha ocurrido un error, no pudimos cambiar tu contraseña");
        }
      }else{
        alert("Ha ocurrido un error, no pudimos cambiar tu contraseña");
      }      
    }
  },
};
</script>

<style lang="scss" scoped>
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
.form-floating {
  position: relative;
  margin-bottom: 1rem;
  min-width: 15rem;

}
</style>

