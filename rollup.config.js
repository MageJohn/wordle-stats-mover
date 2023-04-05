import { defineConfig } from "rollup";
import stringHash from "string-hash";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import esbuild from "rollup-plugin-esbuild-transform";
import { transformSync } from "esbuild";

const bookmarklet = () => ({
  name: "bookmarklet",
  renderChunk: (code) => ({
    code: `javascript:${encodeURI(code)}`,
  }),
});

const bookmarkletConfig = (input) =>
  defineConfig({
    input,
    output: [
      {
        dir: "bookmarklets",
        format: "iife",
        strict: false,
        generatedCode: "es2015",
        plugins: [
          // aggressively minify code. each option has been tested and confirmed
          // to reduce bundle size. if the code changes substantially, size
          // might be improved by fiddling with these options
          terser({
            ecma: 2016,
            compress: {
              passes: 2,
              unsafe_arrows: true,
            },
            format: {
              // optimal would be a version of option 0 with single quotes, but this works
              quote_style: 1,
            },
          }),
          bookmarklet(),
        ],
      },
    ],
    plugins: [
      // resolve node modules
      resolve(),
      // a convenient and fast jsx transform
      esbuild([{ loader: "jsx", jsx: "automatic", jsxImportSource: "./jsx" }]),
      // minify and inject css
      postcss({
        // custom injection code that relies on the JSX transform
        inject: (cssVariableName) =>
          transformSync(
            `document.head.append(<style>{${cssVariableName}}</style>);`,
            { loader: "jsx", jsx: "automatic", jsxImportSource: "./jsx" }
          ).code,
        modules: {
          // this presents a slight risk of not being unique enough, but should
          // be fine.
          generateScopedName(name, filename, css) {
            const hash = stringHash(`${filename}\x00${name}\x00${css}`)
              .toString(36)
              .substring(0, 5);
            return `_${hash}`;
          },
        },
        // supposedly the default, but leaving it undefined causes a bug when
        // setting `modules` to an object.
        autoModules: false,
        namedExports: true,
        minimize: true,
      }),
    ],
  });

export default [
  bookmarkletConfig("src/load-state.jsx"),
  bookmarkletConfig("src/save-state.js"),
];
