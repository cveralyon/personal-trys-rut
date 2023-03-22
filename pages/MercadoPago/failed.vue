<template>
    <div>
        <div class="background">
            <div class="image">
                <img src="~/assets/images/MP/mercadopago.webp" alt="MercadoPago">
            </div>
        </div>
        <div class="background_2">
            <h2 class= "message">No se ha conectado tu cuenta con MercadoPago!</h2>
        </div>
    </div>
</template>

<script>
export default {
    head() {
		return {
			title: "Rutero |  MercadoPago",
			meta: [
			{
				hid: "",
				name: "",
				content: "",
			},
			],
		};
	},
}
</script>

 <style scoped>

.background {
    background-color: red;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 50vh;
    width: 100vw;
}
.background_2 {
    background-color: white;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 50vh;
    width: 100vw;
}
.image {
    padding: 20%;
    height: 80%;
    width: 80%;
    margin: auto;
}
.message {
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    margin-top: 10%;
    @media screen and (max-width: 1025px) {
    margin-top: 10%;
    }
}
</style>