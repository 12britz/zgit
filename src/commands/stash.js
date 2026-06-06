import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { getGit, colors, box, success } from "./utils.js";

const exec = promisify(execFile);

export async function handleStash(options) {
  try {
    if (options.pop) {
      const { stdout } = await exec("git", ["stash", "pop"]);
      console.log(
        box(
          "Stash",
          [
            stdout.trim() || "Popped the most recent stash and restored the working tree.",
            `You can continue working on the files you just restored.`,
          ],
          { color: colors.green }
        )
      );
      return;
    }

    if (options.list) {
      const { stdout } = await exec("git", ["stash", "list"]);
      const stashLines = stdout
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
            { color: colors.dim, title: "Stashes" }
          )
        );
        return;
      }

      console.log(
        box(
          "Stashes",
          stashLines.map((line) => line),
          { color: colors.cyan, title: "Stashes" }
        )
      );
      return;
    }

    await getGit().stash();
    console.log(
      box(
        "Stashed",
        [
          "Saved working directory and index state WIP on <branch>: <commit>",
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
