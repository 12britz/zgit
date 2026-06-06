import { getGit, colors, box, statusIcon, colorStatus, success, info } from "./utils.js";

export async function handleStatus(options) {
  const git = getGit();
  try {
    const status = await git.status();

    const sections = [
      ["STAGED", status.staged],
      ["CREATED", status.created],
      ["MODIFIED", status.modified],
      ["DELETED", status.deleted],
      ["RENAMED", status.renamed],
      ["UNTRACKED", status.not_added],
      ["CONFLICTS", status.conflicted],
    ].filter(([, files]) => files && files.length);

    if (!sections.length) {
      // Pretty top-left box
      console.log(
        box("Clean", [`${success("Working tree is clean")}`], {
          color: colors.green,
          icon: "",
        })
      );
      return;
    }

    const headerLines = [];
    headerLines.push(`${info("Branch:")} ${colors.bold}${status.current}${colors.reset}`);
    if (status.tracking) {
      headerLines.push(`${info("Tracking:")} ${colors.dim}${status.tracking}${colors.reset}`);
    }

    console.log(
      box(
        "Status",
        [
          ...headerLines,
          "",
          ...sections.flatMap(([label, files]) => {
            const count = Array.isArray(files) ? files.length : 0;
            const sectionHeader = `${colors.yellow}${label} ${String(count)} item(s)${colors.reset}`;
            const fileLines = files.map((f) => {
              const path = Array.isArray(f) ? f.path || f : f;
              return `  ${statusIcon("?")} ${path}`;
            });
            return [sectionHeader, ...fileLines];
          }),
        ],
        { color: colors.cyan, icon: "" }
      )
    );

    if ((status.staged || []).length) {
      console.log(`${success("Staged:")} ${String(status.staged.length)} file(s)`);
    }
  } catch (err) {
    console.log(`${error(err.message)}\n`);
  }
}
