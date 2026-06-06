import SimpleGit from "simple-git";

let cwdInstance = new SimpleGit(process.cwd());
export function getGit() {
  return cwdInstance;
}

export const colors = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  white: "\x1b[37m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
};

function ansiLen(str) {
  return String(str).replace(/\x1b\[[0-9;]*[mGK]/g, "").length;
}

export function box(title, lines = [], options = {}) {
  const pad = options.pad ?? 1;
  const color = options.color ?? colors.cyan;

  const plainLines = lines.map((line) => {
    const text = typeof line === "string" ? line : line.text ?? "";
    return ansiLen(text);
  });

  const titleLen = title ? ansiLen(title) : 0;
  const contentWidth = Math.max(0, titleLen, ...plainLines);
  const inner = contentWidth + pad * 2;
  const width = inner + 2;

  const top = color + "┌" + "─".repeat(inner) + "┐" + colors.reset;
  const divider = color + "├" + "─".repeat(inner) + "┤" + colors.reset;
  const bot = color + "└" + "─".repeat(inner) + "┘" + colors.reset;

  const row = (content = "") => {
    const visible = ansiLen(content);
    const space = inner - visible;
    return `${color}│${colors.reset} ${content}${" ".repeat(Math.max(0, space))} ${color}│${colors.reset}`;
  };

  const header =
    title || title === ""
      ? row(`${color}${colors.bold} ${title}${colors.reset}`)
      : null;

  const body = lines.map((line) => {
    const text = typeof line === "string" ? line : line.text ?? "";
    const rawColor = typeof line === "object" && line.color ? line.color : null;
    const out = rawColor ? `${rawColor}${text}${colors.reset}` : text;
    return row(out);
  });

  const out = [top, header, divider, ...body, bot];
  return out.join("\n");
}

export function statusColor(status) {
  if (status.startsWith("A")) return colors.green;
  if (status.startsWith("M")) return colors.yellow;
  if (status.startsWith("D")) return colors.red;
  if (status.startsWith("R")) return colors.cyan;
  if (status.startsWith("?")) return colors.dim;
  return colors.white;
}

export function statusIcon(status) {
  if (status.startsWith("A")) return "✨";
  if (status.startsWith("M")) return "📝";
  if (status.startsWith("D")) return "🗑️";
  if (status.startsWith("R")) return "🔀";
  if (status.startsWith("C")) return "📋";
  if (status.startsWith("?")) return "🆕";
  return "📄";
}

export function success(text) {
  return `${colors.green}✔${colors.reset} ${text}`;
}

export function error(text) {
  return `${colors.red}✘${colors.reset} ${text}`;
}

export function info(text) {
  return `${colors.cyan}ℹ${colors.reset} ${text}`;
}

export function warn(text) {
  return `${colors.yellow}⚠${colors.reset} ${text}`;
}
