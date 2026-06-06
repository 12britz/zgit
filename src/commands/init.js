import SimpleGit from "simple-git";
import { colors, box, success } from "./utils.js";

export async function handleInit(path) {
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

