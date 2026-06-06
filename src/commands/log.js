import { getGit, colors } from "./utils.js";

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
    }));

    if (!rows.length) {
      console.log("No commits found.\n");
      return;
    }

    for (const r of rows) {
      console.log(`${colors.cyan}${r.hash}${colors.reset}  ${r.message}`);
    }
    console.log("");
  } catch (err) {
    console.log(`${error(err.message)}\n`);
  }
}
