<template>
    <div class="admin">
        <h2>Datos de compañia</h2>
        <div class = "company">
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
            <button @click="editCompany" style="margin: 30px; max-height: 100px; align-self: center;" class="boton">Editar</button>
        </div>
    </div>
</template>

<script>

import axios from "axios";
export default {
    layout: "default",
    data() {
        return {
            company: {},
        };
    },
    head() {
        return {
            title: "Perfil de Compañia",
        };
    },
    async asyncData({ params }) {
        const company = {};
        const response = await axios.get(
            `https://rutero-backend.herokuapp.com/api/v1/companies/${params.id}`
        );
        company.id = params.id;
        company.name = response.data.data.company.name;
        company.email = response.data.data.company.email;
        company.phone = response.data.data.company.phone;
        company.rut = response.data.data.company.rut;
        return { company };
    },
    methods: {
        editCompany() {
            this.$router.push("/admin/company/" + this.company.id + "/edit");
        },
        reservasActivas() {
            this.$router.push("/admin/company/" + this.company.id + "/Reservas/activas");
        },
        reservasPasadas() {
            this.$router.push("/admin/company/" + this.company.id + "/Reservas/historial");
        },
    },
}
</script>

 <style scoped>
.titleadmin {
    padding: 2rem;
    background-color: white;
    border: 1px solid;
    border-radius: 15px;
}
.admin {
    background-color: #e4e4e4; 
    padding: 5vh 20vw;
    @media screen and (max-width: 768px) {
        padding: 5vh 5vw;
    }
}
.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5%;
    gap: 1vh;
    width: 100%;
}
.boton {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #000;
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
    background-color: white;
    border: 1px solid;
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