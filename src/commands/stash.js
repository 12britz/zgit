import { getGit, colors, box, getPassthroughArgs } from "./utils.js";

export async function handleStash(options) {
  const passthrough = getPassthroughArgs("stash");
  const hasSubcommand = passthrough.length > 0;
  const isList = options.list || (hasSubcommand && passthrough[0] === "list");
  const isPop = options.pop || (hasSubcommand && passthrough[0] === "pop");

  try {
    if (isPop) {
      const result = await getGit().raw(["stash", "pop"]);
      const lines = result.trim().split("\n").filter(Boolean);
      console.log(box("Stash", lines.length ? lines : ["Popped."], { color: colors.green }));
      return;
    }

    if (isList) {
      const result = await getGit().raw(["stash", "list"]);
      const lines = result.trim().split("\n").filter(Boolean);
      console.log(lines.length
        ? box("Stashes", lines.map((l) => `● ${l}`), { color: colors.cyan, style: "open" })
        : box("Stashes", ["No stashes."], { color: colors.yellow }));
      return;
    }

    if (hasSubcommand) {
      const result = await getGit().raw(["stash", ...passthrough]);
      console.log(result.trim() || box("Stash", ["Done"], { color: colors.green }));
      return;
    }

    await getGit().raw(["stash"]);
    console.log(box("Stashed", ["Saved WIP.", "use 'zgit stash list' to see stashes."], { color: colors.yellow }));
  } catch (err) {
    console.log(box("Stash Failed", [err.stderr || err.message], { color: colors.red }));
  }
}

