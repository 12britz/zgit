import { getGit, colors, box, success, getPassthroughArgs } from "./utils.js";

export async function handleStash(options) {
  const passthrough = getPassthroughArgs("stash");
  if (passthrough.length) {
    try {
      const result = await getGit().raw(["stash", ...passthrough]);
      console.log(result);
    } catch (err) {
      console.log(
        box(
          "Stash Failed",
          [err.message || "Something went wrong while running stash."],
          { color: colors.red }
        )
      );
    }
    return;
  }
  try {
    if (options.pop) {
      const result = await getGit().raw(["stash", "pop"]);
      console.log(
        box(
          "Stash",
          [
            result.trim() || "Popped the most recent stash and restored the working tree.",
            `You can continue working on the files you just restored.`,
          ],
          { color: colors.green }
        )
      );
      return;
    }

    if (options.list) {
      const result = await getGit().raw(["stash", "list"]);
      const stashLines = result
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      if (stashLines.length === 0) {
        console.log(
          box(
            "Stashes",
            [
              "No stashes to show.",
              "Use 'zgit stash' while you have local changes to save a stash.",
            ],
            { color: colors.yellow }
          )
        );
        return;
      }

      console.log(
        box(
          "Stashes",
          stashLines.map((line) => `● ${line}`),
          { color: colors.cyan, style: "open" }
        )
      );
      return;
    }

    await getGit().stash();
    console.log(
      box(
        "Stashed",
        [
          "Saved working directory and index state WIP.",
          "(use 'zgit stash list' to see stashes)",
          "(use 'zgit stash pop' to apply the latest stash)",
        ],
        { color: colors.yellow }
      )
    );
  } catch (error) {
    console.log(
      box(
        "Stash Failed",
        [error.stderr || error.message || "Something went wrong while running stash."],
        { color: colors.red }
      )
    );
  }
}

