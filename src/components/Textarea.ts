import PrimeTextarea from "primevue/components/textarea/Textarea";
import { Component } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";

@Component({
  inheritAttrs: false
})
export default class Textarea extends BaseInput<string> {
  render() {
    return this.$createElement("div", this.getChildren(PrimeTextarea));
  }
}
