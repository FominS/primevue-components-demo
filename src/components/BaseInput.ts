import { VNode } from "vue";
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class BaseInput extends Vue {
  @Prop({ required: false })
  readonly value?: any;

  @Prop({ required: false })
  readonly label?: string;

  @Prop({ required: false })
  readonly error?: string;

  @Prop({ required: false })
  readonly hint?: string;

  protected get innerId() {
    return this.$attrs.id || `cbr_input_${this._uid}`;
  }

  protected get hasError() {
    return !!this.error;
  }

  render() {
    return this.$createElement(
      "div",
      {
        staticClass: "p-field p-fluid"
      },
      [this.createLabel(), this.createInput(), this.createHint(), this.createErrorMesage()]
    );
  }

  createInput(): VNode[] | VNode | undefined {
    return this.$slots.default;
  }

  private createLabel() {
    if (!this.label) return null;
    return this.$createElement(
      "label",
      {
        attrs: {
          for: this.innerId
        }
      },
      this.label
    );
  }

  private createErrorMesage() {
    if (!this.hasError) return null;
    return this.$createElement(
      "small",
      {
        staticClass: "p-invalid"
      },
      this.error
    );
  }

  private createHint() {
    if (!this.hint) return null;
    return this.$createElement(
      "small",
      {
        staticClass: "p-field__hint"
      },
      this.hint
    );
  }
}
