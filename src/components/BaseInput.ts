import { VNodeData, VNode } from "vue";
import { Vue, Prop } from "vue-property-decorator";

export default abstract class BaseInput<T> extends Vue {
  @Prop({ required: false })
  readonly value!: T;

  @Prop({ required: false })
  readonly label!: string;

  @Prop({ required: false })
  readonly id!: string;

  @Prop({ required: false })
  readonly error?: string;

  protected get innerId() {
    return this.id || `cbr_input_${this._uid}`;
  }

  protected get wrapperOptions(): VNodeData {
    return {
      style: "display: flex; flex-direction: column"
    };
  }

  protected get children(): VNode[] {
    const children: VNode[] = [];

    this.label && children.push(this.createLabel());
    children.push(this.createInput());
    this.error && children.push(this.createErrorMesage());

    return children;
  }

  protected createLabel() {
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

  protected createErrorMesage() {
    return this.$createElement(
      "small",
      {
        class: "p-invalid"
      },
      this.error
    );
  }

  abstract createInput(): VNode;
}
