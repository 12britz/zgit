import SimpleGit from "simple-git";
import { getGit, colors, box, getPassthroughArgs } from "./utils.js";

export async function handleInit(path) {
  const passthrough = getPassthroughArgs("init");
  if (passthrough.length) {
    try {
      const git = getGit();
      const result = await git.raw(["init", path, ...passthrough].filter(Boolean));
      console.log(result);
    } catch (err) {
      console.log(`${box("Error", [err.message], { color: colors.red })}\n`);
    }
    return;
  }
  try {
    const target = path || process.cwd();
    new SimpleGit(target).init(target);
    console.log(
      box(
        "Initialized",
        [`New repository created at:`, `${colors.bold}${target}${colors.reset}`],
        { color: colors.green }
      )
    );
  } catch (err) {
    console.log(`${box("Error", [err.message], { color: colors.red })}\n`);
  }
}

