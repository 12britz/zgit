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
  const color = options.color ?? colors.cyan;
  const header = `${color}${colors.bold}${title}${colors.reset}`;
  const underline = `${color}${"─".repeat(ansiLen(title))}${colors.reset}`;
  const pad = options.pad ?? 0;

  const body = lines
    .map((line) => {
      const text = typeof line === "string" ? line : line.text ?? "";
      const rawColor = typeof line === "object" && line.color ? line.color : null;
      const out = rawColor ? `${rawColor}${text}${colors.reset}` : text;
      return " ".repeat(pad) + out;
    })
    .join("\n");

  if (!body) {
    return `${header}\n${underline}`;
  }

  return `${header}\n${underline}\n${body}`;
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
