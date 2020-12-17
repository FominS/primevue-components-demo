<template>
  <div class="p-grid">
    <div class="p-col">
      <Card>
        <template #title> Textarea </template>
        <template #content>
          <text-area v-model="value" v-bind="attrs" :class="getClass()">
            <template #rootPrepend v-if="prependSlot">
              <i class="pi pi-search" />
            </template>
            <template #rootAppend v-if="appendSlot">
              <i class="pi pi-spin pi-spinner" />
            </template>
          </text-area>
        </template>
      </Card>
    </div>
    <div class="p-col">
      <Card>
        <template #title> Options </template>
        <template #content>
          <InputText v-model="label" label="Подпись"></InputText>
          <InputText v-model="rows" label="Кол-во строк"></InputText>
          <InputText v-model="placeholder" label="Плейсхолдер"></InputText>
          <InputText v-model="error" label="Текст ошибки"></InputText>
          <check-box v-model="autoResize" id="autoresize-checkbox" label="Авторазмер"></check-box>
          <check-box v-model="readonly" id="readonly-checkbox" label="Только для чтения"></check-box>
          <check-box v-model="disabled" id="disabled-checkbox" label="Заблокированно"></check-box>
          <check-box v-model="prependSlot" id="prepend-slot-checkbox" label="Иконка слева"></check-box>
          <check-box v-model="appendSlot" id="append-slot-checkbox" label="Иконка справа"></check-box>
        </template>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Checkbox from "primevue/components/checkbox/Checkbox";

const checkbox = Vue.extend({
  props: {
    id: String,
    label: String,
    value: Boolean
  },
  render(h) {
    const label = h("label", { attrs: { for: this.id } }, this.label);
    const checkbox = h(Checkbox, {
      props: {
        binary: true,
        value: this.value,
        modelValue: this.value
      },
      attrs: { id: this.id, ...this.$attrs },
      on: this.$listeners
    });
    return h(
      "div",
      {
        class: "p-field-checkbox"
      },
      [checkbox, label]
    );
  }
});

@Component({
  components: {
    "check-box": checkbox
  }
})
export default class TextareaDemo extends Vue {
  value: string | null = null;
  rows: number | null = null;
  placeholder: string | null = null;
  label: string | null = null;
  error: string | null = null;
  autoResize = false;
  readonly = false;
  disabled = false;
  prependSlot = false;
  appendSlot = false;

  get attrs() {
    return {
      rows: Number(this.rows) | 10,
      placeholder: this.placeholder,
      label: this.label,
      error: this.error,
      autoResize: this.autoResize,
      readonly: this.readonly,
      disabled: this.disabled
    };
  }

  getClass() {
    return {
      "p-input-icon-right": this.appendSlot,
      "p-input-icon-left": this.prependSlot
    }
  }
}
</script>
