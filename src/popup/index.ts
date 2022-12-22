import StreamerList from "src/components/StreamerList.svelte";
import "./global.css";

const target = document.getElementById("app");

function render() {
  new StreamerList({ target });
}

document.addEventListener("DOMContentLoaded", render);
