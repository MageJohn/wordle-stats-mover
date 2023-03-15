import { h } from "dom-chef";

const data = Object.keys(window.localStorage)
  .filter((key) => key.includes("wordle"))
  .reduce((obj, key) => {
    obj[key] = window.localStorage.getItem(key);
    return obj;
  }, /** @type{Record<string, string>} */ ({}));

const dataURI = `data:application/javascript,${encodeURIComponent(
  JSON.stringify(data)
)}`;

const anchorElem = (
  <a href={dataURI} download="wordle-backup.json" style={{ display: "none" }} />
);

document.body.appendChild(anchorElem);
anchorElem.click();

document.body.remove(anchorElem);
