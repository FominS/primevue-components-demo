
import PrimeInput from "primevue/components/inputtext/InputText.vue";
import { CreateElement, VNode } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";

declare module "vue/types/vue" {
  interface Vue {
    _uid: number;
  }
}

type ButtonSize = "small" | "normal" | "large"

@Component({ components: { PrimeInput } })
export default class InputText extends Vue {
  @Prop({ required: true })
  readonly value!: string;

  @Prop({ required: false })
  readonly label?: string;

  @Prop({ required: false })
  readonly error?: string;

  @Prop({ required: false, default: "normal" })
  readonly size!: ButtonSize;

  @Prop({ required: false })
  readonly prependIcon?: string;

  @Prop({ required: false })
  readonly appendIcon?: string;

  id: string = "input_" + this._uid;

  render(h: CreateElement) {
    this.$attrs.id = this.id;
    const childs = [];

    if (this.label) {
      childs.push(this.createLabel(h));
    }

    const inputText = this.createTextInput(h);
    this.prependIcon || this.appendIcon ? childs.push(this.createInputWithIcon(h, inputText)) : childs.push(inputText);

    if (this.error) {
      childs.push(this.createErrorMesage(h));
    }
    return h("div", { class: "p-field p-fluid" }, childs);
  }

  /* computed */
  get classList(){
    const classList = [];
    this.error && classList.push("p-invalid");
    this.size === "large" && classList.push("p-inputtext-lg");
    this.size === "small" && classList.push("p-inputtext-sm");
    return classList;
  }

  /* methods */
  changeValue(newValue: string) {
    this.$emit("input", newValue);
  }

  focus(event: Event) {
    this.$emit("focus", event);
  }

  blur(event: Event) {
    this.$emit("blur", event);
  }

  click(event: Event){
    this.$emit('click', event)
  }

  createTextInput(h: CreateElement) {
    return h("PrimeInput", {
      props: { value: this.value },
      attrs: this.$attrs,
      class: this.classList,
      on: {
        input: this.changeValue,
        focus: this.focus,
        blur: this.blur,
        click: this.click
      }
    });
  }

  createInputWithIcon(h: CreateElement, input: VNode) {
    return h("span", { class: { "p-input-icon-left": this.prependIcon, "p-input-icon-right": this.appendIcon } }, [
      this.createIcon(h),
      input
    ]);
  }

  createLabel(h: CreateElement) {
    return h("label", { attrs: { for: this.id } }, this.label);
  }

  createIcon(h: CreateElement) {
    return h("i", { class: [this.prependIcon, this.appendIcon] });
  }

  createErrorMesage(h: CreateElement) {
    return h("small", { class: "p-invalid", attrs: { id: this.id + "_help" } }, this.error);
  }
}
