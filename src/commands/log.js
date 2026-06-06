import { getGit, colors, box, error } from "./utils.js";

export async function handleLog(options) {
  const git = getGit();
  try {
    const count = options.count || "10";
    
    if (options.graph) {
      // For graph, we use git.raw to preserve the ASCII graph output
      const rawGraph = await git.raw(["log", "--graph", "--all", "--oneline", "-n", count]);
      const lines = rawGraph.split("\n").filter(line => line.trim().length > 0);
      
      console.log(
        box("Graph", lines, { color: colors.magenta, style: "open" })
      );
      return;
    }

    const args = [];
    args.push("-n", count);
    if (options.oneline) args.push("--oneline");

    const log = await git.log(args);
    const rows = (log.all || []).map((entry) => ({
      hash: String(entry.hash || "").slice(0, 7),
      message: String(entry.message || "").trim(),
      author: entry.author_name || "",
      date: entry.date ? new Date(entry.date).toLocaleDateString() : "",
    }));

    if (!rows.length) {
      console.log(`${box("Logs", ["Nothing here yet"], { color: colors.dim })}\n`);
      return;
    }

    let lines;
    if (options.oneline) {
      lines = rows.map((r) => `● ${colors.cyan}${r.hash}${colors.reset} ${r.message}`);
    } else {
      lines = rows.map((r) => {
        const authorStr = r.author ? ` ${colors.dim}(by ${r.author})${colors.reset}` : "";
        const dateStr = r.date ? ` ${colors.teal}${r.date}${colors.reset}` : "";
        return `● ${colors.yellow}${r.hash}${colors.reset} ${r.message}${authorStr}${dateStr}`;
      });
    }

    console.log(box("Logs", lines, { color: colors.cyan, style: "open" }));
  } catch (err) {
    console.log(`${error(err.message)}\n`);
  }
}

