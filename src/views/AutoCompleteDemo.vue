<template>
  <input-demo :value="value" :tested-events.sync="testedEvents" title="Autocomplete">
    <template #component>
      <auto-complete
        v-model="value"
        v-bind="attrs"
        @complete="searchCountry"
        @item-select="itemSelect"
        @item-unselect="itemUnselect"
        @dropdown-click="dropdownClick"
        @clear="clear"
      >
      </auto-complete>
    </template>
    <template #options>
      <input-options :label.sync="label" :error.sync="error" :hint.sync="hint"></input-options>
      <input-wrapper v-slot="{ b }" class="p-field p-fluid" label="Scroll height, px">
        <input-number v-bind="b" v-model="scrollHeight"></input-number>
      </input-wrapper>
      <input-wrapper v-slot="{ b }" class="p-field p-fluid" label="Number of characters to initiate a search">
        <input-number v-bind="b" v-model="minLength"></input-number>
      </input-wrapper>
      <input-wrapper
        v-slot="{ b }"
        class="p-field p-fluid"
        label="Delay between keystrokes to wait before sending a query, ms"
      >
        <input-number v-bind="b" v-model="delay"></input-number>
      </input-wrapper>
      <check-box v-model="multiple" @click="resetValue" label="Multiple values"></check-box>
      <panel header="Dropdown mode">
        <check-box v-model="dropdown" label="Dropdown button"></check-box>
        <template v-if="dropdown">
          <wrapped-radio-button
            v-for="(value, key) in dropdownModeKeys"
            v-model="dropdownMode"
            :value="value"
            :key="key"
            :label="key"
            name="dropdownMode"
          ></wrapped-radio-button>
        </template>
      </panel>
      <panel class="p-mt-2" header="Property name or function of a suggested object to display">
        <wrapped-radio-button
          v-for="(value, key) in fieldKeys"
          v-model="field"
          :value="value"
          :key="key"
          :label="key"
          name="field"
        ></wrapped-radio-button>
      </panel>
    </template>
  </input-demo>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Checkbox, WrappedRadioButton } from "@/components";
import { InputOptions, Demo } from "@/components/auxiliary";

enum DropdownMode {
  blank = "blank",
  current = "current"
}

enum Field {
  name = "name",
  code = "code"
}

type Country = Record<keyof typeof Field, string>;

@Component({
  components: {
    WrappedRadioButton,
    InputOptions,
    "check-box": Checkbox,
    "input-demo": Demo
  }
})
export default class AutoCompleteDemo extends Vue {
  label = "";
  error = "";
  hint = "";
  value: Country | null = null;
  field: Field = Field.name;
  fieldKeys = {
    Name: Field.name,
    Code: Field.code,
    "Getter name + code": (item: Country) => `${item.name} (${item.code})`
  };
  scrollHeight = 200;
  dropdown = false;
  dropdownMode: DropdownMode = DropdownMode.blank;
  dropdownModeKeys = {
    "Blank - sends an empty string on opening": DropdownMode.blank,
    "Current - sends the input value on opening": DropdownMode.current
  };
  multiple = false;
  minLength = 1;
  delay = 300;
  ariaLabelledBy = "";
  appendTo = "";
  countries: Country[] = [
    { name: "Afghanistan", code: "AF" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "Andorra", code: "AD" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Brunei Darussalam", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cook Islands", code: "CK" },
    { name: "Costa Rica", code: "CR" },
    { name: 'Cote D"Ivoire', code: "CI" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "French Southern Territories", code: "TF" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Holy See (Vatican City State)", code: "VA" },
    { name: "Honduras", code: "HN" },
    { name: "Isle of Man", code: "IM" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: 'Korea, Democratic People"S Republic of', code: "KP" },
    { name: "Korea, Republic of", code: "KR" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Macao", code: "MO" },
    { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Vanuatu", code: "VU" },
    { name: "Venezuela", code: "VE" },
    { name: "Viet Nam", code: "VN" },
    { name: "Virgin Islands, British", code: "VG" },
    { name: "Virgin Islands, U.S.", code: "VI" },
    { name: "Wallis and Futuna", code: "WF" },
    { name: "Western Sahara", code: "EH" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" }
  ];
  suggestions: Country[] = [];
  testedEvents = {
    complete: false,
    itemSelect: false,
    itemUnselect: false,
    dropdownClick: false,
    clear: false
  };

  get attrs() {
    return {
      label: this.label,
      hint: this.hint,
      error: this.error,
      suggestions: this.suggestions,
      field: this.field,
      scrollHeight: this.scrollHeight + "px",
      dropdown: this.dropdown,
      dropdownMode: this.dropdownMode,
      multiple: this.multiple,
      minLength: this.minLength,
      delay: this.delay,
      ariaLabelledBy: this.ariaLabelledBy,
      appendTo: this.appendTo
    };
  }

  created() {
    this.suggestions = this.countries;
  }

  resetValue() {
    this.value = null;
  }

  searchCountry({ query }: { query: string }) {
    this.testedEvents.complete = true;

    const fQuery = query.toLowerCase().trim();
    setTimeout(() => {
      this.suggestions = this.countries.filter(item => {
        return item.name.toLowerCase().includes(fQuery);
      });
    }, 1000);
  }

  itemSelect() {
    this.testedEvents.itemSelect = true;
  }

  itemUnselect() {
    this.testedEvents.itemUnselect = true;
  }

  dropdownClick() {
    this.testedEvents.dropdownClick = true;
  }

  clear() {
    this.testedEvents.clear = true;
  }
}
</script>
