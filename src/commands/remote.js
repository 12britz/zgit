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
          { color: colors.green }
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
          { color: colors.yellow }
        )
      );
      return;
    }

    const lines = remotes.map((r) => ({
      name: r.name,
      fetch: r.refs?.fetch || "",
      push: r.refs?.push || "",
    }));

    const formattedLines = lines.flatMap((r) => [
      `● ${colors.bold}${colors.cyan}${r.name}${colors.reset}`,
      `  ${colors.dim}fetch ➔ ${r.fetch}${colors.reset}`,
      `  ${colors.dim}push  ➔ ${r.push}${colors.reset}`,
      "",
    ]);

    // Remove the last empty line
    if (formattedLines[formattedLines.length - 1] === "") {
      formattedLines.pop();
    }

    console.log(
      box(
        "Remotes",
        formattedLines,
        { color: colors.cyan }
      )
    );
  } catch (err) {
    console.log(`${box("Remote Failed", [err.message], { color: colors.red })}\n`);
  }
}

