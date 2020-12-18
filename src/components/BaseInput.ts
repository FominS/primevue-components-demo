import { VNode, Component } from "vue";
import { ScopedSlot } from "vue/types/vnode";
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

  private get prependSlot(): VNode[] | undefined {
    if (this.$scopedSlots.rootPrepend) {
      return this.$scopedSlots.rootPrepend({});
    }
    return undefined;
  }

  private get appendSlot(): VNode[] | undefined {
    if (this.$scopedSlots.rootAppend) {
      return this.$scopedSlots.rootAppend({});
    }
    return undefined;
  }

  protected get inputScopedSlots() {
    const result: Record<string, ScopedSlot | undefined> = {};
    return Object.keys(this.$scopedSlots).reduce((slots, slotName) => {
      if (["rootPrepend", "rootAppend"].includes(slotName)) return slots;

      slots[slotName] = this.$scopedSlots[slotName];
      return slots;
    }, result);
  }

  protected getChildren(input: Component): VNode[] {
    const children: VNode[] = [];

    this.label && children.push(this.createLabel());
    this.prependSlot && children.push(...this.prependSlot);
    children.push(this.createInput(input));
    this.appendSlot && children.push(...this.appendSlot);
    this.error && children.push(this.createErrorMesage());

    return children;
  }

  private createLabel() {
    return this.$createElement(
      "label",
      {
        style: {
          display: "block"
        },
        attrs: {
          for: this.innerId,
          class: "p-mb-1"
        }
      },
      this.label
    );
  }

  private createErrorMesage() {
    return this.$createElement(
      "small",
      {
        style: {
          display: "block"
        },
        class: "p-invalid"
      },
      this.error
    );
  }

  protected createInput(input: Component) {
    return this.$createElement(input, {
      props: { value: this.value },
      style: {
        width: "100%"
      },
      attrs: {
        ...this.$attrs,
        id: this.innerId
      },
      on: this.$listeners,
      scopedSlots: this.inputScopedSlots
    });
  }
}
