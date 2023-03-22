<template>
    <div v-if="$auth.loggedIn" class="maincont">
        <div class="bg-gray-100 rounded-md cont2">
            <h2 class="bienvenida"><span style="color:#33aca6;">¡Hola amigos de {{ $auth.user.company_name }}!</span> ✌  Aquí se visualizan las reservas Próximas:</h2>
            <div class="border-t border-gray-300 mt-2 pt-2 flex"></div>
            <div v-if="reservas_proximas.length > 0">
                <ul class="grid-Reserve">
                    <li
                        v-for="reserva in reservas_proximas"
                        :key="`service-${reserva.id}`"
                        :ref="`service-${reserva.id}`"
                        class="item">
                        <cardShowCompany :reserva="reserva"/>   
                    </li>
                </ul>
            </div>
            <div v-else>
                <h5>No tienes reservas Próximas</h5> 
                <h6>Te avisaremos cuando alguien reserve!</h6>
            </div>
        </div>
    </div>
</template>

<script>
import cardShowCompany from '~/components/Admin/cardShowCompany.vue';
export default {
    layout: "default",
    components: {
        cardShowCompany,
    },
    data() {
        return {
            reservas_proximas: {},
        };
    },
    head() {
        return {
            title: "Reservas Próximas",
        };
    },
    methods: {
        async getReservations() {
            if (!this.$auth.loggedIn) {
                this.$router.push("/login");
            } else {
                const { data } = await this.$axios.get("/api/v1/reservations/company_active_reserves/"+ this.$auth.user.company_id);
                this.reservas_proximas = data;
                try {
                    this.reservas_proximas.length
                } catch (error) {
                    this.reservas_proximas = {}
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
    @media screen and (min-width: 600px) {
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
