import { getGit, colors, box, success } from "./utils.js";

export async function handleLog(options) {
  const git = getGit();
  try {
    const args = [];
    if (options.count) args.push("-n", options.count);
    if (options.graph) args.push("--graph");
    if (options.oneline) args.push("--oneline");

    const log = await git.log(args);
    const rows = (log.all || []).map((entry) => ({
      hash: String(entry.hash || "").slice(0, 7),
      message: String(entry.message || "").trim(),
      date: entry.date ? new Date(entry.date).toLocaleString() : "",
    }));

    if (!rows.length) {
      console.log(`${box("Logs", ["No commits found."], { color: colors.dim })}\n`);
      return;
    }

    const title = options.graph ? "Graph" : "Logs";
    const lines = options.graph
      ? rows.map((r) => `${colors.cyan}${r.hash}${colors.reset} ${r.message}`)
      : rows.map((r) => `${colors.cyan}${r.hash}${colors.reset}  ${r.message}  ${colors.dim}${r.date}${colors.reset}`);

    console.log(box(title, lines, { color: colors.cyan }));
  } catch (err) {
    console.log(`${error(err.message)}\n`);
  }
}
