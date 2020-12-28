import Home from "../views/Home.vue";
import Root from "../views/Root.vue";
import Sandbox from "@/views/Sandbox.vue";
import Sandbox2 from "@/views/Sandbox2.vue";

import InputTextDemo from "../views/InputTextDemo.vue";
import DropdownDemo from "@/views/DropdownDemo.vue";
import TextareaDemo from "@/views/TextareaDemo.vue";

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
      {
        name: "textarea",
        path: "/textarea",
        component: TextareaDemo,
        meta: {
          title: "Текстовая область"
        }
      },
      {
        name: "sandbox",
        path: "/sandbox",
        component: Sandbox,
        meta: {
          title: "Песочница"
        }
      },
      {
        name: "sandbox-2",
        path: "/sandbox-2",
        component: Sandbox2,
        meta: {
          title: "Песочница"
        }
      },
    ]   
  }
  
];
