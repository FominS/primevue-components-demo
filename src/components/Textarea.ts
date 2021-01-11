import PrimeTextarea from "primevue/components/textarea/Textarea.vue";
import { Component } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";

@Component({
  inheritAttrs: false
})
export default class Textarea extends BaseInput {
  createInput() {
    return this.$createElement(PrimeTextarea, {
      props: { value: this.value },
      attrs: {
        id: this.innerId,
        ...this.$attrs
      },
      class: {"p-invalid": this.hasError},
      on: this.$listeners
    });
  }
}
