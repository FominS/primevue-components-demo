<template>
  <div id="app">
    <Card class="p-mx-3">
      <template #content>
        <!-- Examples -->
        <div class="p-grid">
          <div class="p-col-3">
            <WrappedInputText
              v-model="inputValue"
              :label="label"
              :error="error"
              :hint="hint"
              :class="inputClass"
              id="input-id"
            >
            </WrappedInputText>
          </div>
          <div class="p-col-3">
            <WrappedDropdown
              v-model="dropdownValue"
              :error="error"
              :hint="hint"
              :options="cities"
              :dropdown="true"
              :class="inputClass"
              label="Dropdown"
              option-label="name"
              id-prop="inputId"
              id="dropdown-id"
            >
              <template #option="{ option }">
                <div>{{ `${option.name} (${option.code})` }}</div>
              </template>
            </WrappedDropdown>
          </div>
          <div class="p-col-3">
            <InputWrapper
              v-slot="{ bindings }"
              :error="error"
              :hint="hint"
              :class="inputClass"
              label="With icon"
            >
              <span class="p-input-icon-left">
                <i class="pi pi-search"></i>
                <PrimeInputText
                  v-bind="bindings"
                  v-model="inputValue"
                ></PrimeInputText>
              </span>
            </InputWrapper>
          </div>
          <div class="p-col-3">
            <InputWrapper
              v-slot="{ bindings }"
              :error="error"
              :hint="hint"
              :class="inputClass"
              label="Third party input"
            >
              <PickadayVue
                v-bind="bindings"
                v-model="date"
                :style="{
                  borderColor: bindings.isInvalid ? '#f44336' : 'gray',
                }"
                autocomplete="off"
              ></PickadayVue>
            </InputWrapper>
          </div>
        </div>

        <!-- Data -->
        <div class="p-grid">
          <div class="p-col-4">
            <WrappedInputText
              v-model="label"
              :class="inputClass"
              label="Label"
            ></WrappedInputText>
          </div>
          <div class="p-col-4">
            <WrappedInputText
              v-model="error"
              :class="inputClass"
              label="Error"
            ></WrappedInputText>
          </div>
          <div class="p-col-4">
            <WrappedInputText
              v-model="hint"
              :class="inputClass"
              label="Hint"
            ></WrappedInputText>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Vue from "vue";
import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import PrimeInputText from "primevue/inputtext";
import PrimeDropdown from "primevue/dropdown";
import Card from "primevue/card";
import Pickaday from "pikaday";
import "pikaday/css/pikaday.css";

const InputWrapper = Vue.extend({
  props: {
    label: { required: false, type: String },
    id: { required: false, type: String },
    error: { required: false, type: String },
    hint: { required: false, type: String },
    idProp: { required: false, default: () => "id", type: String },
  },

  methods: {
    getInnerId() {
      return this.id || `cbr_input_${this._uid}`;
    },
    getInnerInputClass() {
      return { "p-invalid": this.error };
    },
    getBindings() {
      return {
        isInvalid: this.error,
        class: this.getInnerInputClass(),
        [this.idProp]: this.getInnerId(),
      };
    },
    getChildren() {
      const children = [];
      this.label && children.push(this.createLabel());

      if (this.$scopedSlots.default) {
        const nodes = this.$scopedSlots.default({
          bindings: this.getBindings(),
        });
        nodes && nodes.forEach((node) => children.push(node));
      }

      this.hint && children.push(this.createHint());
      this.error && children.push(this.createErrorMesage());

      return children;
    },
    createLabel() {
      return this.$createElement(
        "label",
        {
          attrs: {
            for: this.getInnerId(),
          },
          class: "p-mb-2",
          style: {
            display: "block",
          },
        },
        this.label
      );
    },

    createErrorMesage() {
      return this.$createElement(
        "small",
        {
          class: "p-invalid",
          style: {
            display: "block",
          },
        },
        this.error
      );
    },

    createHint() {
      return this.$createElement(
        "small",
        {
          style: {
            display: "block",
          },
        },
        this.hint
      );
    },
  },
  render() {
    return this.$createElement("div", this.getChildren());
  },
});

const WrappedInputText = Vue.extend({
  inheritAttrs: false,
  props: {
    label: { required: false, type: String },
    id: { required: false, type: String },
    error: { required: false, type: String },
    hint: { required: false, type: String },
    idProp: { required: false, default: () => "id", type: String },
  },
  methods: {
    getElement() {
      return PrimeInputText;
    },
  },
  render() {
    return this.$createElement(InputWrapper, {
      props: {
        label: this.label,
        id: this.id,
        error: this.error,
        hint: this.hint,
        idProp: this.idProp,
      },
      scopedSlots: {
        default: ({ bindings }) => {
          return this.$createElement(this.getElement(), {
            attrs: {
              ...this.$attrs,
              [this.idProp]: bindings[this.idProp],
            },
            class: bindings.class,
            on: this.$listeners,
            scopedSlots: { ...this.$scopedSlots },
          });
        },
      },
    });
  },
});

// WrappedInputText.extend is for draft only
// not sure this is correct???
// further investigation is needed
// inherit with class style component for sure
// https://class-component.vuejs.org/guide/extend-and-mixins.html#extend
const WrappedDropdown = WrappedInputText.extend({
  methods: {
    getElement() {
      return PrimeDropdown;
    },
  },
});

const PickadayVue = Vue.extend({
  mounted() {
    new Pickaday({
      field: this.$el,
      onSelect: (newDate) => {
        this.$emit("input", newDate);
      },
    });
  },
  render() {
    return this.$createElement("input", {
      attrs: {
        type: "text",
      },
      style: {
        borderWidth: "1px",
        width: "100%",
        color: "#495057",
      },
    });
  },
});

export default {
  components: {
    PrimeInputText,
    Card,
    InputWrapper,
    WrappedInputText,
    WrappedDropdown,
    PickadayVue,
  },
  data() {
    return {
      label: "Label",
      error: "Error",
      hint: "This is a hint",
      inputValue: null,
      dropdownValue: null,
      cities: [
        { code: "MSW", name: "Moscow" },
        { code: "NY", name: "New York" },
      ],
      date: new Date(),
    };
  },
  computed: {
    inputClass() {
      return {
        "p-field": true,
        "p-fluid": true,
        "p-text-left": true,
      };
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background: gray;
}
</style>
