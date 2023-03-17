#!/usr/bin/env node
import fs from "node:fs/promises";
import process from "node:process";
import path from "node:path";
import { performance } from "node:perf_hooks";

import * as esbuild from "esbuild";
import { source } from "common-tags";
import { outputFile } from "fs-extra/esm";
import { filesize } from "filesize";
import chalk from "chalk";

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
        if (build.initialOptions.jsx === "automatic") {
          return {
            resolveDir: path.dirname(args.path),
            loader: "jsx",
            contents: source`
              import css from ${JSON.stringify(args.path)};
              document.head.appendChild(<style>{css}</style>);
            `,
          };
        } else {
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
      }
    );
  },
};

/** @type {esbuild.Plugin} */
const bookmarkletOutput = {
  name: "bookmarklet-output",
  setup(build) {
    const encoder = new TextEncoder();

    const options = build.initialOptions;

    if (options.format && options.format !== "iife") {
      console.warn(
        'Overriding output format to "iife" for bookmarklet support.'
      );
    }
    build.initialOptions.format = "iife";

    const write = options.write || true;
    options.write = false;

    build.onEnd(async ({ errors, outputFiles }) => {
      if (!errors.length && outputFiles?.length && write) {
        await Promise.all(
          outputFiles.map(async (out) => {
            out.contents = encoder.encode(encodeURI(`javascript:${out.text}`));
            if (write) {
              await outputFile(out.path, out.text);
            }
          })
        );
      }
    });
  },
};

const outDir = debug ? "bookmarklets-debug/" : "bookmarklets/";

const start = performance.now();

const result = await esbuild.build({
  entryPoints: ["src/save-state.js", "src/load-state.jsx"],
  bundle: true,
  minify: !debug,
  outdir: outDir,
  target: ["chrome108", "firefox102", "safari15", "edge109"],
  jsx: "automatic",
  jsxImportSource: "./jsx",
  plugins: [cssInjector, debug ? null : bookmarkletOutput].filter((v) => v),
});

const elapsedTime = performance.now() - start;

if (result.outputFiles?.length) {
  for (const file of result.outputFiles) {
    const relPath = path.relative(process.cwd(), file.path);
    const size = filesize(file.contents.byteLength);

    console.log(`  ${chalk.bold(relPath)} ${chalk.cyan(size)}`);
  }
  console.log();
}

console.log(chalk.green(`⚡ Done in ${Math.round(elapsedTime)} ms`));
