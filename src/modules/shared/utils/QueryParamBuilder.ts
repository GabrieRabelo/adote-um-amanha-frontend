export function mountQueryString(queryParam = {}) {
  return Object.entries(queryParam)
    .filter(([k, v]: unknown[]) => v)
    .map(([k, v]: unknown[]) => `${k}=${v}`)
    .join("&");
}
