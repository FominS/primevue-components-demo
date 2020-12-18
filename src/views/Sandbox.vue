<template>
  <div>
    <h1>test</h1>
    <drop-down v-model="value" :options="cities" optionLabel="name" label="Countries" id="sergeev" inputId="sergeev">
      <template #rootPrepend>
        <h6>This is a root prepend slot</h6>
      </template>
      <template #option="{ option }">
        <i class="pi pi-star"> {{ `${option.name} (${option.code})` }}</i>
      </template>
    </drop-down>
  </div>
</template>

<script lang="ts">
import { Component as ComponentType } from "vue";
import { Component, Vue } from "vue-property-decorator";
import PrimeDropdown from "primevue/components/dropdown/Dropdown";
import BaseInput from "@/components/BaseInput";

@Component({
  inheritAttrs: false
})
class CustomDropdown extends BaseInput<{ name: string; code: string }> {
  protected createInput(input: ComponentType) {
    return this.$createElement(input, {
      props: {
        value: this.value,
        // inputId: this.innerId
      },
      attrs: {
        ...this.$attrs
      },
      on: this.$listeners,
      scopedSlots: this.inputScopedSlots
    });
  }

  render() {
    return this.$createElement("div", this.getChildren(PrimeDropdown));
  }
}

@Component({
  components: {
    "drop-down": CustomDropdown
  }
})
export default class Sandbox extends Vue {
  cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" }
  ];
  value = {};
}
</script>

<style scoped>
</style>