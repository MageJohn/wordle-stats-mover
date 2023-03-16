import * as React from "@turtlemay/jsx-dom";
import { readFile } from "./utils";

import "./load-state.css";

/** @type {HTMLButtonElement} */
let submitButton;
/** @type {HTMLInputElement} */
let fileInput;
/** @type {HTMLDivElement} */
let errorContainer;

document.body.appendChild(
  <div id="bak-overlay">
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const file = fileInput.files[0];

        const data = await readFile(file);

        let json;
        try {
          json = JSON.parse(data);
        } catch (error) {
          if (error instanceof SyntaxError) {
            errorContainer.innerHTML = (
              <p>
                There was an error parsing the file <code>{file.name}</code>:{" "}
                <code class="error">{error.message}</code>
              </p>
            ).outerHTML;
            return;
          } else {
            throw error;
          }
        }
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
        ref={(r) => (fileInput = r)}
        type="file"
        id="bak-inp"
        accept="application/json"
        onChange={(e) => {
          submitButton.disabled = e.target.files.length === 0;
        }}
      />

      <button ref={(r) => (submitButton = r)} disabled>
        Submit
      </button>

      <div id="err-container" ref={(r) => (errorContainer = r)} />
    </form>
  </div>
);
