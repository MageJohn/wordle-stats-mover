const data = Object.keys(window.localStorage)
  .filter((key) => key.includes("wordle"))
  .reduce((obj, key) => {
    obj[key] = window.localStorage.getItem(key);
    return obj;
  }, /** @type{Record<string, string?>} */ ({}));

const dataURI = `data:application/javascript,${encodeURIComponent(
  JSON.stringify(data)
)}`;

const date = new Date();
const localDate = new Date(date.valueOf() - date.getTimezoneOffset() * 60e3);
const localDateString = localDate.toISOString().split("T")[0];
const name = `wordle-backup-${localDateString}.json`;

const a = document.createElement("a");
Object.assign(a, {
  href: dataURI,
  download: name,
  style: { display: "none" },
});

document.body.appendChild(a);
a.click();
a.remove();
