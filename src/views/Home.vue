<template>
  <div class="title p-text-center">
    <h1>Welcome to Demo site!</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
<style scoped>
.title{
  height: calc(100% - 30px);
}
h1 {
  color: gray;
}
</style>
