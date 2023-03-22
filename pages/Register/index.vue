<template>
	<section>
		<div class="options">
			<a style="display: none;" href="/TerminosyCondiciones">ATRAS</a>
			<h1 class="title">¿De que manera buscas registrarte?</h1>
			<div class="form-step3">
				<div class="tipo-servicio_item tipo-servicio_actividad" @click="goRegister_User()" >
					<label for="tipo-servicio_item tipo-servicio_actividad" class="subtitle">Busco un servicio</label>
					<img src="~/assets/images/activity-v.webp" alt="activity-avatar-rutero" />
				</div>
				<div class="tipo-servicio_item tipo-servicio_alojamiento" @click="goRegister_Company()">
					<label for="tipo-servicio_item tipo-servicio_alojamiento" class="subtitle">Ofrezco un servicio</label>
					<img src="~/assets/images/camping-v.webp" alt="acomodation-avatar-rutero" />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	layout: 'empty',
	head() {
		return {
			title: "Rutero |  Registro",
			meta: [
				{
					hid: "description",
					name: "description",
					content: "Únete a una comunidad de viajeros y aventuras en Rutero. Créate una cuenta gratis y rápido con tu dirección de correo electrónico.",
				},
				{
          hid: "og:url",
          property: "og:url",
          content: "https://www.rutero.cl/register",
        },
			],
			link: [
        {
          rel: 'canonical',
          href: 'https://www.rutero.cl/register'
        }
      ],
		};
	},
	methods: {
		goRegister_Company() {
		window.location.href = "../register/register_company";
		},
		goRegister_User() {
			window.location.href = "../register/register_user";
		},
	}
}
</script>

<style lang="scss" scoped>
.options {
	display: initial;
	align-items: center;
	width: 100%;
	margin-top: 20px;
	margin-left: 50px;
	margin-right: 100px;
	margin-bottom: 500px;
}
.title{
	font-size: 40px;
  	font-weight: 700;
	text-align: center;
	margin-bottom: 5%;
	@media screen and (max-width: 1025px) {
	margin-bottom: 10%;
	}
}
.subtitle {
	font-size: 200%;
	font-weight: 600;
	padding-bottom: 15px;
	text-align: center;
	@media screen and (max-width: 1025px) {
	font-size: 180%;
	padding-bottom: 0;
	}
}
.form-step3 {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 48%);
	justify-content: space-between;
	row-gap: 20px;
	@media screen and (max-width: 1025px) {
		grid-template-columns: 100%;
		row-gap: 20px;
	}

}	
.tipo-servicio_item {
	background: #e4e4e4;
	height: 450px;
	display: grid;
	grid-template-rows: 20% 80%;
	padding: 40px;
	padding-top: 20px;
	align-items: center;
	cursor: pointer;
	transition: 400ms;
	@media screen and (max-width: 1025px) {
	height: 300px;
	padding-top: 40px;
	}
	label {
	font-size: 280%;
	transition: 400ms;
	cursor: pointer;
	@media screen and (max-width: 500px) {
		font-size: 280%;
		}
	}
	input[type='radio'] {
	display: none;
	}
	img {
	transition: 400ms;
	}
}
.tipo-servicio_alojamiento {
	border-radius: 0px 80px 0px 80px;
	filter: grayscale(100%);
	background: #aedad8;
	margin-right: 3%;
	@media screen and (max-width: 1025px) {
	margin-left: 3%;
	filter: grayscale(0);
	}
	&:hover {
	filter: grayscale(0);
	}
	label {
	justify-self: start;
	}
	img {
	justify-self: end;
	width: 70%;
	margin-right: 20px;
	@media screen and (max-width: 1025px) {
		width: 50%;
	}
	}
}
.tipo-servicio_actividad {
	border-radius: 80px 0px 80px 0px;
	filter: grayscale(100%);
	background: #aedad8;
	margin-left: 3%;
	@media screen and (max-width: 1025px) {
		filter: grayscale(0);
		margin-right: 3%;
	}
	&:hover {
	filter: grayscale(0);
	}
	label {
	justify-self: end;
	}
	img {
	justify-self: start;
	width: 60%;
	margin-left: 20px;
	@media screen and (max-width: 1025px) {
		width: 40%;
	}
	}
}
.tipo-servicio_alojamiento:hover > img {
	transform: scale(1.1);
}
.tipo-servicio_alojamiento:hover > label {
	transform: translateX(10px);
}
.tipo-servicio_actividad:hover > img {
	transform: scale(1.1);
}
.tipo-servicio_actividad:hover > label {
	transform: translateX(-10px);
}
</style>
