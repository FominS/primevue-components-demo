<template>
  <div class="p-field p-fluid">
    <label v-if="label" :for="id">{{ label }}</label>
    <PrimeDropdown
      :id="id"
      :value="value"
      v-bind="$attrs"
      :class="{ 'p-invalid': error }"
      v-on="$listeners"
    >
      <template #value="slotProps">
        <slot name="value" :value="slotProps.value" :placeholder="slotProps.placeholder"></slot>
      </template>
      <template #option="slotProps">
        <slot name="option" :option="slotProps.option" :index="slotProps.i"></slot>
      </template>
    </PrimeDropdown>
    <small v-if="error" :id="id + '_help'" class="p-invalid">{{ error }}</small>
  </div>
</template>
<script lang="ts">
import PrimeDropdown from "primevue/components/dropdown/Dropdown.vue";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ components: { PrimeDropdown } })
export default class Dropdown extends Vue {
  @Prop({ required: true })
  readonly value!: string | object;

  @Prop({ required: false })
  readonly label?: string;

  @Prop({ required: false })
  readonly error?: string;

  id: string = "dropdown_" + this._uid;

  get classList() {
    const classList = [];
    this.error && classList.push("p-invalid");
    return classList;
  }  
}
</script>
