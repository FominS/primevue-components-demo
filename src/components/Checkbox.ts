import Checkbox from "primevue/checkbox";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
  model: {
    prop: "modelValue",
    event: "input"
  }
})
export default class WrappedCheckbox extends Vue {
  @Prop() id?: string;
  @Prop() label?: string;
  @Prop() modelValue?: boolean;

  get innerId() {
    return this.id || `custom_input_${this._uid}`;
  }

  render() {
    const label = this.$createElement(
      "label",
      {
        attrs: { for: this.innerId },
        style: {
          cursor: "pointer"
        }
      },
      this.label
    );
    const checkbox = this.$createElement(Checkbox, {
      props: {
        binary: true,
        modelValue: this.modelValue
      },
      attrs: { id: this.innerId, ...this.$attrs },
      on: this.$listeners
    });

    return this.$createElement(
      "div",
      {
        class: "p-field-checkbox"
      },
      [checkbox, label]
    );
  }
}
