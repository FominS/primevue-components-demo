<template>
  <input-demo :value="value" :tested-events.sync="testedEvents" title="Calendar" class="demo">
    <template #component>
      <Calendar
        v-model="value"
        v-bind="innerAttrs"
        @date-select="testEvent('dateSelect')"
        @show="testEvent('show')"
        @hide="testEvent('hide')"
        @today-click="testEvent('todayClick')"
        @clear-click="testEvent('clearClick')"
        @month-change="testEvent('monthChange')"
        @year-change="testEvent('yearChange')"
      >
        <template v-if="useSlots" #header>
          <i class="pi pi-star"></i>
          <i class="pi pi-star"></i>
          <i class="pi pi-star"></i>
        </template>
        <template v-if="useSlots" #date="{ date }">
          <i class="pi pi-star"></i>
          {{ date.day }}
        </template>
        <template v-if="useSlots" #footer>
          <i class="pi pi-star"></i>
          <i class="pi pi-star"></i>
          <i class="pi pi-star"></i>
        </template>
      </Calendar>
    </template>
    <template #options>
      <div class="p-grid">
        <div class="p-col-6">
          <input-options :label.sync="label" :error.sync="error" :hint.sync="hint"></input-options>
          <input-text v-model="dateFormat" label="Date format"></input-text>
          <input-wrapper v-slot="{ b }" class="p-field p-fluid" label="Number of months to display">
            <input-number v-bind="b" v-model="numberOfMonths"></input-number>
          </input-wrapper>
          <calendar
            v-model="minDate"
            :date-format="null"
            :manual-input="false"
            :show-icon="true"
            label="The minimum selectable date"
          ></calendar>
          <calendar
            v-model="maxDate"
            :date-format="null"
            :manual-input="false"
            :show-icon="true"
            label="The maximum selectable date"
          ></calendar>
          <calendar
            v-model="disabledDates"
            :date-format="null"
            :manual-input="false"
            :show-icon="true"
            selection-mode="multiple"
            label="Dates to disable"
          ></calendar>
          <check-box v-model="inline" label="Display inline"></check-box>
          <check-box v-model="showOtherMonths" label="Show dates of neighbour months (does not work)"></check-box>
          <check-box v-model="selectOtherMonths" label="Neighbour months dates are selectable"></check-box>
          <check-box v-model="monthNavigator" label="Month as a dropdown (does not work)"></check-box>
          <check-box v-model="useSlots" label="Use slots (header, footer, date)"></check-box>
        </div>
        <div class="p-col-6">
          <panel header="Quantity of selected dates">
            <radio-button-group
              v-model="selectionMode"
              :keys="selectionModeKeys"
              @change="resetValue"
            ></radio-button-group>
          </panel>
          <panel class="p-mt-2" header="Icon">
            <check-box v-model="showIcon" label="Show icon"></check-box>
            <input-text v-if="showIcon" v-model="icon" label="Icon"></input-text>
          </panel>
          <panel class="p-mt-2" header="View">
            <radio-button-group v-model="view" :keys="viewKeys" @change="resetValue"></radio-button-group>
          </panel>
          <panel class="p-mt-2" header="Year navigator">
            <check-box v-model="yearNavigator" label="Year as a dropdown"></check-box>
            <template v-if="yearNavigator">
              <input-wrapper v-slot="{ b }" label="Start" class="p-field p-fluid">
                <input-number v-bind="b" v-model="yearRangeStart"></input-number>
              </input-wrapper>
              <input-wrapper v-slot="{ b }" label="End" class="p-field p-fluid">
                <input-number v-bind="b" v-model="yearRangeEnd"></input-number>
              </input-wrapper>
            </template>
          </panel>
          <panel class="p-mt-2" header="Disabled weekdays">
            <check-box
              v-for="(item, index) in $primevue.config.locale.dayNames"
              v-model="disabledDays"
              :key="item"
              :label="item"
              :value="index"
              :binary="false"
            >
            </check-box>
          </panel>
        </div></div></template
  ></input-demo>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Checkbox, RadioButtonGroup } from "@/components";
import { InputOptions, Demo } from "@/components/auxiliary";

enum InputEvents {
  dateSelect,
  show,
  hide,
  todayClick,
  clearClick,
  monthChange,
  yearChange
}

@Component({
  components: {
    RadioButtonGroup,
    InputOptions,
    "check-box": Checkbox,
    "input-demo": Demo
  }
})
export default class CalendarDemo extends Vue {
  useSlots = false;
  label = "Label";
  error = "";
  hint = "";
  value = null;
  selectionMode = "single";
  selectionModeKeys = {
    Single: "single",
    Multiple: "multiple",
    Range: "range"
  };
  dateFormat = "yy-mm-dd";
  inline = false;
  showOtherMonths = true;
  selectOtherMonths = false;
  showIcon = false;
  icon = "pi pi-calendar";
  numberOfMonths = 1;
  view = "date";
  viewKeys = {
    Date: "date",
    Month: "month"
  };
  monthNavigator = false;
  yearNavigator = false;
  yearRangeStart = 2000;
  yearRangeEnd = 2030;
  minDate: Date | null = null;
  maxDate: Date | null = null;
  disabledDates: Date[] = [];
  disabledDays: number[] = [];

  get innerAttrs() {
    return {
      label: this.label,
      hint: this.hint,
      error: this.error,
      selectionMode: this.selectionMode,
      dateFormat: this.dateFormat,
      inline: this.inline,
      showOtherMonths: this.showOtherMonths,
      selectOtherMonths: this.selectOtherMonths,
      showIcon: this.showIcon,
      icon: this.icon,
      numberOfMonths: this.numberOfMonths,
      view: this.view,
      monthNavigator: this.monthNavigator,
      yearNavigator: this.yearNavigator,
      yearRange: `${this.yearRangeStart}:${this.yearRangeEnd}`,
      minDate: this.minDate,
      maxDate: this.maxDate,
      disabledDates: this.disabledDates,
      disabledDays: this.disabledDays
    };
  }

  testedEvents: Record<keyof typeof InputEvents, boolean> = {
    dateSelect: false,
    show: false,
    hide: false,
    todayClick: false,
    clearClick: false,
    monthChange: false,
    yearChange: false
  };

  resetValue() {
    this.value = null;
  }

  testEvent(type: keyof typeof InputEvents) {
    this.testedEvents[type] = true;
  }
}
</script>