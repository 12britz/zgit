import { getGit, colors, box, success, getPassthroughArgs } from "./utils.js";

export async function handleAdd(paths) {
  const passthrough = getPassthroughArgs("add");
  const git = getGit();
  if (passthrough.length) {
    try {
      const files = paths.length ? paths : ["."];
      const result = await git.raw(["add", ...files, ...passthrough]);
      console.log(result || "");
    } catch (err) {
      console.log(`${box("Add Failed", [err.message], { color: colors.red })}\n`);
    }
    return;
  }
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

