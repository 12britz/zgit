import { getGit, colors, box, success, getPassthroughArgs } from "./utils.js";

export async function handleTag(options) {
  const passthrough = getPassthroughArgs("tag");
  const git = getGit();
  if (passthrough.length) {
    try {
      const args = ["tag", ...passthrough];
      if (options.name && !passthrough.includes(options.name)) args.push(options.name);
      if (options.message) args.push("-m", options.message);
      const result = await git.raw(args);
      console.log(result);
    } catch (err) {
      console.log(`${box("Tag Failed", [err.message], { color: colors.red })}\n`);
    }
    return;
  }
  try {
    const name = options.name;
    if (name) {
      if (options.message) await git.addAnnotatedTag(name, options.message);
      else await git.addTag(name);
      console.log(
        box(
          "Tag",
          [
            `${success("Created")}`,
            "",
            `Name:    ${colors.bold}${name}${colors.reset}`,
            options.message ? `Message: ${colors.dim}${options.message}${colors.reset}` : "",
          ],
          { color: colors.green }
        )
      );
      return;
    }

    const tags = await git.tags();
    if (!tags.all.length) {
      console.log(box("Tags", ["No tags found."], { color: colors.yellow }));
      return;
    }

    console.log(
      box(
        "Tags",
        tags.all.map((t) => `● ${colors.yellow}${t}${colors.reset}`),
        { color: colors.yellow }
      )
    );
  } catch (err) {
    console.log(`${box("Tag Failed", [err.message], { color: colors.red })}\n`);
  }
}

