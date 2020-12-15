import PrimeTextarea from "primevue/components/textarea/Textarea";
import { Component } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";

@Component({
  inheritAttrs: false
})
export default class Textarea extends BaseInput<string> {
  createInput() {
    return this.$createElement(PrimeTextarea, {
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
