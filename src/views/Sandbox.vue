<template>
  <div>
    <Textarea v-model="value" :rows="15" :cols="3" :auto-resize="false" @focus="focus" @click="click" label="test" autofocus></Textarea>
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