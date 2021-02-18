import moment from "moment"
import { isDate, isString, isArray } from "underscore";
import PrimeCalendar from "primevue/calendar";
import { Component, Prop } from "vue-property-decorator";
import BaseInput from "@/components/BaseInput";
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
   * Формат строковой даты по библиотеке momentjs, если
   * нужно вернуть дату с типом String.
   */
  @Prop({ required: false, type: String })
  dateMask!: string;

  get calendarValue() {
    if (isDateValue(this.value) || isDatesArrayValue(this.value)) return this.value;

    if (isStringValue(this.value)) {
      return moment(this.value as string, this.localDateMask).toDate();
    }

    if (isStringArrayValue(this.value)) {
      return (this.value as string[]).map(str => {
        return moment(str, this.localDateMask).toDate();
      });
    }

    return this.value;
  }

  get localDateMask() {
    if (this.dateMask) return this.dateMask;

    const mask = "YYYY-MM-DDTHH:mm:ss";
    return this.$attrs.showTime ? mask : mask.split("T")[0];
  }

  getOuterValue(date: Date | Date[] | [Date, null] | null) {
    if (this.returnDate) return date;

    if (isDate(date)) return moment(date).format(this.localDateMask);

    if (isDatesArrayValue(date)) {
      // Для календаря в режиме Интервал - вторая дата = null (пока не выбрана)
      const nonNullDates = (date as Date[]).filter(date => date);

      return nonNullDates.map(date => {
        return moment(date).format(this.localDateMask);
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
