import { getGit, colors, box, success, warn } from "./utils.js";

export async function handleReset(ref, options) {
  const git = getGit();
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

