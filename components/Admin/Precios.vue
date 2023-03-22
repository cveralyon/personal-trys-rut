<template>
	<div>
    <div class="infoTab">
			<button class="Servicios" id="Servicios" @click="openServicio()">
				<h4 class="info_3"> SERVICIO </h4>
      </button>
			<button class="Precios active" id="Precios" @click="openPrice()">
				<h4 class="info_3"> PRECIOS </h4>
			</button>
			<div class="form-container">
				<div class="introcontainer">
					<div class="imagecontent Productos">
						<img src="https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/admin/Productos.png" class="edit-illustrations">
					</div>
					<div class="productos-text">
					<h3>Aqui pondrás las </h3><h3 style="color: #33aca6; font-weight:1000;">tarifas de cada "producto"</h3><h3> que ofrece el servicio!</h3>
            <button class="button_ejemplos"> 
              <h6 class="info_4"> EJEMPLOS </h6> 
            </button>
          </div>
          <div class="addNewProduct">
            <button class="product-btn">
              <h6> AGREGAR OTRO PRODUCTO </h6>
            </button>
          </div>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
export default {
	props: ["id"],
	data() {
    return {
      service: {},
      };
  },
  async asyncData({ params }) {
    return { id: params.id };
  },
  methods: {
    async getService() {
      const response = await this.$axios.$get(`/api/v1/services/${this.id}`);
      this.service = response.data.service;
    },
		openServicio() {
			document.getElementsByClassName("Servicios")[0].classList.add("active");
			document.getElementsByClassName("Precios")[0].classList.remove("active");
      document.getElementsByClassName("infotab")[0].style.display = "block";
      document.getElementsByClassName("infotab")[1].style.display = "none";
		},
		openPrice() {
			document.getElementsByClassName("Precios")[0].classList.add("active");
			document.getElementsByClassName("Servicios")[0].classList.remove("active");
      document.getElementsByClassName("infotab")[1].style.display = "block";
      document.getElementsByClassName("infotab")[0].style.display = "none";
		},
	},
	mounted() {
		this.getService();
	},
}
</script>

<style>
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
.introcontainer {
  display: grid;
  grid-template-rows: 50% 50%;
  margin-bottom: 1%;
}
.imagecontent {
  display: block;
  padding-left: 10%;
  padding-right: 10%;
}
.Productos {
  display: block;
  grid-row: 1 / 2;
  border-top: none;
  background-color: white;
  height: 50%;
  @media (min-width: 66em) {
    grid-column: 1 / 2;
  }
}
.edit-illustrations {
	display: block;
	max-width: 100%;
	@media (min-width: 66em) {
		max-width: 95%;
	}
}
.productos-text {
  grid-row: 2 / 3;
  padding-left: 10%;
  padding-right: 10%;
  font-weight: bold;
  font-size: 4vh;
  @media (min-width: 66em) {
    font-size: 5vh;
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    padding-top: 15%;
  }
}

.button_ejemplos {
  margin: 3%;
  border: 1px solid black;
  background-color: white;
  color: black;
  font-size: 16px;
  width: 100%;
  height: 20%;
  border-radius: 10%;
  @media (min-width: 66em) {
    height: 40%;
  }
}
.info_4 {
  grid-column: 2 / 2;
  font-weight: bold;
  font-size: 2vh;
  @media (min-width: 66em) {
    font-size: 3vh;
  }
}
.product-btn {
  background-color: #d1d1d1;
  border-color: white;
  width: 60%;
  height: 70%;
  border-radius: 2%;
  font-size: 16px;
  margin-top: 2%;
  @media (min-width: 66em) {
    margin-top: 20%;
    height: 20%;
  }
}
.product-btn:hover {
    background-color: #33aca6;
    color: white;
}
.addNewProduct {
  margin-bottom: 2%;
  margin-top: 5%;
}
</style>