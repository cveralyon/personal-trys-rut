<template>
    <div class="main" v-if="$auth.user.company_id == 2">
        <h2 class="fontRutero"> Crear nuevo Blog</h2>
        <Form :blog="{}"/>
    </div>
</template>

<script>
import Form from '../../../components/blogsComponents/Form.vue';
export default {
    layout: "default",
    components: {
        Form
    },
    head() {
        return {
            title: "Rutero | Crear nuevo Blog",
        }
    },
}
</script>

 <style scoped>
.main {
    padding-top: 90px;
    padding-left: 7.5vw;
    padding-right: 7.5vw;
    @media screen and (max-width: 768px) {
        padding-top: 25px;
    }
}
</style>