import PrimeDropdown from "primevue/dropdown";
import { Component } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";

@Component({ inheritAttrs: false })
export default class Dropdown extends BaseInput {
  createInput() {
    return this.$createElement(PrimeDropdown, {
      props: { value: this.value },
      scopedSlots: this.$scopedSlots,
      attrs: {
        inputId: this.innerId,
        ...this.$attrs
      },
      class: { "p-invalid": this.hasError },
      on: this.$listeners
    });
  }
}
