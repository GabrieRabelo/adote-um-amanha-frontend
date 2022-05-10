import { DateFilter } from "../enums/DateFilter";
import { Status } from "../enums/Status";

const necessitiesKey = "preferences.necessities";
const donationsKey = "preferences.donations";

export function setNecessitiesFilters(filters: unknown): void {
  localStorage.setItem(necessitiesKey, JSON.stringify(filters));
}

export function setDonationsFilters(filters: unknown): void {
  localStorage.setItem(donationsKey, JSON.stringify(filters));
}

export function getNecessitiesFilters(): unknown {
  try {
    const strItems = localStorage.getItem(necessitiesKey);
    if (!strItems) {
      return defaultNecessitiesFilters;
    }
    return JSON.parse(strItems);
  } catch (err) {
    return defaultNecessitiesFilters;
  }
}

export function getDonationsFilters(): unknown {
  try {
    const strItems = localStorage.getItem(donationsKey);
    if (!strItems) {
      return defaultDonationsFilters;
    }
    return JSON.parse(strItems);
  } catch (err) {
    return defaultDonationsFilters;
  }
}

const defaultNecessitiesFilters = {
  categories: [],
  subcategories: [],
  status: [Status.pending],
  startDate: DateFilter.sixMonths,
  name: "",
};

const defaultDonationsFilters = {
  categories: [],
  subcategories: [],
  status: [Status.pending, Status.match],
  startDate: DateFilter.sixMonths,
  name: "",
};
