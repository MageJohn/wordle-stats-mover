import { h } from "dom-chef";

function handleButtonClick() {
  const str = window.document.getElementById("gameStateInput").value;
  const json = JSON.parse(Buffer.from(str, "base64"));
  Object.entries(json).forEach(([key, value]) =>
    window.localStorage.setItem(key, value)
  );
  window.location.reload();
}

const div = (
  <div
    id="inputDiv"
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 10000,
      background: "white",
    }}
  >
    <textarea
      id="gameStateInput"
      style={{
        width: "100%",
        height: "150px",
        boxSizing: "border-box",
      }}
      placeholder="Paste your save here"
    />
    <button onClick={handleButtonClick}>Restore</button>
  </div>
);

window.document.body.appendChild(div);
