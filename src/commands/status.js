import { getGit, colors, box, statusIcon, success, info, error } from "./utils.js";

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
      console.log(
        box("Clean", [`${success("Working tree is clean")}`], {
          color: colors.green,
        })
      );
      return;
    }

    const headerLines = [];
    headerLines.push(`${info("Branch:")}   ${colors.bold}${status.current}${colors.reset}`);
    if (status.tracking) {
      headerLines.push(`${info("Tracking:")} ${colors.dim}${status.tracking}${colors.reset}`);
    }

    const statusKeyMap = {
      STAGED: "A",
      CREATED: "A",
      MODIFIED: "M",
      DELETED: "D",
      RENAMED: "R",
      UNTRACKED: "?",
      CONFLICTS: "C"
    };

    const sectionColors = {
      STAGED: colors.green,
      CREATED: colors.green,
      MODIFIED: colors.yellow,
      DELETED: colors.red,
      RENAMED: colors.cyan,
      UNTRACKED: colors.orange,
      CONFLICTS: colors.magenta,
    };

    const bodyLines = [
      ...headerLines,
      "",
      ...sections.flatMap(([label, files]) => {
        const count = Array.isArray(files) ? files.length : 0;
        const labelColor = sectionColors[label] || colors.white;
        const sectionHeader = `${labelColor}${colors.bold}${label}${colors.reset} ${colors.dim}(${count})${colors.reset}`;
        
        const fileLines = files.map((f) => {
          const path = typeof f === "object" && f.from && f.to ? `${f.from} ➔ ${f.to}` : String(f.path || f);
          return `  ${statusIcon(statusKeyMap[label])} ${path}`;
        });
        
        return [sectionHeader, ...fileLines, ""];
      }),
    ];

    // Remove last trailing empty line from bodyLines if present
    if (bodyLines[bodyLines.length - 1] === "") {
      bodyLines.pop();
    }

    console.log(
      box(
        "Status",
        bodyLines,
        { color: colors.cyan }
      )
    );

    if ((status.staged || []).length) {
      console.log(`\n  ${success("Staged:")} ${colors.bold}${status.staged.length}${colors.reset} file(s) ready for commit\n`);
    }
  } catch (err) {
    console.log(`${error(err.message)}\n`);
  }
}

