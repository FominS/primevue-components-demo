<template>
  <div>
    <InputText :value="label" @input="$emit('update:label', $event)" label="Label"></InputText>
    <InputText :value="error" @input="$emit('update:error', $event)" label="Error"></InputText>
    <InputText :value="hint" @input="$emit('update:hint', $event)" label="Hint"></InputText>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String },
    error: { type: String },
    hint: { type: String }
  }
};
</script>

<style lang="scss" scoped>
</style>