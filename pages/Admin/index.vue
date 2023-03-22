<template>
    <div  class="admin">
        <div class="bg-gray-100 rounded-md" style="padding:2rem;">
            <h1 >Mis Datos</h1>
            <div v-if="$auth.loggedIn && $auth.user.company_id == 2" >
                <h2>Datos de compañia</h2>
                <div class = "bg-gray-300 company">
                    <div class="imagen">
                        <img src="~/assets/images/rutero_logo.png" alt="logo-company">
                    </div>
                    <div class="info">
                        Nombre:
                        <h3>{{company.name}}</h3>
                        Email:
                        <h4 color="lightgray">{{company.email}}</h4>
                        Telefono:
                        <h4 color="lightgray">{{company.phone}}</h4>
                        Rut:
                        <h4 color="lightgray">{{company.rut}}</h4>
                    </div>
                    <button @click="redirect(`company/${company.id}/edit`)" style="margin: 30px; max-height: 100px; align-self: center;" class="boton">Editar</button>
                </div>
                <h2 style="margin-top: 3vh;">Datos de administradores</h2>
                <div class="bg-gray-300 titleadmin">
                    <h2>Nombre: &nbsp; {{ $auth.user.name }}</h2>
                    <h2>Correo: &nbsp; {{ $auth.user.email }}</h2>
                </div>
                <div class="buttons">
                    <button @click="redirect('services')" class="boton">
                        <a>Servicios</a>
                    </button>
                    <button @click="redirect('blogs')" class="boton">
                        <a>Blogs</a>
                    </button>
                    <button @click="redirect('questions')" class="boton">
                        <a>Preguntas</a>
                    </button>
                    <button @click="redirect('reservations')" class="boton">
                        <a>Reservas</a>
                    </button>
                    <button @click="redirect('services/recommended')" class="boton">
                        <a>Recomendados</a>
                    </button>
                    <button @click="redirect('services/tendencias')" class="boton">
                        <a>Tendencias</a>
                    </button>
                </div>
            </div>
            <div class="bg-gray-100 rounded-md" v-else > 
                
                <h2>Datos de compañia</h2>
                <div class = "bg-gray-300 company">
                    <div class="imagen">
                        <img src="~/assets/images/rutero_logo.png" alt="logo-company">
                    </div>
                    <div class="info">
                        <h3>{{company.name}}</h3>
                        <h4 color="lightgray">{{company.email}}</h4>
                        <h4 color="lightgray">{{company.phone}}</h4>
                    </div>
                    <button @click="redirect(`company/${company.id}/edit`)" style="margin: 30px; max-height: 100px; align-self: center;" class="boton">Editar</button>
                </div>
                <h2 style="margin-top: 3vh;">Datos de administradores</h2>
                <div class="bg-gray-300  titleadmin">
                    <h2>Nombre: &nbsp; {{ $auth.user.name }}</h2>
                    <h2>Correo: &nbsp; {{ $auth.user.email }}</h2>
                </div>
                <div class="buttons">
                    <button class="boton">
                        <a href="/admin/services">Mis Servicios</a>
                    </button>
                    <button class="boton" v-if="$auth.user.company_id == 1175">
                        <a href="/admin/reservations">Reservas de Austerra</a>
                    </button>
                    <button class="boton" v-if="$auth.user.company_id == 1175">
                        <a href="/admin/questions">Preguntas desde Austerra</a>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "default",
    data() {
        return {
            company: {},
        };
    },
    head() {
        return {
            title: "Perfil de Administrador",
        };
    },
    methods: {
        redirect(route) {
            this.$router.push("/admin/" + route);
        },
        async getCompany() {
            if (!this.$auth.loggedIn) {
                this.$router.push("/login");
            } else {
                if (this.$auth.user.type == "admin") {
                    const { data } = await this.$axios.get("/api/v1/companies/" + this.$auth.user.company_id);
                    this.company = data.data.company;
                    if (this.company.status == 0) {
                        this.company.status = "Inactiva";
                    } else if (this.company.status == 1) {
                        this.company.status = "Activa SIN Mercado Pago";
                    } else if (this.company.status == 2) {
                        this.company.status = "Activa CON Mercado Pago";
                    }
                } else {
                    this.$router.push("/");
                }
            }
        },
    },
    created() {
        this.getCompany();
    },
};
</script>

 <style scoped>
.titleadmin {
    padding: 1rem;
    padding-left: 2rem;
    border-radius: 15px;
}
.admin {
    background-color: transparent; 
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
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
}
.boton {
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
.company {
    display: flex;
    padding: 1rem;
    border-radius: 15px;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
}
.imagen {
    margin: 30px;
    max-width: 150px;
    max-height: 154px;
    background-color: #cacaca;
    border-radius: 10rem;
}
.info {
    align-self: center;
    padding-left: 5vh;
    @media screen and (max-width: 768px) {
        padding-left: 0;
    }
}
</style>
  