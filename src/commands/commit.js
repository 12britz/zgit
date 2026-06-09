import { getGit, colors, box, success, error, getPassthroughArgs } from "./utils.js";

export async function handleCommit(options) {
  const passthrough = getPassthroughArgs("commit");
  const git = getGit();
  if (passthrough.length) {
    try {
      const args = ["commit", ...passthrough];
      if (options.message) args.push("-m", options.message);
      if (options.all) args.push("-a");
      const result = await git.raw(args);
      console.log(result);
    } catch (err) {
      console.log(`${box("Commit Failed", [err.message], { color: colors.red })}\n`);
    }
    return;
  }
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
        { color: colors.green }
      )
    );
  } catch (err) {
    console.log(`${box("Commit Failed", [err.message], { color: colors.red })}\n`);
  }
}

