import figlet from "figlet";

export function showBanner() {
  const text = figlet.textSync("zgit", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  });
  return `${text}\n  A beautifully colored git alternative`;
}
