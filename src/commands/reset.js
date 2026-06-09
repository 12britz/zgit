import { getGit, colors, box, success, warn, getPassthroughArgs } from "./utils.js";

export async function handleReset(ref, options) {
  const passthrough = getPassthroughArgs("reset");
  const git = getGit();
  if (passthrough.length) {
    try {
      const result = await git.raw(["reset", ref || "HEAD", ...passthrough].filter(Boolean));
      console.log(result);
    } catch (err) {
      console.log(`${box("Reset Failed", [err.message], { color: colors.red })}\n`);
    }
    return;
  }
  try {
    const mode = options.hard ? "hard" : options.soft ? "soft" : "mixed";
    await git.reset([mode, ref || "HEAD"]);
    console.log(
      box(
        "Reset",
        [
          `Mode: ${colors.bold}${mode}${colors.reset}`,
          `Ref:  ${colors.bold}${ref || "HEAD"}${colors.reset}`,
          "",
          `${warn("Irreversible")}`,
        ],
        { color: colors.yellow }
      )
    );
  } catch (err) {
    console.log(`${box("Reset Failed", [err.message], { color: colors.red })}\n`);
  }
}

