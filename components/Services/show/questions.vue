<template>
	<form class="question-form">
    <div class="form-group col-12">
      <label class="question-label" for="question" ><b>Haz una pregunta a {{service.name}}</b></label> 
      <img class="wsp" src="https://rutero-prod.s3.sa-east-1.amazonaws.com/img/WhatsApp.svg.webp" >
      <textarea type="text" id="question" class="form-control" style="margin-top: 0.8rem; margin-bottom: 0.8rem;" v-model="questionAUX">
        </textarea>
    </div>
		<div class="askButton" v-if="$auth.loggedIn">
      <button
      :disabled = "disabledbtnSendQuestion"
      type="button"
      class="bg-teal-400 flex-1 text-white font-bold rounded-md"
      @click="save_question_bdd()"
      id="ask-button"
      style="padding: 0.5rem;">
      Preguntar</button>
    </div>
    <div class="askButton" v-else>
      <button
      :disabled = "disabledbtnSendQuestion"
      type="button"
      class="bg-teal-400 flex-1 text-white font-bold rounded-md"
      @click="alert_debe_registrarse()"
      id="ask-button"
      style="padding: 0.5rem;">
      Preguntar</button>
    </div>      
	</form>
</template>

<script>
  //v-if="$auth.loggedIn"
export default {
	components: {
  },
  props: ['service'],
	data() {
		return {
      questionAUX: '',
      disabledbtnSendQuestion: false,
			question: {
        user_id: null, 
        service_id: this.service.id, 
        question: null, 
        answer: null, 
        status: 1,
        user_phone: null, 
        service_phone: null,
        ref: null,
			},
		}
	},
	methods: {
    getY: () => window.scrollY,
    alert_debe_registrarse() {
      this.$emit("mustBeLogged", true);
    },
    alert_question_sent() {
      alert("¡Su pregunta fue enviada correctamente!")
    },
    save_question_bdd() {
      this.question.question = this.questionAUX;
      this.questionAUX = '';
      this.disabledbtnSendQuestion = true;
      this.question.ref = localStorage.getItem("ref")
      if(this.question.question == null || this.question.question.replace(/\s/g,'') == "") {
        alert("No puede dejar el campo vacio, por favor escriba su pregunta.")
        this.disabledbtnSendQuestion = false;
      }else if(this.question.question.replace(/\s/g,'').length < 10) {
        alert("La pregunta no puede ser tan corta, por favor intente reformular su pregunta.")
        this.disabledbtnSendQuestion = false;
      } else if (this.$auth.loggedIn && this.$auth.user.type == 'admin') {
        alert("Los administradores no pueden hacer preguntas.")
        this.disabledbtnSendQuestion = false;

      }
      else{
        this.question.question = this.question.question.split("\n").join("");
        this.question.user_id = this.$auth.user.id;
        this.question.user_phone = this.$auth.user.phone
        var telefono = this.service.company_phone ? this.service.company_phone : this.service.phone
        if(this.service.company_phone === '56966762873') {
          telefono = this.question.service_phone ? this.question.service_phone : '0'
        }
        if (telefono.length === 11) {
          this.question.service_phone = telefono
        } else {
          this.question.service_phone = '56966762873'
        }

        // prueba
        
        this.$axios
            .$post("/api/v1/questions", this.question)
            .then((response) => {
              if(response){
                this.question.question = "";
                this.alert_question_sent()
                this.disabledbtnSendQuestion = false;
              }
            })
            .catch((error) => {
              if (error.response.statusText =='Unauthorized') {
                this.question.question = "";
                alert("Hemos detectado que intentas enviar información de contacto ¡Esto NO esta permitido! \nSi insistes tu cuenta podria ser suspendida.") 
                this.disabledbtnSendQuestion = false;             
              }else{
                alert("Hubo un error al enviar su pregunta, por favor intente mas tarde") 
                this.disabledbtnSendQuestion = false;             
              }
            });
      }
    },
	}
}
</script>

<style lang="scss" scoped>

.question-label {
  padding-top: 10px;
  max-width: 79%;
  @media screen and (max-width: 321px) {
    max-width: 214px;
    font-size: smaller;  
  }
}

.question-form {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  background-color: white;
  border-radius: 15px;
  padding: 5%;
  padding-top: 3%;

  @media screen and (max-width: 1025px) {
    max-height: 48rem;
    overflow-y: auto;
    overflow-x: hidden;  }
  @media screen and (max-width: 391px) {
    max-height: 39rem;
  }
  @media screen and (max-width: 376px) {
    max-height: 34rem;
  }
  @media screen and (max-width: 321px) {
    max-height: 29rem;
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