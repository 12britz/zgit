import { getGit, colors, box, success } from "./utils.js";

export async function handlePullPush(action, remote) {
  const git = getGit();
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

