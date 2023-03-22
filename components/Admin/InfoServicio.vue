<template>
  <div>
    <div class="infoTab">
      <button class="Servicios active" id="Servicios" @click="openServicio()">
        <h4 class="info_3"> SERVICIO </h4>
      </button>
      <button class="Precios" id="Precios" @click="openPrice()">
        <h4 class="info_3"> PRECIOS </h4>
      </button>
      <div class="form-container">
        <!-- <Form :id = this.id />  -->
      </div>
    </div>
  </div>
</template>

<script>
import Form from '~/components/Admin/Form/Form.vue'
export default {
  props: ['id'],
  components: {
    Form
  },
  data () {
    return {
      service: {}
    }
  },
  async asyncData ({ params }) {
    return { id: params.id }
  },
  methods: {
    async getService () {
      const response = await this.$axios.$get(`/api/v1/services/${this.id}`)
      this.service = response.data.service
    },
    openServicio () {
      document.getElementsByClassName('Servicios')[0].classList.add('active')
      document.getElementsByClassName('Precios')[0].classList.remove('active')
      document.getElementsByClassName('infotab')[0].classList.add('active')
      document.getElementsByClassName('infotab')[1].classList.remove('active')
      document.getElementsByClassName('infotab')[0].style.display = 'block'
      document.getElementsByClassName('infotab')[1].style.display = 'none'
    },
    openPrice () {
      document.getElementsByClassName('Precios')[0].classList.add('active')
      document.getElementsByClassName('Servicios')[0].classList.remove('active')
      document.getElementsByClassName('infotab')[1].classList.add('active')
      document.getElementsByClassName('infotab')[0].classList.remove('active')
      document.getElementsByClassName('infotab')[1].style.display = 'block'
      document.getElementsByClassName('infotab')[0].style.display = 'none'
    }
  },
  mounted () {
    this.getService()
  }
}
</script>

<style  scoped>
.infoTab {
  display: grid;
  height: 80vh;
  grid-template-columns: 50% 50%;
  grid-template-rows: 10% 90%;
}
.Servicios {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: block;
  border-top: none;
  background-color: white;
  border-top-right-radius: 10%;
  border-bottom-left-radius: 10%;
  height: 90%;
  width: 91%;
  margin-top: 4%;
  margin-left: 6%;
}
.Servicios:hover {
  background-color: #33aca6;
  color: white;
}
.Servicios.active {
  background-color: #33aca6;
  color: white;
}
.Precios {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: block;
  border-top: none;
  background-color: white;
  border-bottom-right-radius: 10%;
  border-top-left-radius: 10%;
  height: 90%;
  width: 91%;
  margin-top: 4%;
  margin-left: 3%;
  color: black;
}
.Precios:hover {
  background-color: #33aca6;
  color: white;
}
.Precios.active {
  background-color: #33aca6;
  color: white;
}
.info_3 {
  grid-column: 2 / 2;
  font-weight: bold;
  font-size: 4vh;
  @media (min-width: 66em) {
    font-size: 5vh;
  }
}
.form-container {
  overflow: scroll;
  margin: 4%;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  width: 92%;
  height: 91%;
  display: block;
  background-color: white;
  padding-right: 3%;
  padding-left: 5%;
  @media (min-width: 66em) {
    margin: 3%;
    height: 95%;
    padding-left: 2%;
    display: inline-block;
    grid-row: 2 / 2;
  }
}
</style>
