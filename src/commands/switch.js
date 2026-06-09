import { getGit, colors, box, success, getPassthroughArgs } from "./utils.js";

export async function handleSwitch(name) {
  const passthrough = getPassthroughArgs("switch", ["sw"]);
  const git = getGit();
  if (passthrough.length) {
    try {
      const result = await git.raw(["switch", name, ...passthrough]);
      console.log(result);
    } catch (err) {
      console.log(`${box("Switch Failed", [err.message], { color: colors.red })}\n`);
    }
    return;
  }
  try {
    await git.checkout(name);
    console.log(
      box(
        "Switched",
        [`Now on branch: ${colors.bold}${name}${colors.reset}`, "", `${success("Done")}`],
        { color: colors.green }
      )
    );
  } catch (err) {
    console.log(`${box("Switch Failed", [err.message], { color: colors.red })}\n`);
  }
}

