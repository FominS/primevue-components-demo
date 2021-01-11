<template>
  <div class="p-grid">
    <div class="p-col">
      <Card>
        <template #title> Dropdown </template>
        <template #content>
          <Dropdown
            v-model="value"
            :options="cities"
            :label="showLabel ? 'City' : ''"
            optionLabel="name"
            placeholder="Select city"
            :disabled="disabled"
            :showClear="showClear"
            :filter="filter"
            :scrollHeight="scrollHeight"
            filterPlaceholder="Find city"
          ></Dropdown>

          <Dropdown
            v-model="value"
            :options="cities"
            :label="showLabel ? 'City with slots' : ''"
            optionLabel="name"
            placeholder="Select city"
            :disabled="disabled"
            :showClear="showClear"
            v-if="activeSlots"
            :filter="filter"
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
          <check-box v-model="showLabel" label="Label" />
          <check-box v-model="disabled" label="Disabled" />
          <check-box v-model="showClear" label="Clearable" />
          <check-box v-model="activeSlots" label="Active slots" />
          <check-box v-model="filter" label="Filter" />
          <hr />
          <InputText v-model="scrollHeight" label="Scroll height"></InputText>
        </template>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CheckBox from "@/components/Checkbox.ts";

@Component({
  components: {
    CheckBox
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
  showLabel = true;
  showClear = false;
  activeSlots = false;
  filter = false;
  scrollHeight = "";
}
</script>
