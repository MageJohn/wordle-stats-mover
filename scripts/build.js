#!/usr/bin/env node
import * as esbuild from "esbuild";
import fs from "fs/promises";

const result = await esbuild.build({
  entryPoints: ["src/save-state.js", "src/load-state.js"],
  bundle: true,
  minify: true,
  outdir: "bookmarklets/",
  write: false,
  format: "iife",
  target: ["chrome108", "firefox102", "safari15", "edge109"],
});

await Promise.all(
  result.outputFiles.map((out) => {
    fs.writeFile(out.path, encodeURI(`javascript:${out.text}`));
  })
);
