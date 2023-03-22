<template>
  <div class="app-input">
    <label v-if="label" class="label" for="">{{ label }}</label>

    <div
      class="input-wrapper"
      :class="{ 'pl-2': hasPrefix, 'pr-2': hasSuffix, 'rounded-md': rounded }"
      v-on="$listeners"
    >
      <div v-if="hasPrefix" class="prefix pr-2 pl-1">
        <slot name="prefix" />
      </div>

      <div class="w-full min-h-full flex" :class="wrapperClass">
        <slot name="content" />
      </div>

      <div v-if="hasSuffix" class="suffix pl-3 pr-1">
        <slot name="suffix" />
      </div>

      <slot v-if="hasAppend" name="append" />
    </div>
  </div>
</template>

<script>
export default {
  name: "InputBase",
  props: {
    label: { type: String, default: "" },
    asButton: { type: Boolean, default: false },
    wrapperClass: { type: [Object, String], default: "" },
    rounded: { type: Boolean, default: true },
  },
  computed: {
    hasPrefix() {
      return this.$slots.prefix;
    },
    hasSuffix() {
      return this.$slots.suffix;
    },
    hasAppend() {
      return this.$slots.append;
    },
  },
};
</script>

<style lang="postcss" scoped>
.app-input {
  @apply flex flex-col relative;
}

.label {
  @apply mb-1 font-semibold;
  @apply text-gray-800 text-sm;
}

.input-wrapper {
  background-color: #fff;
  border-color: #e2e8f0;
  border-width: 1px;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
  border: solid #e2e8f0;
}
</style>
