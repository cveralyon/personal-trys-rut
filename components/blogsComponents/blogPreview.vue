<template>
    <div class="card shadow-sm" style="flex">
        <nuxt-link
            :to="'blogs/' + blog.slug"
            style="color: black; text-decoration: none"
        >
        <!-- <NuxtImg preload format="webp" quality="50" class="bd-placeholder-img card-img-top" width="100%" height="225" :src="blog.cover ? blog.cover :'~/assets/images/Blog.jpg'" alt="blogimage" /> -->
        <div class="card-body">
            <h2 class="card-text">{{ blog.title }}</h2>
        </div>
        </nuxt-link>

    </div>
</template>

<script>
    export default {
        name: "blogPreview",
        props:["blog"],
    }
</script>

<style scoped>

.card{
    padding: 1%;
    flex-direction: column;
    width: 24rem;
    border-radius: 0;
    border: 1px solid;
    position: relative;
    margin: 0.5rem;
}
.card-body{
    padding-right: 3%;
    padding-left: 3%;

}
.card-text{
    font-family: Barlow, sans-serif;
    font-size: 1rem;
    font-weight: bold;
    color: #000;
}
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    border-radius: 3%;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}

</style>