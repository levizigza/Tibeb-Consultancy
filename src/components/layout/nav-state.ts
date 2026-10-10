export type MenuName = "mobile" | "services" | "languages";

export type NavState = {
  open: MenuName | null;
};

export type NavEvent =
  | { type: "toggle"; menu: MenuName }
  | { type: "open"; menu: MenuName }
  | { type: "close" }
  | { type: "escape" };

export const closedNav: NavState = { open: null };

export function reduceNav(state: NavState, event: NavEvent): NavState {
  if (event.type === "toggle") {
    return { open: state.open === event.menu ? null : event.menu };
  }
  if (event.type === "open") return { open: event.menu };
  return closedNav;
}

export function nextMenuIndex(
  current: number,
  count: number,
  key: "ArrowDown" | "ArrowUp" | "Home" | "End",
): number {
  if (count <= 0) return 0;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  if (key === "ArrowDown") return (current + 1) % count;
  return (current - 1 + count) % count;
}

export function menuKeyAction(
  key: string,
  index: number,
  count: number,
): { type: "close" } | { type: "index"; index: number } | null {
  if (key === "Escape") return { type: "close" };
  if (key === "ArrowDown" || key === "ArrowUp" || key === "Home" || key === "End") {
    return { type: "index", index: nextMenuIndex(index, count, key) };
  }
  return null;
}
