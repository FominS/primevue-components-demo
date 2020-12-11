import { Component } from "vue-property-decorator";

// register the router hooks
Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave"]);