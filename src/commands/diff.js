import { getGit, colors, box, getPassthroughArgs } from "./utils.js";

export async function handleDiff(options, file) {
  const passthrough = getPassthroughArgs("diff");
  const git = getGit();
  if (passthrough.length) {
    try {
      const result = await git.raw(["diff", ...passthrough]);
      console.log(result);
    } catch (err) {
      console.log(`${box("Diff Error", [err.message], { color: colors.red, style: "open" })}\n`);
    }
    return;
  }
  try {
    let msg = options.cached ? "Staged Changes" : file ? `Diff: ${file}` : "Working Tree Changes";
    const diff = options.cached ? await git.diffCached() : file ? await git.diff(file) : await git.diff();

    if (!diff) {
      console.log(
        box("Diff", ["No changes to show"], { color: colors.green })
      );
      return;
    }

    const diffLines = diff.split("\n");
    const colored = diffLines.map((line) => {
      if (line.startsWith("+") && !line.startsWith("+++")) return `${colors.green}${line}${colors.reset}`;
      if (line.startsWith("-") && !line.startsWith("---")) return `${colors.red}${line}${colors.reset}`;
      if (line.startsWith("@@")) return `${colors.magenta}${line}${colors.reset}`;
      if (line.startsWith("diff --git")) return `${colors.cyan}${colors.bold}${line}${colors.reset}`;
      if (line.startsWith("---") || line.startsWith("+++")) return `${colors.dim}${line}${colors.reset}`;
      return line;
    });

    console.log(box(msg, colored, { color: colors.cyan, style: "open" }));
  } catch (err) {
    console.log(`${box("Diff Error", [err.message], { color: colors.red, style: "open" })}\n`);
  }
}

