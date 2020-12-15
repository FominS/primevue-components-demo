<template>
  <div class="app">
    <Menubar :model="menu">
       <template #start>
        <img alt="logo" src="@/assets/logo.prime.svg" height="40" class="p-mr-2">
    </template>
    </Menubar>
    <div class="content">
      <keep-alive include="NotificationList">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Root extends Vue {
  menu = [
    {label: "InputText", to: "/input-text"},
    {label: "Dropdown", to: "/dropdown"},
    {label: "Sandbox", to: "/sandbox"},
  ];
}
</script>

<style>
.app,
.content-wrapper {
  height: 100%;
}

.content-wrapper {
  margin-left: 250px;
}

.content {
  padding: 1rem;
  height: calc( 100% - 60px );
  overflow-y: auto;
}

.content > .fill-content {
  margin: -1rem;
  height: 100vh;
}

.overlay {
  display: none;
  z-index: 89;
  background-color: rgba(98, 98, 98, 0.65);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: pointer;
}

.p-progressbar.loading-bar {
  height: 5px;
  position: fixed;
  top: 0;
  left: 250px;
  right: 0;
  border-radius: 0;
}

.p-toast {
  width: 30rem;
}

.p-toast-message-icon {
  display: none !important;
}

.p-toast-message-text {
  margin: 0px !important;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
  line-height: 2rem;
}

.p-toast-detail {
  overflow: visible;
  max-height: 400px;
  overflow-y: auto;
}

.p-toast-message-enter {
  opacity: 0;
  -webkit-transform: translateX(50%) !important;
  -ms-transform: translateX(50%) !important;
  transform: translateX(50%) !important;
}

.p-toast-detail:empty {
  margin: 0px !important;
}

@media (max-width: 960px) {
  .p-toast {
    left: 20px;
    width: auto;
  }

  .content-wrapper {
    margin-left: 0px;
    padding-top: 56px;
  }

  .content > .fill-content {
    height: calc(100vh - 56px);
  }

  .layout-sidebar {
    display: none;
  }

  .p-progressbar.loading-bar {
    top: 56px;
    left: 0;
    z-index: 10;
  }

  .app-header {
    display: none;
  }

  .app.sidebar-opened .overlay {
    display: block;
    z-index: 97;
  }

  .app.sidebar-opened .layout-sidebar {
    display: block;
    z-index: 98;
    padding-top: 56px;
  }
}
</style>
