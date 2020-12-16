<template>
  <div>
    <text-area
      v-model="value"
      :rows="15"
      :cols="3"
      :auto-resize="false"
      @focus="focus"
      @click="click"
      placeholder="Search"
      readonly
      label="test"
      autofocus
    >
      <template #prepend>
        <h1>prepend</h1>
      </template>
      <template #append>
        <h2>append</h2>
      </template>
    </text-area>
    <h5>Left Icon</h5>
    <label for="">test</label>
    <div class="p-input-icon-left">
      <i class="pi pi-search" />
      <PrimeTextarea type="text" v-model="value2" placeholder="Search" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: undefined,
      value2: undefined
    };
  },
  methods: {
    click() {
      console.log("click on element");
    },
    focus() {
      console.log("focus on element");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>