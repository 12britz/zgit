import { getGit, colors, box, success } from "./utils.js";

export async function handleTag(options) {
  const git = getGit();
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
          { color: colors.green, icon: "" }
        )
      );
      return;
    }

    const tags = await git.tags();
    if (!tags.all.length) {
      console.log(box("Tags", ["No tags found."], { color: colors.dim, icon: "" }));
      return;
    }

    console.log(
      box(
        "Tags",
        tags.all.map((t) => `${colors.yellow}${t}${colors.reset}`),
        { color: colors.yellow, icon: "" }
      )
    );
  } catch (err) {
    console.log(`${box("Tag Failed", [err.message], { color: colors.red, icon: "!" })}\n`);
  }
}
