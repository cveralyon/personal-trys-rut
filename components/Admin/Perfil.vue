<template>
  <div v-if="$auth.loggedIn" class="background">
    <div id="Perfil_2" class="edit-tabs">
      <button class="infocontent" @click="openInfoTab()">
        <div class="imagecontent">
          <img src="https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/admin/Info.png" class="edit-illustrations" />
        </div>
        <p class="edit-option-label">INFORMACIÓN DEL SERVICIO</p>
      </button>
      <button class="pricecontent" @click="openPriceTab()">
        <p class="edit-option-label">PRECIOS</p>
        <div class="imagecontent">
          <img src="https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/admin/Precios.png" class="edit-illustrations" />
        </div>
      </button>
      <div class="lower-button-container">
        <button class="buttons_1" @click="openVistaPrevia()">
          <img src="https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/admin/Vista Previa.png" class="icon-img" />
          <h4 class="info_2 "> VISTA PREVIA </h4>
        </button>
        <button class="buttons_2">
          <img src="https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/admin/Guardar.png" class="icon-img" />
          <h4 class="info_2"> GUARDAR </h4>
        </button>
      </div>
    </div>
    <div class="infotab" id = "Info">
      <InfoServicio :id= this.id />
    </div>
    <div class="infotab" id = "Precios">
      <Precios :id= this.id />
    </div>
    <div class="infotab" id = "VistaPrevia">
      <VistaPrevia :id= this.id />
    </div>
  </div>
</template>

<script>
import InfoServicio from '~/components/Admin/InfoServicio.vue'
import Precios from '~/components/Admin/Precios.vue'
import VistaPrevia from '~/components/Admin/VistaPrevia.vue'

export default {
  props: ['id'],
  components: {
    InfoServicio,
    Precios,
    VistaPrevia
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
    openInfoTab () {
      document.getElementsByClassName('infotab')[0].classList.add('active')
      document.getElementsByClassName('infotab')[1].classList.remove('active')
      document.getElementsByClassName('infotab')[0].style.display = 'block'
      document.getElementsByClassName('infotab')[1].style.display = 'none'
      document.getElementById('Perfil_2').style.display = 'none'
    },
    openPriceTab () {
      document.getElementsByClassName('infotab')[0].classList.remove('active')
      document.getElementsByClassName('infotab')[1].classList.add('active')
      document.getElementsByClassName('infotab')[0].style.display = 'none'
      document.getElementsByClassName('infotab')[1].style.display = 'block'
      document.getElementById('Perfil_2').style.display = 'none'
    },
    openVistaPrevia () {
      document.getElementsByClassName('infotab')[2].style.display = 'block'
      document.getElementById('Perfil_2').style.display = 'none'
    }
  },
  mounted () {
    this.getService()
  }
}
</script>

<style lang="postcss" scoped>
.background {
  width: 90%;
  height: 95%;
  display: inline-block;
  background-color: #999999;
  border-radius: 2%;
  margin-top: 10%;
  @media (min-width: 66em) {
    height: 85vh;
    margin-top: 2%;
    display: inline-block;
    background-color: #999999;
  }
  @media (min-width: 26em) and(max-width: 66em) {
    height: 80vh;
    width: 98%;
  }
}
.edit-tabs {
  display: grid;
  height: 80vh;
  grid-template-columns: 50% 50%;
  grid-template-rows: 45% 45% 10%;
  align-items: center;
  @media (min-width: 66em) {
    grid-template-rows: 90% 10%;
  }
  .edit-illustrations {
    display: block;
    max-width: 74%;
    @media (min-width: 26em) and(max-width: 66em) {
      max-width: 52%;
      margin-left: 21%;
    }
    @media (min-width: 66em) {
      max-width: 95%;
    }
  }
  .edit-option-label {
    font-size: 2.5vh;
    font-weight: bold;
    margin-bottom: 5%;
  }
}
.infocontent {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  height: 90%;
  width: 90%;
  display: block;
  margin-top: 5%;
  margin-left: 5%;
  border-top: none;
  background-color: white;
  border-bottom-left-radius: 15%;
  border-top-right-radius: 15%;
  align-content: center;
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  @media (min-width: 66em) {
    grid-column: 1 / 2;
    margin-top: 0%;
  }
}
.infocontent:hover {
  background-color: #33aca6;
  color: white;
}
.pricecontent {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  height: 90%;
  width: 90%;
  display: block;
  margin-top: 0%;
  margin-left: 5%;
  border-top: none;
  background-color: white;
  border-bottom-right-radius: 15%;
  border-top-left-radius: 15%;
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  @media (min-width: 66em) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
}
.pricecontent:hover {
  background-color: #33aca6;
  color: white;
}
.imagecontent {
  display: block;
  padding-left: 10%;
  padding-right: 10%;
}

.lower-button-container {
  display: inline-block;
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  width: 100%;
  height: 100%;
  margin-top: 1%;
  margin-left: 4%;
  @media (min-width: 66em) {
    grid-row: 2 / 3;
    margin-left: 15%;
  }
}

.buttons_1 {
  display: inline-flex;
  width: 35%;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  border-top: none;
  background-color: rgb(211, 211, 211);
  padding-left: 2%;
  padding-right: 2%;
  @media (min-width: 66em) {
    width: 30%;
    &:hover {
      background-color: #33aca6;
    }
  }
}
.buttons_2 {
  display: inline-flex;
  width: 35%;
  border-top: none;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  padding-left: 2%;
  margin-left: 2%;
  background-color: rgb(211, 211, 211);
  @media (min-width: 66em) {
    width: 30%;
    &:hover {
      background-color: #33aca6;
    }
  }
}
.info_2 {
  padding-top: 5%;
  grid-column: 2 / 2;
  font-weight: bold;
  font-size: 2vh;
  margin-left: 13%;
  color: white;
  @media (min-width: 66em) {
    font-size: 3vh;
  }
}

.icon-img {
  float: left;
  grid-column: 1 / 1;
  max-width: 20%;
  max-height: 20%;
}

.infotab {
  display: none;
  text-align: center;
}
</style>
