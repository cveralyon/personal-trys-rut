<template>
    <div v-if="$auth.loggedIn" class="admin">
        <div class="bg-gray-100 rounded-md" style="padding: 2rem;">
            <h1>Mis Datos</h1>
            <button @click="editUser()" class="boton">Editar</button>
            <div class="bg-gray-300 rounded-md titleadmin">
                <h3>Nombre: &nbsp; {{ $auth.user.first_name }}</h3>
                <h3>Apellido: &nbsp; {{ $auth.user.last_name }}</h3>
                <h3>Correo: &nbsp; {{ $auth.user.email }}</h3>
                <h3>Telefono: &nbsp; {{ $auth.user.phone }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "default",
    data() {
        return {
        };
    },
    head() {
        return {
            title: "Perfil de Usuario",
            meta: [
				{
					hid: "description",
					name: "description",
					content: "Únete a una comunidad de viajeros y aventuras en Rutero. Créate una cuenta gratis y rápido con tu dirección de correo electrónico.",
				},
				{
                    hid: "og:url",
                    property: "og:url",
                    content: "https://www.rutero.cl/User/Profile",
                },
			],
            link: [
                {
                rel: 'canonical',
                href: 'https://www.rutero.cl/User/Profile'
                }
            ],
        };
    },
    methods: {
        editUser() {
            this.$router.push("/User/Profile/edit");
        },
        async getUser() {
            if (!this.$auth.loggedIn) {
                this.$router.push("/login");
            } 
            else{
                const response = await this.$axios.get(
                    `https://rutero-backend.herokuapp.com/api/v1/users/${this.$auth.user.id}`
                );
                this.company = response.data.data.user;
            }
        },
    },
    created() {
        this.getUser();
    },
};
</script>

 <style scoped>
.titleadmin {
    padding: 2rem;
    border-radius: 15px;
}
.admin {
    padding: 5vh 20vw;
    @media screen and (max-width: 768px) {
        padding: 5vh 5vw;
    }
}
.buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5%;
    justify-content: center;
    gap: 1vh;
    width: 100%;
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
}
.boton {
    margin: 30px;
    max-height: 100px;
    float: right;
    padding: 5px;
    border-radius: 5px;
    background-color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 10vw;
    min-width: 150px;
}
.boton:hover {
    background-color: #33aca6;
    color: #fff;
}
a {
    text-decoration: none !important;
    color: inherit !important;
}
a:hover {
    color: inherit !important   ;
}
.info {
    align-self: center;
    padding-left: 5vh;
    @media screen and (max-width: 768px) {
        padding-left: 0;
    }
}
</style>