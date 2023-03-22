<template>
    <div class="recomendaciones">
        <div v-for="service in services" :key="service.id" class="card-service" @click="showService(service.id)" :style="{
        'background-image':'linear-gradient(#0000, rgba(41, 53, 59, 0.8)), url(' + service.first_image +')',
        }">
            <div class="filter">
                <div class="info-service">
                    <h2 class="name">{{ service.name }}</h2>
                    <h3 class="company">{{ service.company_name }}</h3>
                    <h4 class="value">{{ service.min_value }}</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["services"],
    methods: {
        showService(id) {
            this.$router.push(`/services/${id}`);
        },
    },
}
</script>
<style lang="scss" scoped>
.recomendaciones {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 0 0 0 7.5vw;
    overflow-x: scroll;
    overflow-y: hidden;
}
.recomendaciones::-webkit-scrollbar {
    display: none;
}
.card-service {
    background-size: cover;
    background-position: center;
    min-width: 230px;
    height: 400px;
    cursor: pointer;
    @media (max-width: 1025px) {
        min-width: 200px;
        height: 300px;
    }
}
.card-service:hover {
    transform: scale(1.05);
    background-image: linear-gradient(#0000, rgba(41, 53, 59, 0.8));

}
.filter {
    min-height: -webkit-fill-available;
    position: relative;
    z-index: 1;
}
.filter:hover {
    background: linear-gradient(rgba(80,209,197,.6),rgba(41,53,59,.4));
}
.info-service {
    position: absolute;
    bottom: 0;
    width: -webkit-fill-available;
    color: #fff;
    padding: 1rem 1.5rem 1rem;
    background: linear-gradient(rgb(255 255 255 / 0%), rgb(0 0 0 / 78%));
}
.name {
    font-weight: 600;
    font-size: 1.2rem;
    @media (max-width: 1025px) {
        font-size: 1rem;
    }
}
.company {
    font-size: 1rem;
    font-weight: 400;
}
</style>