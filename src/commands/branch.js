import { getGit, colors, box, success } from "./utils.js";

export async function handleBranch(options) {
  const git = getGit();
  try {
    const toDelete = options.delete;
    if (toDelete) {
      await git.deleteLocalBranch(toDelete);
      console.log(
        box(
          "Branch",
          [`${success("Deleted branch:")} ${colors.bold}${toDelete}${colors.reset}`],
          { color: colors.red, icon: "" }
        )
      );
      return;
    }

    const branches = await git.branch();
    const list = branches.all.map((b) => {
      const active = branches.current === b;
      const marker = active ? `${colors.green}★${colors.reset}` : " ";
      return `${marker} ${colors.dim}${b}${colors.reset}`;
    });

    console.log(
      box(
        "Branches",
        [
          `Current: ${colors.bold}${branches.current}${colors.reset}`,
          "",
          ...list,
        ],
        { color: colors.cyan, icon: "" }
      )
    );
  } catch (err) {
    console.log(`${box("Branch Failed", [err.message], { color: colors.red, icon: "!" })}\n`);
  }
}
