<template>
  <div class="p-grid">
    <div class="p-col">
      <Card>
        <template #title> Dropdown </template>
        <template #content>
          <Dropdown
            v-model="value"
            :options="cities"
            :label="label"
            :disabled="disabled"
            :showClear="showClear"
            :filter="filter"
            :scrollHeight="scrollHeight + 'px'"
            :error="error"
            :hint="hint"
            optionLabel="name"
            placeholder="Select city"
            filterPlaceholder="Find city"
          ></Dropdown>

          <Dropdown
            v-if="activeSlots"
            v-model="value"
            :options="cities"
            :disabled="disabled"
            :showClear="showClear"
            :filter="filter"
            :error="error"
            :hint="hint"
            label="City with slots"
            optionLabel="name"
            placeholder="Select city"
          >
            <template #value="slotProps">
              <div class="country-item country-item-value" v-if="slotProps.value">
                <div><i class="pi pi-check"></i> {{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <div><i class="pi pi-star"></i> {{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
          <div>Selected value: {{ value }}</div>
        </template>
      </Card>
    </div>
    <div class="p-col">
      <Card>
        <template #title> Options </template>
        <template #content>
          <input-options :label.sync="label" :hint.sync="hint" :error.sync="error"></input-options>
          <check-box v-model="disabled" label="Disabled" />
          <check-box v-model="showClear" label="Clearable" />
          <check-box v-model="activeSlots" label="Active slots" />
          <check-box v-model="filter" label="Filter" />
          <hr />
          <InputText v-model="scrollHeight" label="Scroll height, px" placeholder="Enter a number"></InputText>
        </template>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CheckBox from "@/components/Checkbox.ts";
import InputOptions from "@/components/auxiliary/InputOptions.vue";

@Component({
  components: {
    CheckBox,
    InputOptions
  }
})
export default class DropdownDemo extends Vue {
  value = {};
  disabled = false;
  cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" }
  ];
  label = "City";
  showClear = false;
  activeSlots = false;
  filter = false;
  scrollHeight = "";
  error = "";
  hint = "";
}
</script>
