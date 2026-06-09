import { getGit, colors, box, success, getPassthroughArgs } from "./utils.js";

export async function handleMerge(branch) {
  const passthrough = getPassthroughArgs("merge");
  const git = getGit();
  if (passthrough.length) {
    try {
      const result = await git.raw(["merge", branch, ...passthrough]);
      console.log(result);
    } catch (err) {
      console.log(`${box("Merge Failed", [err.message], { color: colors.red })}\n`);
    }
    return;
  }
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

