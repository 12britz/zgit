import { getGit, colors, box, success } from "./utils.js";

export async function handleRemote(options) {
  const git = getGit();
  try {
    if (options.addName && options.addUrl) {
      await git.addRemote(options.addName, options.addUrl);
      console.log(
        box(
          "Remote",
          [
            `${success("Added")}`,
            ``,
            `Name: ${colors.bold}${options.addName}${colors.reset}`,
            `URL:  ${colors.cyan}${options.addUrl}${colors.reset}`,
          ],
          { color: colors.green, icon: "" }
        )
      );
      return;
    }

    const remotes = await git.getRemotes(true);
    if (!remotes.length) {
      console.log(
        box(
          "Remotes",
          ["No remotes configured.", `${colors.dim}Try: zgit remote --add-name origin --add-url <url>${colors.reset}`],
          { color: colors.yellow, icon: "" }
        )
      );
      return;
    }

    const lines = remotes.map((r) => ({
      name: colors.bold(r.name),
      fetch: r.refs?.fetch || "",
      push: r.refs?.push || "",
    }));

    console.log(
      box(
        "Remotes",
        [
          ...lines.flatMap((r) => [
            `${r.name} ${colors.dim}(fetch)${colors.reset}`,
            `  ${colors.dim}${r.fetch}${colors.reset}`,
            `${colors.dim}(push)${colors.reset}`,
            `  ${colors.dim}${r.push}${colors.reset}`,
            "",
          ]),
        ],
        { color: colors.cyan, icon: "" }
      )
    );
  } catch (err) {
    console.log(`${box("Remote Failed", [err.message], { color: colors.red, icon: "!" })}\n`);
  }
}
