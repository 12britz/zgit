import SimpleGit from "simple-git";
import chalk from "chalk";

let cwdInstance = new SimpleGit(process.cwd());
export function getGit() {
  return cwdInstance;
}

const KNOWN_OPTS = {
  init: [[], ["path"]],
  clone: [[], ["url", "path"]],
  status: [["branch"], ["st"]],
  log: [["count", "graph", "oneline"], []],
  diff: [["cached"], ["file"]],
  add: [[], ["paths"]],
  commit: [["all", "amend"], []],
  branch: [["delete", "move", "list"], []],
  switch: [[], ["name"]],
  stash: [["pop", "list"], []],
  reset: [["soft", "hard"], ["ref"]],
  merge: [[], ["branch"]],
  pull: [[], ["remote"]],
  push: [[], ["remote"]],
  remote: [["addName", "addUrl"], []],
  tag: [["message"], ["name"]],
};

export function getPassthroughArgs(cmdName, aliases = []) {
  const names = [cmdName, ...aliases];
  const idx = process.argv.findIndex((a, i) => i >= 2 && names.includes(a));
  if (idx === -1) return [];

  const known = KNOWN_OPTS[cmdName];
  if (!known) return [];

  const [longOpts, posArgs] = known;
  const longSet = new Set(longOpts);
  const posCount = posArgs.filter(a => !a.endsWith("...")).length;
  const hasVariadic = posArgs.some(a => a.endsWith("..."));

  const after = process.argv.slice(idx + 1);
  let needsPassthrough = false;
  let posSeen = 0;

  for (let i = 0; i < after.length; i++) {
    const a = after[i];
    if (a === "--") {
      continue;
    }
    if (a.startsWith("--")) {
      const eqIdx = a.indexOf("=");
      const key = eqIdx !== -1 ? a.slice(2, eqIdx) : a.slice(2);
      if (!longSet.has(key)) {
        needsPassthrough = true;
        break;
      }
      if (eqIdx === -1 && i + 1 < after.length && !after[i + 1].startsWith("-")) {
        i++;
      }
    } else if (a.startsWith("-") && a.length === 2) {
      needsPassthrough = true;
      break;
    } else {
      if (hasVariadic || posSeen < posCount) {
        posSeen++;
      } else {
        needsPassthrough = true;
        break;
      }
    }
  }

  return needsPassthrough ? after : [];
}

function hexToAnsi(hex, bg = false) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `\x1b[${bg ? 48 : 38};2;${r};${g};${b}m`;
}

export const colors = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  cyan: hexToAnsi("#7aa2f7"),     // Tokyo Night Blue/Cyan
  green: hexToAnsi("#9ece6a"),    // Tokyo Night Green
  yellow: hexToAnsi("#e0af68"),   // Tokyo Night Yellow
  red: hexToAnsi("#f7768e"),      // Tokyo Night Red
  white: hexToAnsi("#a9b1d6"),    // Tokyo Night Foreground
  magenta: hexToAnsi("#bb9af3"),  // Tokyo Night Purple
  blue: hexToAnsi("#2ac3de"),     // Tokyo Night Teal/Cyan
  bgBlue: hexToAnsi("#7aa2f7", true) + "\x1b[30m",
  bgGreen: hexToAnsi("#9ece6a", true) + "\x1b[30m",
  
  // Extra palette colors
  orange: hexToAnsi("#ff9e64"),
  teal: hexToAnsi("#1abc9c"),
  gray: hexToAnsi("#565f89"),
};


function ansiLen(str) {
  return String(str).replace(/\x1b\[[0-9;]*[mGK]/g, "").length;
}

export function box(title, lines = [], options = {}) {
  const color = options.color ?? colors.cyan;
  const isOpen = options.style === "open";

  const plainLines = lines.map((line) => {
    const text = typeof line === "string" ? line : line.text ?? "";
    return ansiLen(text);
  });

  const titleLen = title ? ansiLen(title) : 0;
  // Ensure we have a sensible minimum width for aesthetics (e.g. 40 characters)
  const inner = Math.max(40, titleLen + 2, ...plainLines);

  if (isOpen) {
    const top = title
      ? `${color}╭─ ${colors.reset}${colors.bold}${title}${colors.reset}${color} ${"─".repeat(Math.max(0, inner - titleLen - 1))}${colors.reset}`
      : `${color}╭${"─".repeat(inner + 2)}${colors.reset}`;

    const row = (content = "") => {
      return `${color}│${colors.reset} ${content}`;
    };

    const body = lines.map((line) => {
      const text = typeof line === "string" ? line : line.text ?? "";
      const rawColor = typeof line === "object" && line.color ? line.color : null;
      return row(rawColor ? `${rawColor}${text}${colors.reset}` : text);
    });

    const bot = `${color}╰${"─".repeat(inner + 2)}${colors.reset}`;
    return [top, ...body, bot].join("\n");
  } else {
    // Full Box style (aligns perfectly)
    const top = title
      ? `${color}╭─ ${colors.reset}${colors.bold}${title}${colors.reset}${color} ${"─".repeat(Math.max(0, inner - titleLen - 1))}╮${colors.reset}`
      : `${color}╭${"─".repeat(inner + 2)}╮${colors.reset}`;

    const bot = `${color}╰${"─".repeat(inner + 2)}╯${colors.reset}`;

    const row = (content = "") => {
      const visible = ansiLen(content);
      const space = inner - visible;
      return `${color}│${colors.reset} ${content}${" ".repeat(Math.max(0, space))} ${color}│${colors.reset}`;
    };

    const body = lines.map((line) => {
      const text = typeof line === "string" ? line : line.text ?? "";
      const rawColor = typeof line === "object" && line.color ? line.color : null;
      const out = rawColor ? `${rawColor}${text}${colors.reset}` : text;
      return row(out);
    });

    return [top, ...body, bot].join("\n");
  }
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
  if (status.startsWith("A")) return chalk.hex("#9ece6a").bold("✨"); // Created/Added
  if (status.startsWith("M")) return chalk.hex("#e0af68").bold("📝"); // Modified
  if (status.startsWith("D")) return chalk.hex("#f7768e").bold("🗑️"); // Deleted
  if (status.startsWith("R")) return chalk.hex("#2ac3de").bold("🔀"); // Renamed
  if (status.startsWith("C")) return chalk.hex("#bb9af3").bold("💥"); // Conflict
  if (status.startsWith("?")) return chalk.hex("#ff9e64").bold("🆕"); // Untracked
  return chalk.hex("#a9b1d6")("📄");
}

export function success(text) {
  return `${chalk.hex("#9ece6a").bold("✔")} ${text}`;
}

export function error(text) {
  return `${chalk.hex("#f7768e").bold("✘")} ${text}`;
}

export function info(text) {
  return `${chalk.hex("#7aa2f7").bold("ℹ")} ${text}`;
}

export function warn(text) {
  return `${chalk.hex("#e0af68").bold("⚠")} ${text}`;
}

