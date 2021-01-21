import PrimeCalendar from "primevue/calendar";
import { Component } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";

@Component({
  inheritAttrs: false
})
export default class Calendar extends BaseInput {
  createInput() {
    return this.$createElement(PrimeCalendar, {
      props: { value: this.value },
      attrs: {
        id: this.innerId,
        ...this.$attrs
      },
      scopedSlots: this.$scopedSlots,
      class: { "p-invalid": this.hasError },
      on: this.$listeners
    });
  }
}
