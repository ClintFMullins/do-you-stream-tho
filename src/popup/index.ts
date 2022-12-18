import PopupContainer from "src/components/PopupContainer.svelte";

const target = document.getElementById("app");

function render() {
  new PopupContainer({ target });
}

document.addEventListener("DOMContentLoaded", render);
