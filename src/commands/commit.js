import { getGit, colors, box, success, error } from "./utils.js";

export async function handleCommit(options) {
  const git = getGit();
  try {
    await git.commit(options.message || "", options.all ? ["-a"] : []);
    console.log(
      box(
        "Committed",
        [
          options.message ? `${colors.bold}${options.message}${colors.reset}` : "(empty message)",
          "",
          `${success("Success")}`,
        ],
        { color: colors.green, icon: "" }
      )
    );
  } catch (err) {
    console.log(`${box("Commit", [err.message], { color: colors.red, icon: "!" })}\n`);
  }
}
