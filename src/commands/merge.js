import { getGit, colors, box, success } from "./utils.js";

export async function handleMerge(branch) {
  const git = getGit();
  try {
    await git.mergeFromBranch(branch);
    console.log(
      box(
        "Merged",
        [`Branch: ${colors.bold}${branch}${colors.reset}`, "", `${success("Success")}`],
        { color: colors.green }
      )
    );
  } catch (err) {
    console.log(`${box("Merge Failed", [err.message], { color: colors.red })}\n`);
  }
}

