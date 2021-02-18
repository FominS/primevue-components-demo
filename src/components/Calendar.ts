import { isDate, isString, isArray } from "underscore";
import PrimeCalendar from "primevue/calendar";
import { Component, Prop } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";
import dayjs from "@/plugins/dayjs";
import "@/sass/calendar.scss";

const isDatesArrayValue = (value: unknown) => {
  return isArray(value) && value.length && isDate(value[0]);
};
const isStringArrayValue = (value: unknown) => {
  return isArray(value) && value.length && isString(value[0]);
};
const isDateValue = (value: unknown) => {
  return isDate(value);
};
const isStringValue = (value: unknown) => {
  return isString(value);
};

@Component({
  inheritAttrs: false
})
export default class Calendar extends BaseInput {
  @Prop({ type: [String, Array, Date] })
  value!: string | string[] | Date | Date[] | null | undefined;

  /**
   * По дефолту возвращает дату в виде строки.
   * Указать true, если надо вернуть тип Date.
   */
  @Prop({ required: false, default: false, type: Boolean })
  returnDate!: boolean;

  /**
   * Формат строковой даты по библиотеке dayjs, если
   * нужно вернуть дату с типом String.
   */
  @Prop({ required: false, type: String, default: "YYYY-MM-DDTHH:mm:ss" })
  dateMask!: string;

  get calendarValue() {
    if (isDateValue(this.value) || isDatesArrayValue(this.value)) return this.value;

    if (isStringValue(this.value)) {
      return dayjs(this.value as string, this.dateMask).toDate();
    }

    if (isStringArrayValue(this.value)) {
      return (this.value as string[]).map(str => {
        return dayjs(str, this.dateMask).toDate();
      });
    }

    return this.value;
  }

  getOuterValue(date: Date | Date[] | [Date, null] | null) {
    if (this.returnDate) return date;

    if (isDate(date)) return dayjs(date).format(this.dateMask);

    if (isDatesArrayValue(date)) {
      // Для календаря в режиме Интервал - вторая дата = null (пока не выбрана)
      const nonNullDates = (date as Date[]).filter(date => date);

      return nonNullDates.map(date => {
        return dayjs(date).format(this.dateMask);
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
