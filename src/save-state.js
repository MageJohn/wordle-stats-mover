const data = Object.keys(window.localStorage)
  .filter((key) => key.includes("wordle"))
  .reduce((obj, key) => {
    obj[key] = window.localStorage.getItem(key);
    return obj;
  }, /** @type{Record<string, string>} */ ({}));

const dataURI = `data:application/javascript,${encodeURIComponent(
  JSON.stringify(data)
)}`;

const a = document.createElement("a");
Object.assign(a, {
  href: dataURI,
  download: "wordle-backup.json",
  style: { display: "none" },
});

document.body.appendChild(a);
a.click();
document.body.remove(a);
