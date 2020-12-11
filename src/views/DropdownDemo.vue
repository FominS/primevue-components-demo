<template>
  <div class="p-grid">
    <div class="p-col">
      <Card>
        <template #title>
          Dropdown
        </template>
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
        <template #title>
          Options
        </template>
        <template #content>
          <div class="p-field-checkbox">
            <Checkbox id="label" v-model="showLabel" :binary="true" />
            <label for="label">Label</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="disabled" v-model="disabled" :binary="true" />
            <label for="disabled">Disabled</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="disabled" v-model="showClear" :binary="true" />
            <label for="disabled">Clearable</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="slots" v-model="activeSlots" :binary="true" />
            <label for="slots">Active slots</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="filter" v-model="filter" :binary="true" />
            <label for="filter">Filter</label>
          </div>
          <hr />
          <InputText v-model="scrollHeight" label="Scroll height"></InputText>
        </template>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
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
