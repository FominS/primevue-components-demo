import moment from "moment";
import { isDate, isString, isArray } from "underscore";
import PrimeCalendar from "primevue/calendar";
import { Component, Prop } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";
import "@/sass/calendar.scss";

// Для prime-календаря в режиме Интервал вторая дата = null пока не выбрана
type CalendarDate = Date | Date[] | [Date, null] | null;
type OuterDate = string | string[] | [string, null] | null | undefined;

@Component({
  inheritAttrs: false
})
export default class Calendar extends BaseInput {
  @Prop({ type: [String, Array] })
  value!: OuterDate;

  get calendarValue() {
    if (isString(this.value)) {
      return moment(this.value, this.localDateMask).toDate();
    }

    if (isArray(this.value)) {
      // FIX Each member of the union type has signatures, but none of those signatures are compatible with each other
      // @ts-ignore
      return this.value.map(str => {
        return str ? moment(str, this.localDateMask).toDate() : str;
      });
    }

    return null;
  }

  set calendarValue(date: CalendarDate) {
    let result: OuterDate = null;
    if (isDate(date)) result = moment(date).format(this.localDateMask);

    if (isArray(date)) {
      // FIX Each member of the union type has signatures, but none of those signatures are compatible with each other
      // @ts-ignore
      result = date.map(date => {
        return date ? moment(date).format(this.localDateMask) : date;
      });
    }

    this.$emit("input", result);
  }

  get localDateMask() {
    return this.$attrs.showTime ? "YYYY-MM-DDTHH:mm:ss" : "YYYY-MM-DD";
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
