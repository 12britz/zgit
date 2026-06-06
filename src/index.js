#!/usr/bin/env node

import { Command } from "commander";
import { showBanner } from "./banner.js";
import { box, colors } from "./commands/utils.js";
import { handleStatus } from "./commands/status.js";
import { handleLog } from "./commands/log.js";
import { handleDiff } from "./commands/diff.js";
import { handleAdd } from "./commands/add.js";
import { handleCommit } from "./commands/commit.js";
import { handleBranch } from "./commands/branch.js";
import { handleSwitch } from "./commands/switch.js";
import { handleStash } from "./commands/stash.js";
import { handleReset } from "./commands/reset.js";
import { handleMerge } from "./commands/merge.js";
import { handlePullPush } from "./commands/pullpush.js";
import { handleInit } from "./commands/init.js";
import { handleClone } from "./commands/clone.js";
import { handleRemote } from "./commands/remote.js";
import { handleTag } from "./commands/tag.js";
import { handleHelp } from "./commands/help.js";

const program = new Command();

program
  .name("zgit")
  .description("A beautifully colored git alternative with stunning box-style output")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize a new git repository")
  .argument("[path]", "directory to initialize")
  .action((path) => handleInit(path));

program
  .command("clone")
  .description("Clone a repository")
  .argument("<url>", "repository URL")
  .argument("[path]", "directory to clone into")
  .action((url, path) => handleClone(url, path));

program
  .command("status")
  .alias("st")
  .description("Show working tree status")
  .option("-s, --short", "short format")
  .option("--branch", "show branch info")
  .action((opts) => handleStatus(opts));

program
  .command("log")
  .description("Show commit history")
  .option("-n, --count <number>", "number of commits", "5")
  .option("--graph", "show ASCII graph")
  .option("--oneline", "compact format")
  .action((opts) => handleLog(opts));

program
  .command("diff")
  .description("Show changes between commits or working tree")
  .option("--cached", "staged changes only")
  .argument("[file]", "specific file")
  .action((opts, file) => handleDiff(opts, file));

program
  .command("add")
  .description("Stage changes")
  .argument("[paths...]", "file(s) to stage")
  .action((paths) => handleAdd(paths));

program
  .command("commit")
  .description("Record changes to repository")
  .option("-m, --message <msg>", "commit message")
  .option("-a, --all", "commit all tracked changes")
  .option("--amend", "amend previous commit")
  .action((opts) => handleCommit(opts));

program
  .command("branch")
  .description("List or manage branches")
  .option("-d, --delete <name>", "delete branch")
  .option("-m, --move <name>", "rename branch")
  .option("--list", "list branches")
  .action((opts) => handleBranch(opts));

program
  .command("switch")
  .alias("sw")
  .description("Switch branches or restore files")
  .argument("<name>", "branch name")
  .action((name) => handleSwitch(name));

program
  .command("stash")
  .description("Stash changes")
  .option("--pop", "apply and remove stash")
  .option("--list", "list stashes")
  .action((opts) => handleStash(opts));

program
  .command("reset")
  .description("Reset changes")
  .argument("[ref]", "commit reference", "HEAD")
  .option("--soft", "soft reset")
  .option("--hard", "hard reset")
  .action((ref, opts) => handleReset(ref, opts));

program
  .command("merge")
  .description("Merge branches")
  .argument("<branch>", "branch to merge")
  .action((branch) => handleMerge(branch));

program
  .command("pull")
  .description("Fetch and integrate changes")
  .argument("[remote]", "remote name", "origin")
  .action((remote) => handlePullPush("pull", remote));

program
  .command("push")
  .description("Upload changes to remote")
  .argument("[remote]", "remote name", "origin")
  .action((remote) => handlePullPush("push", remote));

program
  .command("remote")
  .description("Manage remotes")
  .option("-v, --verbose", "show URLs")
  .option("--add-name <name>", "add remote name")
  .option("--add-url <url>", "add remote url")
  .action((opts) => handleRemote(opts));

program
  .command("tag")
  .description("List or create tags")
  .argument("[name]", "optional tag name")
  .option("-m, --message <msg>", "annotation message")
  .action((opts, name) => handleTag({ ...opts, name }));

if (process.argv.length <= 2) {
  console.log(showBanner());
  handleHelp();
  process.exit(0);
}

program.parse(process.argv);
