import { h } from "dom-chef";
import { readFile } from "./utils";

import "./load-state.css";

/** @type {HTMLButtonElement} */
const submitButton = <button disabled>Submit</button>;

/** @type {HTMLInputElement} */
const fileInput = (
  <input
    type="file"
    id="bak-inp"
    accept="application/json"
    onChange={(e) => {
      submitButton.disabled = e.target.files.length === 0;
    }}
  />
);

document.body.appendChild(
  <div id="bak-overlay">
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        /** @type {File} */
        const file = fileInput.files[0];

        const data = await readFile(file);

        const json = JSON.parse(data);
        Object.entries(json).forEach(([key, value]) =>
          window.localStorage.setItem(key, value)
        );
        window.location.reload();
      }}
    >
      <label for={fileInput.id}>
        Open your <code>wordle-backup.json</code> file:
      </label>

      {fileInput}

      {submitButton}
    </form>
  </div>
);
