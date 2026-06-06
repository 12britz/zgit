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
  const icon = options.icon ?? "";
  const color = options.color ?? colors.cyan;
  const maxLen =
    Math.max(title.length, ...lines.map((l) => ansiLen(l))) + pad * 2 + 2;

  const divider = color + "─".repeat(maxLen) + colors.reset;
  const top = color + "┌" + "─".repeat(maxLen - 2) + "┐" + colors.reset;
  const mid = color + "├" + "─".repeat(maxLen - 2) + "┤" + colors.reset;
  const bot = color + "└" + "─".repeat(maxLen - 2) + "┘" + colors.reset;

  const row = (content = "") => {
    const visible = ansiLen(content);
    const inner = maxLen - 2;
    const space = inner - visible;
    return `${color}│${colors.reset} ${content}${" ".repeat(Math.max(0, space))} ${color}│${colors.reset}`;
  };

  const header =
    icon || title
      ? row(
          `${color}${colors.bold} ${icon} ${title.toUpperCase()} ${colors.reset}`.trim()
        )
      : null;

  const body = lines.map(row);

  const out = [
    "",
    top,
    header,
    header ? mid : null,
    ...body,
    bot,
    "",
  ].filter(Boolean);

  return out.join("\n");
}

export function statusIcon(status) {
  if (status.startsWith("A")) return "✨";
  if (status.startsWith("M")) return "📝";
  if (status.startsWith("D")) return "🗑️";
  if (status.startsWith("R")) return "🔀";
  if (status.startsWith("C")) return "📋";
  if (status.startsWith("??")) return "🆕";
  return "📄";
}

export function colorStatus(status) {
  if (status.startsWith("A")) return colors.green;
  if (status.startsWith("M")) return colors.yellow;
  if (status.startsWith("D")) return colors.red;
  if (status.startsWith("R")) return colors.cyan;
  return colors.dim;
}

export function success(label) {
  return `${colors.green}✔${colors.reset} ${label}`;
}

export function error(label) {
  return `${colors.red}✘${colors.reset} ${label}`;
}

export function info(label) {
  return `${colors.cyan}ℹ${colors.reset} ${label}`;
}

export function warn(label) {
  return `${colors.yellow}⚠${colors.reset} ${label}`;
}
