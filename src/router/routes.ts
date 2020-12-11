import Home from "../views/Home.vue";
import Root from "../views/Root.vue";

import InputTextDemo from "../views/InputTextDemo.vue";
import DropdownDemo from "@/views/DropdownDemo.vue";

import { RouteConfig } from "vue-router";
import { CreateElement } from "vue/types/umd";



const rootComponent = (createElement: CreateElement) => {
  return createElement("router-view");
};

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: Root,
    meta: {
      authorization: {
        scopes: [],
      }
    },
    children: [
      {
        name: "home",
        path: "",
        component: Home,
        meta: {
          title: "Главная"
        }
      },
      {
        name: "input",
        path: "/input-text",
        component: InputTextDemo,
        meta: {
          title: "Поле ввода"
        }
      },
      {
        name: "dropdown",
        path: "/dropdown",
        component: DropdownDemo,
        meta: {
          title: "Выпадающий список"
        }
      },
    ]   
  }
  
];
