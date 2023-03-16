#!/usr/bin/env node
import fs from "node:fs/promises";
import process from "node:process";
import path from "node:path";

import * as esbuild from "esbuild";
import { source } from "common-tags";
import { outputFile } from "fs-extra/esm";

const debug = process.argv.includes("--debug");

/** @type {esbuild.Plugin} */
const cssInjector = {
  name: "css-injector",
  setup(build) {
    build.onResolve({ filter: /\.css$/ }, async (args) => {
      if (args.namespace === "css-injector-stub") {
        return {
          path: args.path,
          namespace: "css-injector-content",
        };
      } else if (args.resolveDir === "") {
        return;
      } else {
        return {
          path: path.isAbsolute(args.path)
            ? args.path
            : path.join(args.resolveDir, args.path),
          namespace: "css-injector-stub",
        };
      }
    });

    build.onLoad(
      { filter: /\.css$/, namespace: "css-injector-content" },
      async (args) => {
        const f = await fs.readFile(args.path);
        const css = await esbuild.transform(f, {
          loader: "css",
          minify: build.initialOptions.minify,
        });
        return { loader: "text", contents: css.code };
      }
    );
    build.onLoad(
      { filter: /\.css$/, namespace: "css-injector-stub" },
      async (args) => {
        return {
          loader: "js",
          contents: source`
            import css from ${JSON.stringify(args.path)};
            const style = document.createElement("style");
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
          `,
        };
      }
    );
  },
};

const outDir = debug ? "bookmarklets-debug/" : "bookmarklets/";

const result = await esbuild.build({
  entryPoints: ["src/save-state.js", "src/load-state.jsx"],
  bundle: true,
  minify: !debug,
  outdir: outDir,
  write: false,
  format: "iife",
  target: ["chrome108", "firefox102", "safari15", "edge109"],
  jsx: "transform",
  logLevel: "info",
  plugins: [cssInjector],
});

await Promise.all(
  result.outputFiles.map((out) => {
    outputFile(out.path, `javascript:${encodeURIComponent(out.text)}`);
  })
);
