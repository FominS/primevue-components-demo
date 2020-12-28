<template>
  <div class="p-grid">
    <div class="p-col-4">
      <Card>
        <template #title>Base input example</template>
        <template #content>
          <InputWrapper v-slot="{ bindings }" label="Without margin">
            <PrimeInputText v-bind="bindings" v-model="inputTextValue" />
          </InputWrapper>

          <InputWrapper
            v-slot="{ bindings }"
            label="With margin"
            class="p-field p-fluid"
          >
            <PrimeInputText v-bind="bindings" v-model="inputTextValue" />
          </InputWrapper>

          <InputWrapper
            v-slot="{ bindings }"
            label="With custom class for inner primevue input"
            error="Error"
          >
            <PrimeInputText
              v-bind="bindings"
              v-model="inputTextValue"
              class="custom-class"
            />
          </InputWrapper>
        </template>
      </Card>
    </div>

    <div class="p-col-8">
      <Card>
        <template #title>Advanced input example</template>
        <template #content>
          <InputWrapper
            v-slot="{ bindings }"
            :label="inputTextLabel"
            :error="inputTextError"
            :hint="inputTextHint"
          >
            <span :class="{ 'p-input-icon-left': inputTextLeftIcon }">
              <i v-if="inputTextLeftIcon" class="pi pi-search"></i>
              <PrimeInputText v-bind="bindings" v-model="inputTextValue" />
            </span>
          </InputWrapper>

          <div class="p-grid p-mt-3">
            <div class="p-col-3">
              <InputWrapper v-slot="{ bindings }" class="p-fluid" label="Label">
                <PrimeInputText
                  v-bind="bindings"
                  v-model="inputTextLabel"
                ></PrimeInputText>
              </InputWrapper>
            </div>
            <div class="p-col-3">
              <InputWrapper v-slot="{ bindings }" class="p-fluid" label="Error">
                <PrimeInputText
                  v-bind="bindings"
                  v-model="inputTextError"
                ></PrimeInputText>
              </InputWrapper>
            </div>
            <div class="p-col-3">
              <InputWrapper v-slot="{ bindings }" class="p-fluid" label="Hint">
                <PrimeInputText
                  v-bind="bindings"
                  v-model="inputTextHint"
                ></PrimeInputText>
              </InputWrapper>
            </div>
            <div class="p-col-3 p-mt-auto">
              <CbrCheckbox
                v-model="inputTextLeftIcon"
                id="input-text-left-icon"
                label="Icon"
              ></CbrCheckbox>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div class="p-col">
      <Card>
        <template #title>Dropdown</template>
        <template #content>
          <InputWrapper
            v-slot="{ bindings }"
            label="Dropdown"
            id-prop="inputId"
          >
            <PrimeDropdown v-bind="bindings"></PrimeDropdown>
          </InputWrapper>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import type { VNode } from "vue";
import { Vue, Prop, Component } from "vue-property-decorator";
import PrimeInputText from "primevue/inputtext";
import PrimeDropdown from "primevue/dropdown";
import { CbrCheckbox } from "@/views/TextareaDemo.vue";

@Component
export class InputWrapper extends Vue {
  @Prop({ required: false, type: String })
  readonly label?: string;

  @Prop({ required: false, type: String })
  readonly id?: string;

  @Prop({ required: false, type: String })
  readonly error?: string;

  @Prop({ required: false, type: String })
  readonly hint?: string;

  @Prop({ required: false, default: () => "id", type: String })
  readonly idProp!: string;

  private getInnerId() {
    return this.id || `cbr_input_${this._uid}`;
  }

  private getInnerInputClass() {
    return { "p-invalid": this.error };
  }

  private getBindings() {
    return {
      class: this.getInnerInputClass(),
      [this.idProp]: this.getInnerId()
    };
  }

  private getChildren(): VNode[] {
    const children: VNode[] = [];
    this.label && children.push(this.createLabel());

    if (this.$scopedSlots.default) {
      const nodes = this.$scopedSlots.default({ bindings: this.getBindings() });
      nodes?.forEach(node => children.push(node));
    }

    this.hint && children.push(this.createHint());
    this.error && children.push(this.createErrorMesage());

    return children;
  }

  private createLabel() {
    return this.$createElement(
      "label",
      {
        attrs: {
          for: this.getInnerId()
        },
        class: "p-mb-2",
        style: {
          display: "block"
        }
      },
      this.label
    );
  }

  private createErrorMesage() {
    return this.$createElement(
      "small",
      {
        class: "p-invalid",
        style: {
          display: "block"
        }
      },
      this.error
    );
  }

  private createHint() {
    return this.$createElement(
      "small",
      {
        style: {
          display: "block"
        }
      },
      this.hint
    );
  }

  render() {
    return this.$createElement("div", this.getChildren());
  }
}

export default {
  components: {
    InputWrapper,
    PrimeInputText,
    CbrCheckbox,
    PrimeDropdown
  },
  data() {
    return {
      inputTextValue: "some value",
      inputTextLabel: "Input label",
      inputTextError: "Some error",
      inputTextHint: "This is a hint",
      inputTextLeftIcon: true
    };
  }
};
</script>

<style lang="scss" scoped>
.custom-class {
  color: red;
}
</style>