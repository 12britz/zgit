import { getGit, colors, box } from "./utils.js";

export async function handleLog(options) {
  const git = getGit();
  try {
    const args = [];
    if (options.count) args.push("-n", options.count);
    if (options.graph) args.push("--graph --all");
    if (options.oneline) args.push("--oneline");

    const log = await git.log(args);
    const rows = (log.all || []).map((entry) => ({
      hash: String(entry.hash || "").slice(0, 7),
      message: String(entry.message || "").trim(),
      author: entry.author_name || "",
      date: entry.date ? new Date(entry.date).toLocaleString() : "",
    }));

    if (!rows.length) {
      console.log("No commits found.\n");
      return;
    }

    const title = options.graph ? "Graph" : "Logs";

    if (options.graph) {
      const raw = await git.raw(["log", ...args, "--format=%C(green)%h%C(reset) %s %C(dim)(%ar)%C(reset)"]);
      console.log(`  ${colors.bold(title)}`);
      console.log(raw || "  No commits found.");
      return;
    }

    const lines = rows.map((r) => `${colors.cyan}${r.hash}${colors.reset}  ${r.message}`);

    console.log(box(title, lines, { color: colors.cyan }));
  } catch (err) {
    console.log(`${error(err.message)}\n`);
  }
}
