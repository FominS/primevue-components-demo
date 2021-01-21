<template>
  <div>
    <wrapped-radio-button
      v-for="(keyValue, key) in keys"
      v-on="$listeners"
      :model-value="value"
      :value="keyValue"
      :key="key"
      :label="key"
      @input="$emit('input', $event)"
    ></wrapped-radio-button>
  </div>
</template>

<script>
import { WrappedRadioButton } from "@/components";

export default {
  components: { WrappedRadioButton },
  props: ["value", "keys"]
};
</script>

<style lang="scss" scoped>
</style>