import { DateFilter } from "../enums/DateFilter";
import { Status } from "../enums/Status";

const necessitiesKey = "preferences.necessities";

export function setNecessitiesFilters(filters: unknown): void {
  localStorage.setItem(necessitiesKey, JSON.stringify(filters));
}

export function getNecessitiesFilters(): unknown {
  try {
    const strItems = localStorage.getItem(necessitiesKey);
    if (!strItems) {
      return defaultFilters;
    }
    return JSON.parse(strItems);
  } catch (err) {
    return defaultFilters;
  }
}

const defaultFilters = {
  categories: [],
  subcategories: [],
  status: [Status.pending],
  startDate: DateFilter.sixMonths,
  name: "",
};
