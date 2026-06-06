import { getGit, colors, box } from "./utils.js";

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
            `${colors.green}✔${colors.reset} Synced`,
          ],
          { color: colors.green, icon: "" }
        )
      );
    } else {
      await git.push(remote || "origin");
      console.log(
        box(
          "Pushed",
          [`To: ${colors.bold}${remote || "origin"}${colors.reset}`, `${colors.green}✔${colors.reset} Uploaded`],
          { color: colors.green, icon: "" }
        )
      );
    }
  } catch (err) {
    console.log(
      `${box(action === "pull" ? "Pull Failed" : "Push Failed", [err.message], { color: colors.red, icon: "!" })}\n`
    );
  }
}
