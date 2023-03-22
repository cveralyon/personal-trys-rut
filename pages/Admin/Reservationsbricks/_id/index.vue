<template>
  <div class="image">
    <img
      v-if="accepted"
      src="https://rutero-prod.s3.sa-east-1.amazonaws.com/img/reservation1.jpg"
      alt="MercadoPago"
    />
    <img
      v-else-if="!accepted"
      src="https://rutero-prod.s3.sa-east-1.amazonaws.com/img/reservation2.jpg"
      alt="MercadoPago"
    />
  </div>
</template>



<script>
export default {
  head() {
    return {
      title: "Rutero | Reservas",
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
      reserve: {},
      accepted: null,
      auth: "",
    };
  },
  async asyncData({ params }) {
    return { id: params.id };
  },
  methods: {
    async update_payment() {
      if (this.accepted) {
        this.reserve.status_reservation = 2;
      } else {
        this.reserve.status_reservation = 3;
      }
      await this.$axios
        .$patch(`/api/v1/reservations/execute_payment_bricks/${this.id}`, {
          reservation: this.reserve,
          reservation_token: this.$route.query.auth,
        })
        .then((response) => {
        })
        .catch((error) => {
          alert("Error al realizar la reservacion");
        });
    },
  },
  created() {
    if (
      (this.$route.query.accepted != null ||
        this.$route.query.accepted != undefined) &&
      (this.$route.query.auth != null || this.$route.query.auth != undefined)
    ) {
      if (this.$route.query.accepted == "false") {
        this.accepted = false;
      } else if (this.$route.query.accepted == "true") {
        this.accepted = true;
      }
    }
  },
  mounted() {
    this.update_payment();
  },
};
</script>

<style lang="scss">
.image {
  height: 100vh;
  width: 80vh;
  margin-bottom: 40%;
  margin-left: auto;
  margin-right: auto;
  padding: auto;
  @media screen and (max-width: 1025px) {
    height: 100vh;
    width: 60vh;
    margin-bottom: 50%;
  }
}
</style>
