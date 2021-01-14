import RadioButton from "primevue/components/radiobutton/RadioButton";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
  model: {
    prop: "modelValue",
    event: "input"
  }
})
export default class WrappedRadioButton extends Vue {
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
    const radioButton = this.$createElement(RadioButton, {
      props: {
        modelValue: this.modelValue
      },
      attrs: { id: this.innerId, ...this.$attrs },
      on: this.$listeners
    });

    return this.$createElement(
      "div",
      {
        class: "p-field-radiobutton"
      },
      [radioButton, label]
    );
  }
}
