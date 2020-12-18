import PrimeInputMask from "primevue/components/inputmask/InputMask";
import { Component } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";

@Component({
  inheritAttrs: false
})
export default class Textarea extends BaseInput<string> {

  render() {
    return this.$createElement("div", this.wrapperOptions, this.getChildren(PrimeInputMask));
  }
}
