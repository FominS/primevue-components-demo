import moment from "moment";
import { isDate, isString, isArray } from "underscore";
import PrimeCalendar from "primevue/calendar";
import { Component, Prop } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";
import "@/sass/calendar.scss";

@Component({
  inheritAttrs: false
})
export default class Calendar extends BaseInput {
  @Prop({ type: [String, Array] })
  value!: string | string[] | null | undefined;

  get calendarValue() {
    if (isString(this.value)) {
      return moment(this.value as string, this.localDateMask).toDate();
    }

    if (isArray(this.value)) {
      return (this.value as string[]).map(str => {
        return str ? moment(str, this.localDateMask).toDate() : str;
      });
    }

    return this.value;
  }

  get localDateMask() {
    return this.$attrs.showTime ? "YYYY-MM-DDTHH:mm:ss" : "YYYY-MM-DD";
  }

  getOuterValue(date: Date | Date[] | [Date, null] | null) {
    if (isDate(date)) return moment(date).format(this.localDateMask);

    if (isArray(date)) {
      return (date as Date[]).map(date => {
        return date ? moment(date).format(this.localDateMask) : date;
      });
    }

    return date;
  }

  input(date: Date | Date[] | null) {
    this.$emit("input", this.getOuterValue(date));
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
