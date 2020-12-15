import PrimeTextarea from "primevue/components/textarea/Textarea";
import { VNodeData, VNode } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
export default class Textarea extends Vue {
  @Prop({ required: false })
  readonly value!: string;

  @Prop({ required: false })
  readonly label!: string;

  @Prop({ required: false })
  readonly id!: string;

  @Prop({ required: false })
  readonly error?: string;

  get innerId() {
    return this.id || `textarea_${this._uid}`;
  }

  get wrapperOptions(): VNodeData {
    return {
      style: "display: flex; flex-direction: column"
    };
  }

  get children(): VNode[] {
    const children: VNode[] = [];

    this.label && children.push(this.createLabel());
    children.push(this.createTextArea());
    this.error && children.push(this.createErrorMesage());

    return children;
  }

  private createLabel() {
    return this.$createElement(
      "label",
      {
        attrs: {
          for: this.innerId,
          class: "p-mb-1"
        }
      },
      this.label
    );
  }

  private createTextArea() {
    return this.$createElement(PrimeTextarea, {
      props: { value: this.value },
      attrs: {
        ...this.$attrs,
        id: this.innerId
      },
      on: this.$listeners
    });
  }

  createErrorMesage() {
    return this.$createElement(
      "small",
      {
        class: "p-invalid"
      },
      this.error
    );
  }

  render() {
    return this.$createElement("div", this.wrapperOptions, this.children);
  }
}
