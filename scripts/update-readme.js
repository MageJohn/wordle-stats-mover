#!/usr/bin/env node
import fs from "node:fs/promises";

const fileMatch = (name) =>
  RegExp(`(?<=<!-- ${name} -->\n).*?(?=\n<!-- END -->)`, "s");

const injectFile = (name, readme, contents) =>
  readme.replace(fileMatch(name), `\`\`\`js\n${contents}\n\`\`\``);

const [readme, saveState, loadState] = await Promise.all(
  ["README.md", "bookmarklets/save-state.js", "bookmarklets/load-state.js"].map(
    (f) => fs.readFile(f, { encoding: "utf8" })
  )
);

let result = injectFile("bookmarklets/save-state.js", readme, saveState);
result = injectFile("bookmarklets/load-state.js", result, loadState);

await fs.writeFile("README.md", result);
