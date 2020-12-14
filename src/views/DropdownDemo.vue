<template>
  <div class="p-grid">
    <div class="p-col">
      <Card>
        <template #title>
          Dropdown
        </template>
        <template #content>
          <Dropdown
            v-model="city"
            :options="cities"
            :label="showLabel ? 'City' : ''"
            optionLabel="name"
            :optionValue="!isObject ? 'code' : ''"
            placeholder="Select city"
            :disabled="disabled"
            :showClear="showClear"
            :filter="filter"
            :scrollHeight="scrollHeight"
            filterPlaceholder="Find city"
            :error="cityError"
            @change="change"
            @filter="filtered"
            @before-show="beforeShow"
            @before-hide="beforeHide"
            @show="show"
            @hide="hide"
          ></Dropdown>

          <Dropdown
            v-model="city"
            :options="cities"
            :label="showLabel ? 'City with slots' : ''"
            optionLabel="name"
            :optionValue="!isObject ? 'code' : ''"
            optionDisabled="true"
            placeholder="Select city"
            :disabled="disabled"
            :showClear="showClear"
            v-if="activeSlots"
            :filter="filter"
            :error="cityError"
          >
            <template #value="slotProps">
              <div class="country-item country-item-value" v-if="slotProps.value">
                <div><i class="pi pi-check"></i> {{ isObject ? slotProps.value.name : slotProps.value }}</div>
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
          <div>Selected value: {{ city }}</div>
          <div>
            <h3>Events</h3>
            <Textarea :autoResize="true" v-model="events"></Textarea>
          </div>
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
          <div class="p-field-checkbox">
            <Checkbox id="filter" v-model="isObject" :binary="true" />
            <label for="filter">Value is object</label>
          </div>
          <hr />
          <InputText v-model="scrollHeight" label="Scroll height"></InputText>
          <hr />
          <div class="p-field">
            <Button @click="$v.$touch()">Проверить валидацию</Button>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    city: { required }
  }
})
export default class DropdownDemo extends Vue {
  city = null;
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
  isObject = true;
  scrollHeight = "";
  events="";

  get cityError() {
    let error = "";
    if (!this.$v.city.$dirty) return error;
    !this.$v.city.required && (error = "Обязательно выберите город");
    return error;
  }

  change() {
    this.events += "change \n";
    console.info("%c change ", "color: green");
  }
  filtered() {
    this.events += "filter \n";
    console.info("%c filter", "color: red");
  }
  show() {
    this.events += "show \n";
    console.info("%c show", "color: yellow");
  }
  hide() {
    this.events += "hide \n";
    console.info("%c hide", "color: blue");
  }
  beforeShow() {
    this.events += "beforeShow \n";
    console.info("%c beforeShow", "color: gray");
  }
  beforeHide() {
    this.events += "beforeHide \n";
    console.info("%c beforeHide", "color: purple");
  }
}
</script>
