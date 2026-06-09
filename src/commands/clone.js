import { getGit, colors, box, success, getPassthroughArgs } from "./utils.js";

export async function handleClone(url, path) {
  const passthrough = getPassthroughArgs("clone");
  if (passthrough.length) {
    try {
      const result = await getGit().raw(["clone", url, path, ...passthrough].filter(Boolean));
      console.log(result);
    } catch (err) {
      console.log(`${box("Clone Failed", [err.message], { color: colors.red })}\n`);
    }
    return;
  }
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

