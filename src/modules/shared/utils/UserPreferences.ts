import { DateFilter } from "../enums/DateFilter";
import { Status } from "../enums/Status";

const necessitiesKey = "preferences.necessities";
const donationsKey = "preferences.donations";
const matchesKey = "preferences.matches";

export function setNecessitiesFilters(filters: unknown): void {
  localStorage.setItem(necessitiesKey, JSON.stringify(filters));
}

export function setDonationsFilters(filters: unknown): void {
  localStorage.setItem(donationsKey, JSON.stringify(filters));
}

export function setMatchesFilters(filters: unknown): void {
  localStorage.setItem(matchesKey, JSON.stringify(filters));
}

export function getNecessitiesFilters(): unknown {
  try {
    const strItems = localStorage.getItem(necessitiesKey);
    if (!strItems) {
      return defaultNecessitiesFilters;
    }
    const storedData = JSON.parse(strItems);
    return { ...defaultNecessitiesFilters, ...storedData };
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
    const storedData = JSON.parse(strItems);
    return { ...defaultDonationsFilters, ...storedData };
  } catch (err) {
    return defaultDonationsFilters;
  }
}

export function getMatchesFilters(): unknown {
  try {
    const strItems = localStorage.getItem(matchesKey);
    if (!strItems) {
      return defaultMatchesFilters;
    }
    const storedData = JSON.parse(strItems);
    return { ...defaultMatchesFilters, ...storedData };
  } catch (err) {
    return defaultMatchesFilters;
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

const defaultMatchesFilters = {
  categories: [],
  subcategories: [],
  status: [Status.pending],
  startDate: DateFilter.sixMonths,
  name: "",
};
