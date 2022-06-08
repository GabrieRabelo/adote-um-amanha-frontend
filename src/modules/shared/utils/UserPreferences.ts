import { DateFilter } from "../enums/DateFilter";
import { Status } from "../enums/Status";

const necessitiesKey = "preferences.necessities";
const donationsKey = "preferences.donations";
const matchesKey = "preferences.matches";
const donatorsKey = "preferences.donators";

export function setNecessitiesFilters(filters: unknown): void {
  localStorage.setItem(necessitiesKey, JSON.stringify(filters));
}

export function setDonationsFilters(filters: unknown): void {
  localStorage.setItem(donationsKey, JSON.stringify(filters));
}

export function setMatchesFilters(filters: unknown): void {
  localStorage.setItem(matchesKey, JSON.stringify(filters));
}

export function setDonatorsFilters(filters: unknown): void {
  localStorage.setItem(donatorsKey, JSON.stringify(filters));
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

export function getMatchesFilters(): unknown {
  try {
    const strItems = localStorage.getItem(matchesKey);
    if (!strItems) {
      return defaultMatchesFilters;
    }
    return JSON.parse(strItems);
  } catch (err) {
    return defaultMatchesFilters;
  }
}

export function getDonatorsFilters(): unknown {
  try {
    const strItems = localStorage.getItem(donatorsKey);
    if (!strItems) {
      return defaultDonatorsFilters;
    }
    return JSON.parse(strItems);
  } catch (err) {
    return defaultDonatorsFilters;
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

const defaultDonatorsFilters = {
  name: "",
  donationsApproved: 0,
  donationsRefused: 0
};
