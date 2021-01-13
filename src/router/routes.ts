import { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Root from "@/views/Root.vue";
import Sandbox from "@/views/Sandbox.vue";

import InputTextDemo from "@/views/InputTextDemo.vue";
import DropdownDemo from "@/views/DropdownDemo.vue";
import TextareaDemo from "@/views/TextareaDemo.vue";
import AutoCompleteDemo from "@/views/AutoCompleteDemo.vue";

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: Root,
    meta: {
      authorization: {
        scopes: []
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
        name: "autocomplete",
        path: "/autocomplete",
        component: AutoCompleteDemo,
        meta: {
          title: "Автокомплит"
        }
      },
      {
        name: "sandbox",
        path: "/sandbox",
        component: Sandbox,
        meta: {
          title: "Песочница"
        }
      }
    ]
  }
];
