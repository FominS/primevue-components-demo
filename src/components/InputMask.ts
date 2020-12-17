import PrimeInputMask from "primevue/components/inputmask/InputMask";
import { Component } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";

@Component({
  inheritAttrs: false
})
export default class Textarea extends BaseInput<string> {
  createInput() {
    return this.$createElement(PrimeInputMask, {
      props: { value: this.value },
      attrs: {
        ...this.$attrs,
        id: this.innerId
      },
      on: this.$listeners
    });
  }

  render() {
    return this.$createElement("div", this.wrapperOptions, this.children);
  }
}
