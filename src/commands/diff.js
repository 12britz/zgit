import { getGit, colors, box } from "./utils.js";

export async function handleDiff(options, file) {
  const git = getGit();
  try {
    let msg = options.cached ? "Staged Changes" : file ? `Diff: ${file}` : "Working Tree Changes";
    const diff = options.cached ? await git.diffCached() : file ? await git.diff(file) : await git.diff();

    if (!diff) {
      console.log(
        box("Diff", ["No changes to show"], { color: colors.green, icon: "" })
      );
      return;
    }

    const diffLines = diff.split("\n");
    const colored = diffLines.map((line) => {
      if (line.startsWith("+") && !line.startsWith("+++")) return `${colors.green}${line}${colors.reset}`;
      if (line.startsWith("-") && !line.startsWith("---")) return `${colors.red}${line}${colors.reset}`;
      if (line.startsWith("@@")) return `${colors.magenta}${line}${colors.reset}`;
      if (line.startsWith("diff --git")) return `${colors.cyan}${line}${colors.reset}`;
      if (line.startsWith("---") || line.startsWith("+++")) return `${colors.dim}${line}${colors.reset}`;
      return line;
    });

    console.log(box(msg, colored, { color: colors.cyan, icon: "" }));
  } catch (err) {
    console.log(`${box("Diff", [err.message], { color: colors.red, icon: "" })}\n`);
  }
}
