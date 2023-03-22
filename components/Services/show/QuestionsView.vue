<template>
	<form class="question-form">
    <div class="form-group col-12" v-if="questions.length > 0">
      <label class="question-label" for="question" style="font-size: initial;" ><b>Últimas Preguntas Realizadas</b></label> 
      <!-- <div class="form-group col-12">
        <label class="question-label" v-for="question in questions" :key="question.id" >
          <li class="border-t border-gray-200 flex mb-1" style="width: 100%;"></li>
          <b>{{question.question}} - <span style="color:#33aca6;">{{question.user_name}}</span></b><br>
          <div style="display: -webkit-box;margin-top: 2%;padding: 1%;margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="height: 20px"><path d="m19.706 13.708-3 3a1 1 0 0 1-1.414-1.414L16.586 14H5a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4h10.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1-.001 1.415z" style="fill:rgb(163 162 164)"/></svg>
            <p>{{question.answer}}<span style="color: #a7acb0;font-style: italic;"> {{question.updated_at}}</span></p>
          </div>
        </label>
      </div> -->
      <ReadMore :longText="questions" />
    </div>   
    <div class="form-group col-12" v-if="questions.length == 0">
      <label class="question-label"  ><b>No se han realizado preguntas anteriormente</b></label>
    </div>
	</form>
</template>

<script>
import ReadMore from '@/components/ReadMore.vue';
export default {
    props: ['service'],
	data() {
		return {
      questions: [],
		}
	},
    components: {
        ReadMore,
    },
	methods: {
        get_questions() {
            this.$axios
                .get("/api/v1/questions/" + this.service.id)
                .then((response) => {
                    this.questions = response.data.reverse();
                    for (var i = 0; i < this.questions.length; i++) {
                      this.questions[i].updated_at = this.questions[i].updated_at.split("T")[0];
                    }
                })
                .catch((error) => {
                    console.log(error);
                }
            );
        },
	},
    mounted() {
        this.get_questions()
    },
}
</script>

<style lang="scss" scoped>

.question-label {
  padding-top: 5px;
  @media screen and (max-width: 321px) {
    max-width: 214px;
    font-size: smaller;  
  }
}

.question-form {
  margin-top: 7%;
  padding: 3%;
  background-color: white;
  border-radius: 15px;
  @media screen and (max-width: 1025px) {
    padding: 1%;
    padding-top: 10px;
    margin: 2rem;
    max-height: none;
  }
}
.askButton {
  display: flex;
  align-items: center;
}


.wsp {
  max-height: 50px;
  display: inline;
  float: right;

  @media screen and (max-height: 1025px) {
    margin-inline-end: 6px;

  }
  @media screen and (max-height: 750px) {
    margin-inline-end: 6px;
  }
  @media screen and (max-height: 670px) {
    margin-inline-end: 7px;
    margin-top: 12px;
    max-height: 45px;
  }

}
</style>