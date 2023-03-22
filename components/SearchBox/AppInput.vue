<template>
  <input-base :label="label" :rounded="rounded">
    <slot slot="prefix" name="prefix" />

    <template slot="content">
      <div class="input_content">
        <input
          v-if="!textarea && !select"
          
          :value="value"
          class="input"
          autocomplete="off"
          :class="inputClasses"
          :type="type"
          v-bind="$attrs"
          @input="input"
          v-on="listeners"
        />

        <select
          v-if="select && !textarea"
          :value="value"
          class="appearance-none bg-transparent focus:outline-none flex-1 self-stretch"
          :class="inputClasses"
          :type="type"
          v-bind="$attrs"
          @input="input"
          v-on="listeners"
        >
          <option
            v-for="(opt, i) of options"
            :key="opt.key || `opt-${i}`"
            :value="String(opt.value)"
          >
            {{ opt.text || opt.value }}
          </option>
        </select>

        <textarea
          v-if="textarea"
          :value="value"
          class="appearance-none bg-transparent focus:outline-none flex-1 self-stretch p-2"
          :class="inputClasses"
          v-bind="$attrs"
          @input="input"
          v-on="listeners"
        />

        <chevron-down-icon
          v-if="select"
          class="absolute right-0 top-0 bottom-0 my-auto mr-2 opacity-75 pointer-events-none"
        />
      </div>
    </template>

    <slot slot="suffix" name="suffix" />
    <slot slot="append" name="append" />
  </input-base>
</template>

<script>
import { ChevronDownIcon } from "vue-feather-icons";
import InputBase from "./InputBase";

export default {
  name: "AppInput",
  components: {
    ChevronDownIcon,
    InputBase,
  },
  props: {
    type: { type: String, default: "text" },
    value: { type: [String, Number], default: "" },
    label: { type: [String, Number], default: "" },
    select: { type: Boolean, default: false },
    options: { type: Array, default: null },
    textarea: { type: Boolean, default: false },
    inputClasses: { type: [Object, String], default: () => ({}) },
    rounded: { type: Boolean, default: true },
  },
  computed: {
    hasPrefix() {
      return this.$slots.prefix;
    },
    hasSuffix() {
      return this.$slots.suffix;
    },
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },
  },
  methods: {
    input(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
select,
option:checked {
  text-overflow: ellipsis;
}
.input_content {
  position: relative;
}
.input {
  width: 200%;
  border-radius: 5px;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  background-color: transparent;
  appearance: none;
  height: 100%;
  min-height: 3rem;
  border: 0;
 @media screen and (max-width: 1025px) {
    width: 108%;
  }
}
</style>
