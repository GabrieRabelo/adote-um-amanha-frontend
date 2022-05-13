import moment from "moment";
import { EnumerableObject } from "../types/EnumerableObject";

export enum DateFilter {
  oneMonth = 1,
  threeMonths = 3,
  sixMonths = 6,
  nineMonths = 9,
  oneYear = 12,
}

function toString(date: DateFilter): string {
  return dateStrings[date];
}

function allObjects(): EnumerableObject[] {
  return Object.entries(dateStrings).map(([value, name]) => ({
    value: Number(value),
    name,
  }));
}

function toISODate(dateFilter: DateFilter): string {
  return moment().subtract(dateFilter, "month").toISOString();
}

const dateStrings = {
  [DateFilter.oneMonth]: "1 mês",
  [DateFilter.threeMonths]: "3 meses",
  [DateFilter.sixMonths]: "6 meses",
  [DateFilter.nineMonths]: "9 meses",
  [DateFilter.oneYear]: "12 meses",
};

export default {
  toString,
  allObjects,
  toISODate,
};
