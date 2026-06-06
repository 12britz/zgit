import { getGit, colors, box, success } from "./utils.js";

export async function handleClone(url, path) {
  const target = path || url.split("/").pop().replace(/\.git$/, "") || "repo";
  try {
    await getGit().clone(url, target);
    console.log(
      box(
        "Cloned",
        [
          `${success("Success")}`,
          ``,
          `From: ${colors.cyan}${url}${colors.reset}`,
          `To:   ${colors.bold}${target}${colors.reset}`,
        ],
        { color: colors.green }
      )
    );
  } catch (err) {
    console.log(`${box("Clone Failed", [err.message], { color: colors.red })}\n`);
  }
}

