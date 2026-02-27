export function canAccessRoute(route) {
  return route.status !== "archived"
}
