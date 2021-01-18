import AutoComplete from "primevue/autocomplete";
import { Component } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";

@Component({ inheritAttrs: false })
export default class Dropdown extends BaseInput {
  createInput() {
    return this.$createElement(AutoComplete, {
      props: { value: this.value },
      scopedSlots: this.$scopedSlots,
      attrs: {
        id: this.innerId,
        ...this.$attrs
      },
      class: { "p-invalid": this.hasError },
      on: this.$listeners
    });
  }
}
