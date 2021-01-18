import PrimeMultiSelect from "primevue/multiselect";
import { Component, Prop } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";

@Component({
  inheritAttrs: false
})
export default class MultiSelect extends BaseInput {
  // Работает некорректно без плейсхолдера
  @Prop({ required: true, type: String }) placeholder!: string;

  createInput() {
    return this.$createElement(PrimeMultiSelect, {
      props: { value: this.value },
      attrs: {
        inputId: this.innerId,
        placeholder: this.placeholder,
        ...this.$attrs
      },
      scopedSlots: this.$scopedSlots,
      class: { "p-invalid": this.hasError },
      on: this.$listeners
    });
  }
}
