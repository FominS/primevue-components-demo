import Checkbox from "primevue/components/checkbox/Checkbox";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({ inheritAttrs: false })
export default class CbrCheckbox extends Vue {
  @Prop() id?: string;
  @Prop() label?: string;
  @Prop() value?: boolean;

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
        value: this.value,
        modelValue: this.value
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
