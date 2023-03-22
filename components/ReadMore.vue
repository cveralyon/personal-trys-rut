<template>
  <div>
    <li class="border-t border-gray-200 flex mt-4"></li>
    <article v-if="question" class="mt-6 leading-relaxed text-sm" v-show="!readMoreActivated">
      <b
        >{{ question.question }} -
        <span style="color: #33aca6">{{ question.user_name }}</span></b
      ><br />
      <div
        style="
          display: -webkit-box;
          margin-top: 2%;
          padding: 1%;
          margin-right: 12px;
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style="height: 20px"
        >
          <path
            d="m19.706 13.708-3 3a1 1 0 0 1-1.414-1.414L16.586 14H5a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4h10.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1-.001 1.415z"
            style="fill: rgb(163 162 164)"
          />
        </svg>
        <p>
          {{ question.answer
          }}<span style="color: #a7acb0; font-style: italic">
            {{ question.updated_at }}</span
          >
        </p>
      </div>
    </article>
    <article v-if="question1" class="mt-6 leading-relaxed text-sm" v-show="!readMoreActivated">
      <b
        >{{ question1.question }} -
        <span style="color: #33aca6">{{ question1.user_name }}</span></b
      ><br />
      <div
        style="
          display: -webkit-box;
          margin-top: 2%;
          padding: 1%;
          margin-right: 12px;
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style="height: 20px"
        >
          <path
            d="m19.706 13.708-3 3a1 1 0 0 1-1.414-1.414L16.586 14H5a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4h10.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1-.001 1.415z"
            style="fill: rgb(163 162 164)"
          />
        </svg>
        <p>
          {{ question1.answer
          }}<span style="color: #a7acb0; font-style: italic">
            {{ question1.updated_at }}</span
          >
        </p>
      </div>
    </article>
    <article v-if="question2" class="mt-6 leading-relaxed text-sm" v-show="!readMoreActivated">
      <b
        >{{ question2.question }} -
        <span style="color: #33aca6">{{ question2.user_name }}</span></b
      ><br />
      <div
        style="
          display: -webkit-box;
          margin-top: 2%;
          padding: 1%;
          margin-right: 12px;
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style="height: 20px"
        >
          <path
            d="m19.706 13.708-3 3a1 1 0 0 1-1.414-1.414L16.586 14H5a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4h10.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1-.001 1.415z"
            style="fill: rgb(163 162 164)"
          />
        </svg>
        <p>
          {{ question2.answer
          }}<span style="color: #a7acb0; font-style: italic">
            {{ question2.updated_at }}</span
          >
        </p>
      </div>
    </article>
    <article v-if="question3" class="mt-6 leading-relaxed text-sm" v-show="!readMoreActivated">
      <b
        >{{ question3.question }} -
        <span style="color: #33aca6">{{ question3.user_name }}</span></b
      ><br />
      <div
        style="
          display: -webkit-box;
          margin-top: 2%;
          padding: 1%;
          margin-right: 12px;
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style="height: 20px"
        >
          <path
            d="m19.706 13.708-3 3a1 1 0 0 1-1.414-1.414L16.586 14H5a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4h10.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1-.001 1.415z"
            style="fill: rgb(163 162 164)"
          />
        </svg>
        <p>
          {{ question3.answer
          }}<span style="color: #a7acb0; font-style: italic">
            {{ question3.updated_at }}</span
          >
        </p>
      </div>
    </article>
    <span v-show="!readMoreActivated" @click="activateReadMore" class="hover">
      <b>Leer más Preguntas...</b>
    </span>
    <article
      class="mt-6 leading-relaxed text-sm"
      v-show="readMoreActivated"
      v-for="question in questions"
      :key="question.id"
    >
      <b
        >{{ question.question }} -
        <span style="color: #33aca6">{{ question.user_name }}</span></b
      ><br />
      <div
        style="
          display: -webkit-box;
          margin-top: 2%;
          padding: 1%;
          margin-right: 12px;
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style="height: 20px"
        >
          <path
            d="m19.706 13.708-3 3a1 1 0 0 1-1.414-1.414L16.586 14H5a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4h10.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1-.001 1.415z"
            style="fill: rgb(163 162 164)"
          />
        </svg>
        <p>
          {{ question.answer
          }}<span style="color: #a7acb0; font-style: italic">
            {{ question.updated_at }}</span
          >
        </p>
      </div>
    </article>
    <span v-show="readMoreActivated" @click="activateReadMore" class="hover">
      <b>Leer menos...</b>
    </span>
    <br />
    <br />
    <br />
  </div>
</template>
<script>
export default {
  name: "ReadMore",
  props: ["longText"],
  data() {
    return {
      readMoreActivated: false,
      question: "",
      question1: "",
      question2: "",
      question3: "",
      questions: [],
    };
  },
  methods: {
    activateReadMore() {
      this.readMoreActivated = !this.readMoreActivated;
    },
  },
  mounted() {
    for (let i = 0; i < this.longText.length; i++) {
      if (i == 0) {
        this.question = this.longText[i];
      }
      if (i == 1) {
        this.question1 = this.longText[i];
      }
      if (i == 2) {
        this.question2 = this.longText[i];
      }
      if (i == 3) {
        this.question3 = this.longText[i];
      }
      if (i == 4) {
        this.question4 = this.longText[i];
      }
      this.questions.push(this.longText[i]);
    }
  },
};
</script>
<style lang="postcss" scoped>
:deep() {
  ul {
    @apply ml-8;
  }

  li {
    @apply list-disc;
  }

  ol {
    @apply list-decimal;
  }

  strong,
  b {
    @apply font-bold;
  }

  em,
  i {
    @apply italic;
  }

  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  h3 {
    @apply text-lg;
  }
  a {
    color: #4fd1c5 !important;
    transition: 200ms;
  }
  a:hover {
    color: #27a195 !important;
  }
}

.hover {
  display: inline-block;
  @apply mt-4;
}
.hover:hover {
  cursor: pointer;
  color: #4fd1c5;
}
.hover:active {
  cursor: pointer;
  color: #4fd1c5;
}
</style>
