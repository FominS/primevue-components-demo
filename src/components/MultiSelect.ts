import PrimeMultiSelect from "primevue/multiselect";
import { Component } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";

@Component({
  inheritAttrs: false
})
export default class MultiSelect extends BaseInput {
  createInput() {
    return this.$createElement(PrimeMultiSelect, {
      props: { value: this.value },
      attrs: {
        inputId: this.innerId,
        ...this.$attrs
      },
      scopedSlots: this.$scopedSlots,
      class: { "p-invalid": this.hasError },
      on: this.$listeners
    });
  }
}
