<template>
  <div class="p-grid">
    <div class="p-col">
      <Card>
        <template #title> Textarea </template>
        <template #content>
          <text-area v-model="value" v-bind="attrs"> </text-area>
        </template>
      </Card>
    </div>
    <div class="p-col">
      <Card>
        <template #title> Options </template>
        <template #content>
          <input-options :label.sync="label" :error.sync="error" :hint.sync="hint"></input-options>
          <InputText v-model="placeholder" label="Placeholder"></InputText>
          <InputText v-model="rows" label="Rows QTY"></InputText>
          <check-box v-model="autoResize" label="Autosize"></check-box>
          <check-box v-model="readonly" label="Readonly"></check-box>
          <check-box v-model="disabled" label="Disabled"></check-box>
        </template>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Checkbox from "@/components/Checkbox.ts";
import InputOptions from "@/components/auxiliary/InputOptions.vue";

@Component({
  components: {
    InputOptions,
    "check-box": Checkbox
  }
})
export default class TextareaDemo extends Vue {
  value: string | null = null;
  rows: number | null = null;
  placeholder: string | null = null;
  label: string | null = null;
  error: string | null = null;
  hint: string | null = null;
  autoResize = false;
  readonly = false;
  disabled = false;

  get attrs() {
    return {
      rows: Number(this.rows) | 10,
      placeholder: this.placeholder,
      label: this.label,
      error: this.error,
      hint: this.hint,
      autoResize: this.autoResize,
      readonly: this.readonly,
      disabled: this.disabled
    };
  }
}
</script>
