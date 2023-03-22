<template>
  <div class="principal" v-if="$auth.user.company_id == 2">
    <div class="row">
      <h2 class="fontRutero col-12 col-sm-6 col-md-6 col-lg-5 mr-auto">Blogs</h2>
      <div class="col-12 ml-auto col-sm-7 col-md-5 col-lg-4 col-xl-3">
      <button class="btn btn-primary btn-block" @click="newBlog()">Crear Blog</button>
      </div>
    </div>
    <b-table
      id="my-table"
      :striped="true"
      :bordered="true"
      :small="true"
      :hover="true"
      :items="blogs"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template #cell(status)="data">
        <td v-if="data.item.status == 'Borrador'"><div class="btn borrador">Borrador</div></td>
        <td v-if="data.item.status == 'Publicado'"><div class="btn publicado">Publicado</div></td>
        <td v-if="data.item.status == 'Eliminado'"><div class="btn eliminado">Eliminado</div></td>
    </template>
      <template #cell(actions)="data">
        <b-button
          variant="primary"
          @click="viewBlog(data.item)"
          size="sm"
          style="min-width: 80px; width: 5vw"
        >
          Ver
        </b-button>
        <b-button
          variant="success"
          @click="editBlog(data.item)"
          size="sm"
          style="min-width: 80px; width: 5vw"
        >
          Editar
        </b-button>
      </template>
    </b-table>
    <div style="padding: 0 7.5vw">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>
  
<script>

import blogPreview from '../../../components/blogsComponents/blogPreview.vue';
import axios from "axios";

export default {
  layout: "default",
  components: {
    blogPreview
  },
  data() {
    return {
      blogs: [],
      fields: [
        { key: "created_at", label: "Fecha Publicación", sortable: true },
        { key: "title", label: "Título", sortable: true },
        { key: "status", label: "Estado", sortable: true },
        { key: "actions", label: "Acciones" },
      ],
      perPage: 50,
      currentPage: 1,
    };
  },
  async asyncData({ query }) {
    const { data } = await axios.get('https://rutero-backend.herokuapp.com/api/v1/blogs');
    data.forEach(blog => {
      blog.created_at = blog.created_at.split('T')[0];
      if (blog.status == 1) {
        blog.status = 'Publicado';
      } else if (blog.status == 0) {
        blog.status = 'Borrador';
      } else {
        blog.status = 'Eliminado';
      }
    });
    data.sort ((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    return { blogs: data };
  },
  head() {
    return {
      title: "Admin | Blogs",
    }
  },
  methods: {
    newBlog() {
      this.$router.push('/admin/blogs/new');
    },
    editBlog(blog) {
      this.$router.push(`/admin/blogs/${blog.slug}`);
    },
    viewBlog(blog) {
      window.open(`https://www.rutero.cl/blogs/${blog.slug}`);
    }
  },
  computed: {
    rows() {
      return this.blogs.length;
    },
  },
}
</script>

 <style scoped>

.fontRutero {
  font-family: Barlow,sans-serif;
  padding: 0 7.5vw;
}

.principal {
  padding: 40px 7.5vw !important;
  @media screen and (max-width: 768px) {
    padding-top: 25px;
  }
}

.blogsContainer {
  padding: 0px;
  place-content: center;
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
}
.buttons {
  display: flex;
}
.table {
  margin-bottom: 0;
  border-spacing: 0;
  border-collapse: initial;
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}
.table > thead > tr > th {
  border-bottom: 0;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.4375rem 0.75rem;
  text-transform: uppercase;
  color: white;
  background-color: #53606F;
}

.btn-primary {
  border-color: #36B0A7;
  background-color: #36B0A7;
  color: white;
}

.publicado {
  background-color: #36B0A7 !important;
  cursor: initial !important;
}
.borrador {
  background-color: #fbec7d !important;
  cursor: initial !important;
}
.eliminado {
  background-color: #ff9595 !important;
  cursor: initial !important;
}
</style>