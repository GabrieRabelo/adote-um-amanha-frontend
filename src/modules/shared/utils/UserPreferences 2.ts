const necessitiesKey = "preferences.necessities";

export function setNecessitiesFilters(filters: unknown): void {
  localStorage.setItem(necessitiesKey, JSON.stringify(filters));
}

export function getNecessitiesFilters(): unknown {
  try {
    const strItems = localStorage.getItem(necessitiesKey);
    if (!strItems) {
      return null;
    }
    return JSON.parse(strItems);
  } catch (err) {
    return null;
  }
}
