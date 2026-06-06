import { getGit, colors, box, success } from "./utils.js";

export async function handleBranch(options) {
  const git = getGit();
  try {
    const toDelete = options.delete;
    if (toDelete) {
      await git.deleteLocalBranch(toDelete);
      console.log(
        box(
          "Branch",
          [`${success("Deleted branch:")} ${colors.bold}${toDelete}${colors.reset}`],
          { color: colors.red }
        )
      );
      return;
    }

    const branches = await git.branch();
    const list = branches.all.map((b) => {
      const active = branches.current === b;
      const details = branches.branches[b];
      
      const marker = active ? `${colors.green}●${colors.reset}` : " ";
      const nameStr = active 
        ? `${colors.green}${colors.bold}${b}${colors.reset}`
        : `${colors.white}${b}${colors.reset}`;
        
      const commitStr = details && details.commit
        ? ` ${colors.dim}[${details.commit.slice(0, 7)}]${colors.reset}`
        : "";
        
      const labelStr = details && details.label
        ? ` ${colors.gray}(${details.label})${colors.reset}`
        : "";
        
      return `${marker} ${nameStr}${commitStr}${labelStr}`;
    });

    console.log(
      box(
        "Branches",
        [
          `Current: ${colors.bold}${colors.green}${branches.current}${colors.reset}`,
          "",
          ...list,
        ],
        { color: colors.cyan }
      )
    );
  } catch (err) {
    console.log(`${box("Branch Failed", [err.message], { color: colors.red })}\n`);
  }
}

