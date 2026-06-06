import { colors, box, info } from "./utils.js";

export function handleHelp() {
  const lines = [
    "init [path]             Initialize repository",
    "clone <url> [path]      Clone repository",
    "status / st             Show working tree state",
    "log                     Show commit history",
    "diff [file]             Show working changes",
    "add [path]              Stage files",
    "commit -m 'msg'         Create commit",
    "branch                  List / manage branches",
    "switch / sw <name>      Switch branch",
    "stash                   Save / pop / list stashes",
    "reset [ref]             Reset changes",
    "merge <branch>          Merge branch",
    "pull [remote]           Fetch and integrate",
    "push [remote]           Upload commits",
    "remote                  Manage remotes",
    "tag [name]              List / create tags",
    "",
    `${info("Run")} ${colors.bold}zgit <command> --help${colors.reset} ${info("for details")}`,
  ];

  console.log(box("COMMANDS", lines, { color: colors.cyan }));
}
