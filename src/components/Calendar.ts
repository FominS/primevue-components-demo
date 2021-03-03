import moment from "moment";
import { isDate, isString, isArray } from "underscore";
import PrimeCalendar from "primevue/calendar";
import { Component, Prop } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";
import "@/sass/calendar.scss";

type CalendarDate = Date | (Date | null)[] | null | undefined;
type OuterDate = string | (string | null)[] | null | undefined;

@Component({
  inheritAttrs: false
})
export default class Calendar extends BaseInput {
  @Prop({ type: [String, Array] })
  value?: OuterDate;

  get calendarValue() {
    if (isString(this.value)) {
      return moment(this.value, this.format).toDate();
    }

    if (isArray(this.value)) {
      return this.value.map(str => (str ? moment(str, this.format).toDate() : null));
    }

    return null;
  }

  set calendarValue(date: CalendarDate) {
    let result: OuterDate = null;
    if (isDate(date)) {
      result = moment(date).format(this.format);
    }

    if (isArray(date)) {
      result = date.map(date => (date ? moment(date).format(this.format) : date));
    }

    this.$emit("input", result);
  }

  get format() {
    if (this.$attrs.timeOnly) {
      if (this.$attrs.showSeconds) return "hh:mm:ss";
      return "hh:mm";
    }
    
    if (this.$attrs.showTime) {
      if (this.$attrs.showSeconds) return "YYYY-MM-DDThh:mm:ssZ";
      return "YYYY-MM-DDThh:mmZ"
    }

    return "YYYY-MM-DD"
  }

  input(date: CalendarDate) {
    this.calendarValue = date;
  }

  createInput() {
    return this.$createElement(PrimeCalendar, {
      props: {
        value: this.calendarValue,
        manualInput: false
      },
      attrs: {
        id: this.innerId,
        autocomplete: "off",
        ...this.$attrs
      },
      scopedSlots: this.$scopedSlots,
      class: { "p-invalid": this.hasError },
      on: {
        ...this.$listeners,
        input: this.input
      }
    });
  }
}
