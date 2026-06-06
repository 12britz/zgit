import { getGit, colors, box, success } from "./utils.js";

export async function handleSwitch(name) {
  const git = getGit();
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

