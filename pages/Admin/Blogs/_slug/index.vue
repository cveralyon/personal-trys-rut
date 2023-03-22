<template>
    <div class="main" v-if="$auth.user.company_id == 2">
        <Form :blog="blog"/>
    </div>
</template>

<script>

import axios from "axios";
import Form from '../../../../components/blogsComponents/Form.vue';
export default {
    layout: "default",
    components: {
        Form
    },
    async asyncData({ params }) {
        const { data } = await axios.get(`https://rutero-backend.herokuapp.com/api/v1/blogs/${params.slug}`);        return { 
        blog: data.data.blog,
        };
    },
    head() {
    return {
      title: "Admin | " + this.blog.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seo_description,
        }
      ]
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