// A button in herdr-t3's tab bar that shows or hides the Files/Changes panel (layout node "panel"), as cmd-shift-e does.
import { View, div, svg } from "gpui-kit";
import { theme, layout, run } from "herdr";

function find(node, id) {
  if (node?.id === id) return node;
  for (const child of node?.children ?? []) {
    const found = find(child, id);
    if (found) return found;
  }
  return null;
}

export default class PanelToggle extends View {
  render() {
    const t = theme();
    const panel = find(layout(), "panel");
    const on = Boolean(panel && !panel.hidden);
    return div().size_full().flex().items_center().justify_center().bg(t.chrome)
      .child(div().id("panel-toggle").size(26).flex_none().flex().items_center().justify_center().rounded(6)
        .bg(on ? t.selected : t.chrome).text_color(on ? t.foreground : t.muted)
        .hover((s) => s.bg(t.hover).text_color(t.foreground))
        .role("button").accessibility_label("Files / Changes")
        .tooltip(on ? "Hide Files / Changes (⇧⌘E)" : "Show Files / Changes (⇧⌘E)")
        .on_mouse_down("left", (_e, cx) => cx.stop_propagation())
        .on_click(() => run("layout.toggle", { id: "panel" }))
        .child(svg("mods/t3-panel-toggle/panel-right.svg").size(14)));
  }
}
