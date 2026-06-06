import { getGit, colors, box, success } from "./utils.js";

export async function handleAdd(paths) {
  const git = getGit();
  try {
    const files = paths.length ? paths : ["."];
    await git.add(files);
    console.log(
      box(
        "Added",
        [files.join(", "), "", `${success("Ready for commit")}`],
        { color: colors.green }
      )
    );
  } catch (err) {
    console.log(`${box("Add Failed", [err.message], { color: colors.red })}\n`);
  }
}

