import "./plugins/class-component-hooks";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

import ProgressBar from 'primevue/progressbar';
import Button from "primevue/button";
import Message from 'primevue/message';
import Listbox from "primevue/listbox";
import Card from "primevue/card";
import Column from "primevue/column";
import Checkbox from "primevue/checkbox";
import Toolbar from "primevue/toolbar";
import SelectButton from 'primevue/selectbutton';
import Dialog from 'primevue/dialog';
import Menu from 'primevue/menu';
import Autocomplete from "primevue/autocomplete";
import Calendar from "primevue/calendar";
import Paginator from "primevue/paginator";
import Tooltip from 'primevue/tooltip';
import Menubar from 'primevue/menubar';
import RadioButton from 'primevue/radiobutton';
import PrimeTextarea from 'primevue/textarea';

import InputText from '@/components/InputText.ts';
import Textarea from '@/components/Textarea.ts';
import Dropdown from '@/components/Dropdown.ts';

import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import "@/sass/style.scss";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(PerfectScrollbar);

Vue.component("ProgressBar", ProgressBar);
Vue.component("TextArea", Textarea);
Vue.component("Button", Button);
Vue.component("Message", Message);
Vue.component("Card", Card);
Vue.component("Listbox", Listbox);
Vue.component("Column", Column);
Vue.component("Checkbox", Checkbox);
Vue.component("Toolbar", Toolbar);
Vue.component("DataView", DataView);
Vue.component("SelectButton", SelectButton);
Vue.component("Dialog", Dialog);
Vue.component("Menu", Menu);
Vue.component("AutoComplete", Autocomplete);
Vue.component("Calendar", Calendar);
Vue.component("Paginator", Paginator);
Vue.component("Menubar", Menubar);
Vue.component("RadioButton", RadioButton);
Vue.component("PrimeTextarea", PrimeTextarea);

Vue.component("InputText", InputText);
Vue.component("Dropdown", Dropdown);

Vue.directive('tooltip', Tooltip);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
