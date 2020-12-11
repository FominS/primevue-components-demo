<template>
  <div class="app-wrapper">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
<style>
  .app-wrapper{
    height: 100%;
  }
</style>