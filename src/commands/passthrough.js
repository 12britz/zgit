import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { colors, box, error } from "./utils.js";

const exec = promisify(execFile);

export async function handlePassthrough(cmd, args) {
  try {
    const { stdout, stderr } = await exec("git", [cmd, ...args]);
    const output = [stdout, stderr].filter(Boolean).join("").trim();

    if (!output) {
      const ok = `${colors.green}${cmd}${colors.reset} completed with no output`;
      console.log(box(cmd, [ok], { color: colors.green }));
      return;
    }

    console.log(box(cmd, output.split("\n"), { color: colors.cyan, style: "open" }));
  } catch (err) {
    const msg = err.stderr || err.message || "Unknown error";
    console.log(box(`${cmd} failed`, msg.trim().split("\n"), { color: colors.red }));
  }
}
