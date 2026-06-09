import { getGit, colors, box, success, getPassthroughArgs } from "./utils.js";

export async function handlePullPush(action, remote) {
  const passthrough = getPassthroughArgs(action);
  const git = getGit();
  if (passthrough.length) {
    try {
      const args = [action, remote, ...passthrough].filter(Boolean);
      const result = await git.raw(args);
      console.log(result);
    } catch (err) {
      console.log(
        `${box(action === "pull" ? "Pull Failed" : "Push Failed", [err.message], { color: colors.red })}\n`
      );
    }
    return;
  }
  try {
    if (action === "pull") {
      const result = await git.pull();
      console.log(
        box(
          "Pulled",
          [
            `From: ${colors.bold}${remote || "origin"}${colors.reset}`,
            `${success("Synced")}`,
          ],
          { color: colors.green }
        )
      );
    } else {
      await git.push(remote || "origin");
      console.log(
        box(
          "Pushed",
          [`To: ${colors.bold}${remote || "origin"}${colors.reset}`, `${success("Uploaded")}`],
          { color: colors.green }
        )
      );
    }
  } catch (err) {
    console.log(
      `${box(action === "pull" ? "Pull Failed" : "Push Failed", [err.message], { color: colors.red })}\n`
    );
  }
}

