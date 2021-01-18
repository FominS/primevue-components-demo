import PrimeInput from "primevue/inputtext";
import { Component, Prop } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";

type ButtonSize = "small" | "normal" | "large";

@Component({ inheritAttrs: false })
export default class InputText extends BaseInput {
  @Prop({ required: false, default: "normal", type: String })
  readonly size!: ButtonSize;

  @Prop({ required: false, type: String })
  readonly prependIcon?: string;

  @Prop({ required: false, type: String })
  readonly appendIcon?: string;

  get classList() {
    return {
      "p-invalid": this.hasError,
      "p-inputtext-lg": this.size === "large",
      "p-inputtext-sm": this.size === "small"
    };
  }

  get hasPrependIcon() {
    return this.prependIcon != undefined;
  }

  get hasAppendIcon() {
    return this.appendIcon != undefined;
  }

  get hasIcon() {
    return this.hasAppendIcon || this.hasPrependIcon;
  }

  createInput() {
    return this.hasIcon ? this.createInputWithIcon() : this.createTextInput();
  }

  createTextInput() {
    return this.$createElement(PrimeInput, {
      props: { value: this.value },
      attrs: {
        id: this.innerId,
        ...this.$attrs
      },
      class: this.classList,
      on: this.$listeners
    });
  }

  createInputWithIcon() {
    return this.$createElement(
      "span",
      { class: { "p-input-icon-left": this.hasPrependIcon, "p-input-icon-right": this.hasAppendIcon } },
      [this.createIcon(this.prependIcon), this.createTextInput(), this.createIcon(this.appendIcon)]
    );
  }

  createIcon(iconClass?: string) {
    if (!iconClass) return null;
    return this.$createElement("i", { staticClass: iconClass });
  }
}
