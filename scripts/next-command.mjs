import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const [, , command, ...args] = process.argv;

if (!command) {
  console.error("Usage: node scripts/next-command.mjs <command>");
  process.exit(1);
}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextBin, command, ...args], {
  cwd: root,
  env: process.env,
  shell: false,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
