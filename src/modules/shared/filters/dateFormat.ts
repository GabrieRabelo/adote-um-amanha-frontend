import moment from "moment";
import Vue from "vue";

const dateFormat = Vue.filter("date", (value: Date) =>
  moment(value).format("DD/MM/yyyy")
);
export default dateFormat;
