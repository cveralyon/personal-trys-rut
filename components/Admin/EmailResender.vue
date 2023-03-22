<template>
  <div class="popup" ref="popupRef">
    <div class="popup-content">
      <p>A quien enviar el mensaje?</p>
      <div class="popup-radios">
        <label>
          <input type="radio" v-model="selectedRadio" value="user" />
          Usuario
        </label>
        <label>
          <input type="radio" v-model="selectedRadio" value="admin" />
          Admin
        </label>
        <label>
          <input type="radio" v-model="selectedRadio" value="both" />
          Ambos
        </label>
      </div>
      <div class="popup-buttons">
        <button @click="handleOptionClick('accept')">Aceptada</button>
        <button @click="handleOptionClick('reject')">Rechazada</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRadio: "",
    };
  },
  props: ["rowData"],
  methods: {
    async handleOptionClick(option) {
      await this.$axios
        .$post(
          `/api/v1/reservations/resend_email/${this.rowData.id}`,
          {
            to: this.selectedRadio,
            do: option,
          },
          {
            headers: {
              Authorization: this.$auth.strategy.token.get(),
            },
          }
        )
        .then((response) => {
          alert(response.status);
        })
        .catch((error) => {
          alert(error.status);
        });
    },
  },
  mounted() {
    this.$refs.popupRef.addEventListener("click", (event) => {
      if (!event.target.closest(".popup-content")) {
        this.$emit("close");
      }
    });
  },
};
</script>

<style lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  /* Add animation */
  animation: fadeIn 0.5s ease-in-out;
}

.popup-content {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  /* Add a shadow */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
}

.popup-radios label {
  display: block;
  margin-bottom: 0.5rem;
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
}

.popup-buttons button {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  /* Add some styling to the buttons */
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0069d9;
  }
}
</style>
