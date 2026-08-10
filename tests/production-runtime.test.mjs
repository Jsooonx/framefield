import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const PORT = 3102;
const PROJECT_ROOT = fileURLToPath(new URL("..", import.meta.url));

function startProductionServer() {
  const nextCli = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
  return spawn(process.execPath, [nextCli, "start", "-p", String(PORT)], {
    cwd: PROJECT_ROOT,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
}

function waitForServer(server) {
  return new Promise((resolve, reject) => {
    let output = "";
    const timer = setTimeout(() => {
      reject(new Error(`Production server did not start.\n${output}`));
    }, 10000);

    const handleOutput = (chunk) => {
      output += chunk.toString();
      if (output.includes("Ready")) {
        clearTimeout(timer);
        resolve();
      }
    };

    server.stdout.on("data", handleOutput);
    server.stderr.on("data", handleOutput);
    server.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
  });
}

test("production build serves homepage, icon, and Material Office preview", async (t) => {
  const server = startProductionServer();
  t.after(() => server.kill());

  await waitForServer(server);

  const [homepage, icon, materialOffice] = await Promise.all([
    fetch(`http://localhost:${PORT}/`),
    fetch(`http://localhost:${PORT}/icon.svg`),
    fetch(`http://localhost:${PORT}/library/sections/material-office`),
  ]);

  assert.equal(homepage.status, 200);
  assert.equal(icon.status, 200);
  assert.equal(materialOffice.status, 200);
});
