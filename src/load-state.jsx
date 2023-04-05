import { readFile } from "./utils";
import * as classes from "./load-state.css";

/** @type {HTMLButtonElement} */
let submitButton;
/** @type {HTMLInputElement} */
let fileInput;
/** @type {HTMLDivElement} */
let errorContainer;

document.body.append(
  <div class={classes.overlay}>
    <form
      onsubmit={async (event) => {
        event.preventDefault();

        const file = fileInput.files[0];

        const data = await readFile(file);

        let json;
        try {
          json = JSON.parse(data);
        } catch (error) {
          errorContainer.innerHTML = (
            <p>
              There was an error parsing the file <code>{file.name}</code>:{" "}
              <code class={classes.error}>{error.message}</code>
            </p>
          ).outerHTML;
          return;
        }
        for (const key in json) {
          localStorage.setItem(key, json[key]);
        }
        location.reload();
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
        onchange={() => {
          submitButton.disabled = fileInput.files.length === 0;
        }}
      />

      <button ref={(r) => (submitButton = r)} disabled>
        Submit
      </button>

      <div ref={(r) => (errorContainer = r)} />
    </form>
  </div>
);
