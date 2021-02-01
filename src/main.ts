import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

import Vue from "vue";
import Vuelidate from "vuelidate";
import PerfectScrollbar from "vue2-perfect-scrollbar";

import PrimeVue from 'primevue/config';
import ProgressBar from "primevue/progressbar";
import Button from "primevue/button";
import Message from "primevue/message";
import Listbox from "primevue/listbox";
import Card from "primevue/card";
import Column from "primevue/column";
import Checkbox from "primevue/checkbox";
import Toolbar from "primevue/toolbar";
import SelectButton from "primevue/selectbutton";
import Dialog from "primevue/dialog";
import Menu from "primevue/menu";
import PrimeAutoComplete from "primevue/autocomplete";
import Paginator from "primevue/paginator";
import Tooltip from "primevue/tooltip";
import Menubar from "primevue/menubar";
import RadioButton from "primevue/radiobutton";
import PrimeTextarea from "primevue/textarea";
import Panel from "primevue/panel";
import InputNumber from "primevue/inputnumber";
import Divider from "primevue/divider";

import "@/sass/style.scss";
import "@/plugins/class-component-hooks";

import App from "@/App.vue";
import router from "@/router";
import { primeConfig } from "@/utils/constants"

import { InputWrapper } from "@/components/auxiliary";
import InputText from "@/components/InputText";
import Textarea from "@/components/Textarea";
import Dropdown from "@/components/Dropdown";
import AutoComplete from "@/components/AutoComplete";
import MultiSelect from "@/components/MultiSelect";
import Calendar from "@/components/Calendar";

Vue.config.productionTip = false;
Vue.directive("tooltip", Tooltip);
Vue.use(Vuelidate);
Vue.use(PerfectScrollbar);
Vue.use(PrimeVue, primeConfig)

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
Vue.component("PrimeAutoComplete", PrimeAutoComplete);
Vue.component("Paginator", Paginator);
Vue.component("Menubar", Menubar);
Vue.component("RadioButton", RadioButton);
Vue.component("PrimeTextarea", PrimeTextarea);
Vue.component("Panel", Panel);
Vue.component("InputNumber", InputNumber);
Vue.component("Divider", Divider);

Vue.component("InputWrapper", InputWrapper);
Vue.component("InputText", InputText);
Vue.component("Dropdown", Dropdown);
Vue.component("AutoComplete", AutoComplete);
Vue.component("MultiSelect", MultiSelect);
Vue.component("Calendar", Calendar);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
