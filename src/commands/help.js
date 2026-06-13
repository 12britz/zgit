import { colors, box, info } from "./utils.js";

export function handleHelp() {
  const commandList = [
    ["init [path]", "Initialize repository"],
    ["clone <url> [path]", "Clone repository"],
    ["status / st", "Show working tree state"],
    ["log", "Show commit history"],
    ["diff [file]", "Show working changes"],
    ["add [paths...]", "Stage changes"],
    ["commit", "Record changes to repository"],
    ["branch", "List / manage branches"],
    ["switch / sw <name>", "Switch branch"],
    ["stash", "Save / pop / list stashes"],
    ["reset [ref]", "Reset changes"],
    ["merge <branch>", "Merge branch"],
    ["pull [remote]", "Fetch and integrate"],
    ["push [remote]", "Upload commits"],
    ["remote", "Manage remotes"],
    ["tag [name]", "List / create tags"],
  ];

  const maxCmdLen = Math.max(...commandList.map(([cmd]) => cmd.length));
  const lines = commandList.map(([cmd, desc]) => {
    const paddedCmd = cmd.padEnd(maxCmdLen);
    const mainCmd = cmd.split(" ")[0];
    const restCmd = cmd.slice(mainCmd.length);
    return `${colors.magenta}${mainCmd}${colors.reset}${colors.white}${restCmd.padEnd(maxCmdLen - mainCmd.length)}${colors.reset}  ${colors.dim}➔  ${desc}${colors.reset}`;
  });

  console.log(box("commands", lines, { color: colors.cyan }));
  console.log(`  ${info("Run")} ${colors.bold}zgit <command>${colors.reset} ${info("— all native git commands also work")}\n`);
}
