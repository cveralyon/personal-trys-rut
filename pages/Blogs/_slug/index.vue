<template>
  <div>
    <SocialHead
      :title="blog.title"
      :description="'Exprime al máximo tu viaje, vayas donde vayas. Los artículos de Rutero.cl están repletos de ideas de aventuras e información de primera mano que no encontrarás en ningún otro sitio.'"
      :image="'/rutero_logo.png'"
    />
    <div class="container-header-blog">
      <h2 class="blog-name">{{blog.title}}</h2>
      <h2 class="blog-author">{{blog.author}}</h2>
      <h3 class="blog-date">{{blog.published_date}}</h3>
    </div>

    <div class="container-blog">
      <section class="blog-posts">
        <div class="row g-5">
          <div v-html="blog.content"></div>
          <!-- <nav class="blog-pagination" aria-label="Pagination">
            <a class="btn btn-outline-primary" @click="redirect('old')">Older</a>
            <a class="btn btn-outline-secondary" @click="redirect('new')" tabindex="-1" aria-disabled="true">Newer</a>
          </nav> -->
        </div>
      </section>

      <section class="side-blog-bar">
        <div class="col-12 col-md-10 col-lg-9 col-xl-10 mx-auto">
          <h3 class="last-blogs">LO ÚLTIMO</h3>
          <cardBlogs :blogTitle="'Mejores 10 Trekking de la Carretera Austral'" :id="129" :background="['https://rutero-prod.s3.sa-east-1.amazonaws.com/img/blogs/carrtera_austral.webp']" :slug="'mejores-10-trekking-de-la-carretera-austral'"/>
          <cardBlogs :blogTitle="'Qué hacer en una semana en San Pedro de Atacama'" :id="135" :background="['https://rutero-prod.s3.sa-east-1.amazonaws.com/img/blogs/san_pedro.webp']" :slug="'que-hacer-una-semana-en-san-pedro-de-atacama'"/>
        </div>
        <div class="col-12 col-md-10 col-lg-9 col-xl-10 mx-auto">
          <h3 class="last-blogs">MÁS POPULARES</h3>
          <!-- <button class="popular-btn" onclick="">Mensuales</button>
          &nbsp; | &nbsp;
          <button class="popular-btn" onclick="">Semanales</button> -->
      <cardBlogs :blogTitle="'Imperdibles del Cajón del Maipo'" :id="117" :background="['https://rutero-prod.s3.sa-east-1.amazonaws.com/img/blogs/cajon.webp']" :slug="'mejores-cosas-que-hacer-en-el-cajon-del-maipo'"/>
      <cardBlogs :blogTitle="'Top Campings en Buenos Aires ¡Los Imperdibles de la provincia!'" :id="75" :background="['https://rutero-prod.s3.sa-east-1.amazonaws.com/img/blogs/camping.webp']" :slug="'top-10-campings-de-argentina'"/>
        </div>
      </section>
    </div>
    <section class="mobile">
      <h3 class="last-blogs">LO ÚLTIMO</h3>
      <cardBlogs :blogTitle="'Mejores 10 Trekking de la Carretera Austral'" :id="129" :background="['https://rutero-prod.s3.sa-east-1.amazonaws.com/img/blogs/carrtera_austral.webp']" :slug="'mejores-10-trekking-de-la-carretera-austral'"/>
      <cardBlogs :blogTitle="'Qué hacer en una semana en San Pedro de Atacama'" :id="135" :background="['https://rutero-prod.s3.sa-east-1.amazonaws.com/img/blogs/san_pedro.webp']" :slug="'que-hacer-una-semana-en-san-pedro-de-atacama'"/>
      <h3 class="last-blogs">MÁS POPULARES</h3>
      <cardBlogs :blogTitle="'Imperdibles del Cajón del Maipo'" :id="117" :background="['https://rutero-prod.s3.sa-east-1.amazonaws.com/img/blogs/cajon.webp']" :slug="'mejores-cosas-que-hacer-en-el-cajon-del-maipo'"/>
      <cardBlogs :blogTitle="'Top Campings en Buenos Aires ¡Los Imperdibles de la provincia!'" :id="75" :background="['https://rutero-prod.s3.sa-east-1.amazonaws.com/img/blogs/camping.webp']" :slug="'top-10-campings-de-argentina'"/>
    </section>
  </div>
</template>

<script>

import cardBlogs from '../../../components/blogsComponents/cardBlogs.vue';
import axios from "axios";
import SocialHead from '../../../components/Landing/SocialHead.vue';

export default {
  layout: "default",
  components: {
    cardBlogs,
    SocialHead
  },
  data() {
    return {
      authors: ["Jose Pedro Fernandez", "Trinidad Vergara"],
    }
  },
  async asyncData({ params }) {
const { data } = await axios.get(`https://rutero-backend.herokuapp.com/api/v1/blogs/${params.slug}`);    return { 
      blog: data.data.blog,
    };
  },
  head() {
    return {
      title: "Rutero | " + this.blog.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seo_description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "rutero, rutas, aventura, viajes, chile",
        },
      ]
    }
  },
  methods: {
    redirect(id) {
      if (id == 'new') {
        if (this.next_id <= 136) {
          this.$router.push(`/blogs/${this.next_id}`)
        } else {
          this.$router.push(`/blogs`)
        }
      } else {
        if (this.previous_id >= 1) {
          this.$router.push(`/blogs/${this.previous_id}`)
        } else {
          this.$router.push(`/blogs`)
        }
      }
    },
  }
}
</script>

 <style scoped>
.popular-btn {
  border: none;
  background: none;
  color: #EAF7F6;
  cursor: pointer;
  font-size: 1.3vw;
  margin-bottom: 1.2rem;
}
.vl {
  border-left: 2px solid #EAF7F6;
  height: 100px;
  display: inline;
}
.last-blogs{
  color: #EAF7F6;
  margin-bottom: 1.7rem;
  font-family: "Barlow", sans-serif;
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: 1.7rem;
  @media (max-width: 1025px) {
    text-align: center;
    color: black;
  }
}
.other-blogs{
  flex: none;
  margin-left: auto !important;
  margin-right: auto !important;
}
.blog-date {
  color: #EAF7F6;
  font-size: 1.625rem;
  line-height: 1.2;
  bottom: 3rem;
  padding-left: 7.5vw;
  position: absolute;
}
.blog-author {
  padding-left: 5.625rem;
  font-size: 2.5rem;
  font-weight: 100;
  color: #EAF7F6;
  font-style: italic;
  position: absolute;
  bottom: 5.2rem;
}
.blog-name {
  padding: 5% 7.5vw;
  font-size: 3rem;
  line-height: 1.1944444444;
  font-weight: 600;
  margin-bottom: 0.625rem;
  color: #EAF7F6;
  font-family: Barlow,sans-serif;
  @media screen and (max-width: 1025px) {
    font-size: 2rem;
    margin-top: 1rem;
  }
}
.container-header-blog{
  background-image: linear-gradient(to left, rgba(196,247,241,0.1), #3c8780 100%),url(https://dgoz6t0l59f4w.cloudfront.net/blog_articles/bgs/000/000/066/large/IMG_20190107_200315_685.jpg?1547225994);
  background-size: cover;
  background-color: #94A4B5;
  height: 40vh;
  width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  margin-bottom: 0rem;
}
.container-blog {
  display: flex;
  width: 100vw;
}
.blog-posts {
  background-color: #fff;
  padding: 4rem;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 66%;
  box-sizing: border-box;
  @media screen and (max-width: 1025px) {
    padding: 2.5rem;
  }
}
.side-blog-bar {
  background-color: #808080;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  flex: 33%;
  box-sizing: border-box;
  @media screen and (max-width: 1025px) {
    display: none;
  }
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Playfair Display", Georgia, "Times New Roman", serif/*rtl:Amiri, Georgia, "Times New Roman", serif*/;
}

.display-4 {
  font-size: 2.5rem;
}
@media (min-width: 768px) {
  .display-4 {
    font-size: 3rem;
  }
}

.flex-auto {
  flex: 0 0 auto;
}

.h-250 { height: 250px; }
@media (min-width: 768px) {
  .h-md-250 { height: 250px; }
}

/* Pagination */
.blog-pagination {
  margin-bottom: 4rem;
}
.blog-pagination > .btn {
  border-radius: 2rem;
}

/*
* Blog posts
*/
.blog-post {
  margin-bottom: 4rem;
}
.blog-post-title {
  margin-bottom: .25rem;
  font-size: 2.5rem;
}
.blog-post-meta {
  margin-bottom: 1.25rem;
  color: #727272;
}
.mobile {
  display: none;
  @media screen and (max-width: 1025px) {
    display: block;
  }
}
</style>