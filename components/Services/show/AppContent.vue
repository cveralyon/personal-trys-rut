<template>
  <component :is="tag" v-html="html" />
</template>

<script>
export default {
  props: {
    tag: { type: String, default: "div" },
    html: { type: String, required: true },
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

  p {
    @apply mt-4;
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
</style>
