<template>
  <div v-if="$auth.loggedIn && $auth.user.type=='admin'" class="main">
		<div class='tabs' style="display:none;" >
			<div class="panelButton">
				<button class="tablinks panel" @click="openPanel()">
					<img src="https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/admin/Panel Blanco.png" class="active-img"/>
					<p class="name">Panel</p>
				</button>
			</div>
			<div class="reservationButton">
				<button class="tablinks" @click="openReservas()">
					<img src="https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/admin/Reservas Blanco.png" class="active-img"/>
					<p class="name">Reservas</p>  
				</button>
			</div>
			<div class="profileButton">
				<button class="tablinks active" @click="openPerfil()">
					<img src="https://rutero-prod.s3.sa-east-1.amazonaws.com/icons/admin/Perfil Blanco.png" class="active-img"/>
					<p class="name">Perfil</p>
				</button>
			</div>
			<div id="Panel" class="tabcontent">
				<h2 class="out">Próximamente</h2>
			</div>
			<div id="Reservas" class="tabcontent">
				<h2 class="out">Próximamente</h2>
			</div>
			<div id="Perfil" class="tabcontent profile">
				<Perfil :id= "this.id" />
			</div>
		</div>
    <div class="form-container">
      <Form :id = "this.id" :service="this.service"/> 
    </div>
	</div>
</template>

<script>

import Perfil from "~/components/Admin/Perfil.vue";
import Form from "~/components/Admin/Form/Form.vue";

export default {
	layout: "admin",
  head() {
    return {
      title: "Admin | " + this.service.name,
      meta: [
        {
          hid: "",
          name: this.service.name,
          content: this.service.description,
        },
      ],
    };
  },
  components: {
		Perfil,
    Form,
  },
  data() {
    return {
      id: "",
      service: {},
      };
  },
  async asyncData({ params }) {
    const response = await fetch(
      `https://rutero-backend.herokuapp.com/api/v1/services/${params.id}`
    ).then((res) => res.json());
    return {
      service: response.data.service,
      id: params.id,
    };
  },
  methods: {
		openPanel() {
			document.getElementById("Panel").style.display = "block";
			document.getElementById("Reservas").style.display = "none";
			document.getElementById("Perfil").style.display = "none";
			document.getElementsByClassName("tablinks")[0].classList.add("active");
			document.getElementsByClassName("tablinks")[1].classList.remove("active");
			document.getElementsByClassName("tablinks")[2].classList.remove("active");
		},
		openReservas() {
			document.getElementById("Panel").style.display = "none";
			document.getElementById("Reservas").style.display = "block";
			document.getElementById("Perfil").style.display = "none";
			document.getElementsByClassName("tablinks")[0].classList.remove("active");
			document.getElementsByClassName("tablinks")[1].classList.add("active");
			document.getElementsByClassName("tablinks")[2].classList.remove("active");
		},
		openPerfil() {
			document.getElementById("Panel").style.display = "none";
			document.getElementById("Reservas").style.display = "none";
			document.getElementById("Perfil").style.display = "block";
			document.getElementsByClassName("tablinks")[0].classList.remove("active");
			document.getElementsByClassName("tablinks")[1].classList.remove("active");
			document.getElementsByClassName("tablinks")[2].classList.add("active");
		},
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: grid;
  grid-template-columns: 33% 33% 34%;
  grid-template-rows: 90% 10%;
  height: 90vh;
  @media (min-width: 66em) {
    display: grid;
    height: 90vh;
    grid-template-columns: 10% 90%;
    grid-template-rows: 33% 33% 34%;
  }
}
.panelButton {
  display: inline-block;
  grid-row: 2 / 2;
  grid-column: 1 / 1;
  @media (min-width: 66em) {
    display: inline-block;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
    background-color: white;
  }
}
.reservationButton {
  display: inline-block;
  grid-row: 2 / 2;
  grid-column: 2 / 2;
  @media (min-width: 66em) {
    display: block;
    grid-row: 2 / 2;
    grid-column: 1 / 1;
    background-color: white;
  }
}
.profileButton {
  display: block;
  grid-row: 2 / 2;
  grid-column: 3 / 3;
  @media (min-width: 66em) {
    display: block;
    grid-row: 3 / 3;
    grid-column: 1 / 1;
    background-color: white;
  }
}
.tablinks:hover {
  background-color: rgb(149, 147, 147);
}
.tablinks.active {
  background-color: #33aca6;
  color: white;
}
.active-img {
	color: white;
	display: inline-block;
}
.tablinks {
  height: 220%;
  width: 100%;
  border: none;
	background-color: #ddd;
  @media (min-width: 66em) {
    height: 100%;
  }
}
.tablinks_2 {
  height: 220%;
  width: 100%;
  border: none;
	background-color: #ddd;
  @media (min-width: 66em) {
    height: 100%;
  }
}
.tabcontent {
  grid-column: 1 / 4;
  grid-row: 1 / 1;
  display: none;
  margin: 1%;
	text-align: center;
  @media (min-width: 66em) {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
    display: none;
    border-top: none;
    margin: 0%;
  }
}
.tabcontent.profile {
  display: block;
}
.out {
  font-size: 1.5rem;
  margin-top: 20%;
  @media (min-width: 66em) {
    font-size: 2rem;
  }
}
.panel {
  margin-top: 0%;
  @media (min-width: 66em) {
    margin-top: 15%;
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
