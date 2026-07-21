import { spawn } from "child_process";

const [, , script, ...args] = process.argv;
const nodePath = process.env.npm_node_execpath || process.execPath;

if (!script) {
  console.error("Usage: node scripts/npm-node.mjs <script> [...args]");
  process.exit(1);
}

const child = spawn(nodePath, [script, ...args], {
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
