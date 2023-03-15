import { createElement as h } from "@turtlemay/jsx-dom";
import { readFile } from "./utils";

import "./load-state.css";

/** @type {HTMLButtonElement} */
let submitButton;

/** @type {HTMLInputElement} */
let fileInput;

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
      <label for="bak-inp">
        Open your <code>wordle-backup.json</code> file:
      </label>

      <input
        ref={(r) => {
          fileInput = r;
        }}
        type="file"
        id="bak-inp"
        accept="application/json"
        onChange={(e) => {
          submitButton.disabled = e.target.files.length === 0;
        }}
      />

      <button
        ref={(r) => {
          submitButton = r;
        }}
        disabled
      >
        Submit
      </button>
    </form>
  </div>
);
