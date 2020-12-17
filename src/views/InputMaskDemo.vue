<template>
  <div>
    <InputMask v-model="value" label="inputMask" mask="(999) 999-9999? x99999" placeholder="+7(999)-999-99-99"></InputMask>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: undefined
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