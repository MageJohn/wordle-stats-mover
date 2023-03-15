const page = window.open("about:blank").document;
page.write(
  '<!DOCTYPE html><html><head><title>Wordle Save</title><meta name="viewport" content="width=device-width" /></head><body></body></html>'
);
page.close();

const outputContainer = page.body.appendChild(page.createElement("pre"));
outputContainer.style = {
  ...outputContainer.style,
  overflow: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const data = Object.keys(window.localStorage)
  .filter((key) => key.includes("wordle"))
  .reduce((obj, key) => {
    obj[key] = window.localStorage.getItem(key);
    return obj;
  }, /** @type{Record<string, string>} */ ({}));

outputContainer.appendChild(page.createTextNode(btoa(JSON.stringify(data))));
