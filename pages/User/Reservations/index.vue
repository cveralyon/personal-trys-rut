<template>
    <div v-if="$auth.loggedIn" class="maincont">
        <div class="bg-gray-100 rounded-md cont2 ">
            <h2 class="bienvenida"><span style="color:#33aca6;">¡Hola {{ $auth.user.name }}!</span> ✌  Aquí podras ver tus reservas:</h2>
            <div class="border-t border-gray-300 mt-2 pt-2 flex"></div>

            <div v-if="reservas_proximas.length > 0">
                <ul class="grid-Reserve">
                    <li
                        v-for="reserva in reservas_proximas"
                        :key="`service-${reserva.id}`"
                        :ref="`service-${reserva.id}`"
                        class="item">
                        <cardShow :reserva="reserva" />   
                    </li>
                </ul>
            </div>
            <div v-else>
                <h5>No tienes reservas proximas 🙁 </h5> 
                <h6>Recuerda, si no vives tus sueños hoy, quizás nunca lo hagas.</h6>
            </div>
        </div>
        <div style="padding-inline: 2rem;padding-bottom: 0rem;" class="bg-gray-100 rounded-md">
            <h1 style="padding-top: 1rem;padding-bottom: 2rem;"> Reservas anteriores:</h1>
            <div class="border-t border-gray-300 mt-2 pt-2 flex"></div>

            <div v-if="reservas_pasadas.length > 0">
                <ul class="grid-Reserve">
                    <li
                        v-for="reserva in reservas_pasadas"
                        :key="`service2-${reserva.id}`"
                        :ref="`service2-${reserva.id}`"
                        class="item">
                        <listCardReserves :reserva="reserva" />   
                    </li>
                </ul>
            </div>
            <div class="bg-gray-100 p-4 rounded-md" v-else>
                <h5>No tienes reservas pasadas 🙁 </h5> 
                <h6>Busca tu proxima aventura con Rutero!</h6>
            </div>
        </div>
    </div>
</template>

<script>
import listCardReserves from '~/components/Reservation/Summary/listCardReserves.vue';
import cardShow from '~/components/Reservation/Summary/cardShow.vue';
export default {
    layout: "default",
    components: {
        cardShow,
        listCardReserves,
    },
    data() {
        return {
            reservas_pasadas: {},
            reservas_proximas: {},

        };
    },
    head() {
        return {
            title: "Mis Reservas",
            meta: [
				{
					hid: "description",
					name: "description",
					content: "Únete a una comunidad de viajeros y aventuras en Rutero. Créate una cuenta gratis y rápido con tu dirección de correo electrónico.",
				},
				{
                    hid: "og:url",
                    property: "og:url",
                    content: "https://www.rutero.cl/User/Reservations",
                },
			],
            link: [
                {
                rel: 'canonical',
                href: 'https://www.rutero.cl/User/Reservations'
                }
            ],
        };
    },
    methods: {
        async getReservations() {
            if (!this.$auth.loggedIn) {
                this.$router.push("/login");
            } else {
                const response = await this.$axios.$get(`/api/v1/reservations/user_active_reserves/${this.$auth.user.id}`);
                this.reservas_proximas = response;
                try {
                    this.reservas_proximas.length
                } catch (error) {
                    this.reservas_proximas = {}
                }
                const { data } = await this.$axios.get("/api/v1/reservations/user_reserves/" + this.$auth.user.id);
                this.reservas_pasadas = data;
                try {
                    this.reservas_pasadas.length
                } catch (error) {
                    this.reservas_pasadas = {}
                }
            }
        },
    },
    created() {
        this.getReservations();
    },
};
</script>

<style scoped>
.cont2{
    margin-bottom:2rem;
    padding-inline: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    @media screen and (max-width: 600px) {
        padding-inline: 1rem;
    }
}

ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
.grid-Reserve {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
    margin-top: 1rem;
    padding-bottom: 2rem;
    @media screen and (max-width: 768px) {
        grid-gap: 2rem;

    }
}
.maincont {
    background-color:transparent; 
    padding: 5vh 12vw;
    width: 100%;

    @media screen and (max-width: 768px) {
        padding: 5vh 5vw;
    }
}
.bienvenida {
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    @media screen and (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 1.3rem;
        margin-inline: 2vw;


    }
}

a {
    text-decoration: none !important;
    color: inherit !important;
}
a:hover {
    color: inherit !important   ;
}

</style>
