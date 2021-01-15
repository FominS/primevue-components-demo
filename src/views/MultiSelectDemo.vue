<template>
  <input-demo :value="value" :tested-events.sync="testedEvents" title="Multiselect">
    <template #component>
      <multi-select
        v-model="value"
        :label="label"
        :error="error"
        :hint="hint"
        :options="countries"
        :option-label="optionLabel"
        :option-value="optionValue"
        :option-disabled="optionDisabled"
        :scroll-height="scrollHeight + 'px'"
        :placeholder="placeholder"
        :disabled="disabled"
        @change="testEvent('change')"
        @input="testEvent('input')"
        @beforeShow="testEvent('beforeShow')"
        @beforeHide="testEvent('beforeHide')"
        @show="testEvent('show')"
        @hide="testEvent('hide')"
        @filter="testEvent('filter')"
        autofocus
      ></multi-select>
    </template>
    <template #options>
      <div class="p-grid">
        <div class="p-col-4">
          <input-options :label.sync="label" :error.sync="error" :hint.sync="hint"></input-options>
          <input-wrapper v-slot="{ b }" class="p-field p-fluid" label="Scroll height, px">
            <input-number v-bind="b" v-model="scrollHeight"></input-number>
          </input-wrapper>
          <input-text v-model="placeholder" label="Placeholder"></input-text>
          <check-box v-model="disabled" label="Disabled"></check-box>
        </div>
        <div class="p-col-4">
          <panel header="Property name or function as the label of an option">
            <wrapped-radio-button
              v-for="(value, key) in optionLabelKeys"
              v-model="optionLabel"
              :value="value"
              :key="key"
              :label="key"
            ></wrapped-radio-button>
          </panel>
          <panel class="p-mt-2" header="Property name or getter function as the value of an option">
            <check-box v-model="useOptionValue" @change="onUseOptionValueChange" label="Use option value"></check-box>
            <template v-if="useOptionValue">
              <wrapped-radio-button
                v-for="(value, key) in optionLabelKeys"
                v-model="optionValue"
                :value="value"
                :key="key"
                :label="key"
                @change="resetValue"
              ></wrapped-radio-button>
            </template>
          </panel>
        </div>
        <div class="p-col-4">
          <panel header="Property name or getter function as the disabled flag of an option">
            <wrapped-radio-button
              v-for="(value, key) in optionDisabledKeys"
              v-model="optionDisabled"
              :value="value"
              :key="key"
              :label="key"
            ></wrapped-radio-button>
          </panel>
        </div>
      </div>
    </template>
  </input-demo>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Checkbox, WrappedRadioButton } from "@/components";
import { InputOptions, Demo } from "@/components/auxiliary";

enum InputEvents {
  change,
  input,
  beforeShow,
  beforeHide,
  show,
  hide,
  filter
}

interface Country {
  name: string;
  code: string;
  number?: number;
}

const itemGetter = (item: Country) => `${item.name} (${item.code})`;

@Component({
  components: {
    WrappedRadioButton,
    InputOptions,
    "check-box": Checkbox,
    "input-demo": Demo
  }
})
export default class MultiSelectDemo extends Vue {
  label = "Label";
  error = "";
  hint = "";
  value: unknown = null;
  testedEvents: Record<keyof typeof InputEvents, boolean> = {
    change: false,
    input: false,
    beforeShow: false,
    beforeHide: false,
    show: false,
    hide: false,
    filter: false
  };
  countries: Country[] = [
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "Russia", code: "RU", number: 7 }
  ];
  optionLabel = "name";
  optionLabelKeys = {
    Name: "name",
    Code: "code",
    "Getter name + code": itemGetter
  };
  optionValue: string | null = null;
  useOptionValue = false;
  optionDisabled: string | boolean = false;
  optionDisabledKeys = {
    Number: "number",
    Function: (item: Country) => item.name === "Egypt",
    "Don't use": false
  };
  scrollHeight = 200;
  placeholder: string | null = null;
  disabled = false;

  testEvent(type: keyof typeof InputEvents) {
    this.testedEvents[type] = true;
  }

  resetValue() {
    this.value = null;
  }

  onUseOptionValueChange() {
    this.resetValue();
    this.optionValue = this.useOptionValue ? "name" : null;
  }
}
</script>