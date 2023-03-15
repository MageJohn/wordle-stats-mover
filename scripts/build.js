#!/usr/bin/env node
import * as esbuild from "esbuild";
import fs from "fs/promises";
import process from "process";

const inspect = process.argv.includes("--inspect");

const result = await esbuild.build({
  entryPoints: ["src/save-state.js", "src/load-state.jsx"],
  bundle: true,
  minify: !inspect,
  outdir: "bookmarklets/",
  write: false,
  format: inspect ? "esm" : "iife",
  target: ["chrome108", "firefox102", "safari15", "edge109"],
  jsx: "transform",
  jsxFactory: "h",
  jsxFragment: "DocumentFragment",
  logLevel: "info",
});

if (inspect) {
  result.outputFiles.map((out) => {
    console.log(`${out.path}:`);
    console.log(out.text);
    console.log("-------");
  });
}

await Promise.all(
  result.outputFiles.map((out) => {
    fs.writeFile(out.path, encodeURI(`javascript:${out.text}`));
  })
);
