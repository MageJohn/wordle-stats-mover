#!/usr/bin/env node
import fs from "node:fs/promises";
import process from "node:process";
import path from "node:path";

import * as esbuild from "esbuild";
import chalk from "chalk";
import { source } from "common-tags";

const inspect = process.argv.includes("--inspect");

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

const result = await esbuild.build({
  entryPoints: ["src/save-state.jsx", "src/load-state.jsx"],
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
  plugins: [cssInjector],
});

if (inspect) {
  result.outputFiles.map((out) => {
    console.log(chalk.green(`${out.path}:`));
    console.log(out.text);
    console.log("-------\n");
  });
}

await Promise.all(
  result.outputFiles.map((out) => {
    fs.writeFile(out.path, encodeURI(`javascript:${out.text}`));
  })
);
