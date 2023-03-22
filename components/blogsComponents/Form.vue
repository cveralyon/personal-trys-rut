<template>
    <div>
        <div class="formContainer">
            <form @submit.prevent="createBlog">
                <div class="form-group">
                    <label for="title">Título</label>
                    <input type="text" class="form-control" id="title" v-model="blog.title" placeholder="Título">
                </div>
                <div class="row">
                    <div class="form-group col-12 col-md-6">
                        <label for="published_date ">Fecha Publicación</label>
                        <input type="date" class="form-control" id="date" v-model="blog.published_date" placeholder="Fecha Publicación">
                    </div>
                    <div class="form-group col-12 col-md-6">
                        <label for="status">Estado</label>
                        <select class="form-control" id="status" v-model="blog.status">
                            <option value="0">Borrador</option>
                            <option value="1">Publicado</option>
                            <option value="2">Eliminado</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="content">Contenido</label>
                    <wysiwyg v-model="blog.content" />
                </div>
                <h2> SEO </h2>
                <div class="form-group">
                    <label for="seo_title">Seo Title</label>
                    <input type="text" class="form-control" id="seo_title" v-model="blog.seo_title" placeholder="Seo Title">
                </div>
                <div class="form-group">
                    <label for="seo_description">Seo Description</label>
                    <input type="text" class="form-control" id="seo_description" v-model="blog.seo_description" placeholder="Seo Description">
                </div>
                <div class="form-group" v-if="!blog.id">
                    <label for="slug">Slug</label>
                    <input type="text" class="form-control" id="slug" v-model="blog.slug" placeholder="Slug">
                </div>
                <div class="buttons">
                    <button class="btn btn-primary">Guardar</button>
                    <button class="btn btn-danger" @click="blogs">Eliminar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    layout: "default",
    props: ["blog"],
    methods: {
        createBlog() {
            this.reservation_token = this.$route.query.auth,
            this.blog.hyperadmin_id = 2;
            this.blog.sponsor_id = 1;
            if (this.blog.id) {
                this.$axios
                .$patch(
                `/api/v1/blogs/${this.blog.slug}`, this.blog,
                {
                    headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                    },
                }
                )
            } else {
                this.$axios
                .$post(
                `/api/v1/blogs`,
                {
                    blog: this.blog
                },
                {
                    headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                    },
                }
                )
            }
            this.$router.push('/admin/blogs');
        },
        blogs() {
            alert("Por ahora no se eliminan los blogs!")
            this.$router.push('/admin/blogs');
        }
    }
}
</script>

<style>
.buttons {
    display: flex;
    justify-content: space-around;
    padding: 0 7.5vw;
    width: 100%;
}
.form-group{ 
    font-weight: 500;
    font-size: 0.8125rem;
    color: #53606F;
    margin-bottom: 0.625rem;
}
.form-control {
    border: 0.0625rem solid #94A4B5;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: normal;
    color: #000000;
    padding: 0.4375rem 1.25rem 0.4375rem;
    display: block;
    width: 100%;
    background-color: #fff;
    background-clip: padding-box;
    line-height: 1.5;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

}
</style>