export function mountQueryString(queryParam = {}): string {
  return Object.entries(queryParam)
    .filter((entry: unknown[]) => entry[1])
    .map(([key, value]: unknown[]) => `${key}=${value}`)
    .join("&");
}
