import { log } from "src/utils/logging";

function sendListToBackground() {
  const streamerList = getStreamersFromHTML();

  log("page, sending list", streamerList);

  chrome.runtime.sendMessage({
    name: "streamer_list",
    streamerList,
  });
}

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.name !== "check_for_streamers") {
    return true;
  }

  sendListToBackground();

  return true;
});

const TWITCH_URL = "https://twitch.tv/";

function getStreamersFromHTML(): string[] {
  function uniqueOnly(value, index, self) {
    return self.indexOf(value) === index;
  }

  return Array.from(document.getElementsByTagName("a"))
    .map((link) => link.innerText ?? "")
    .filter((text) => text.includes(TWITCH_URL))
    .map((text) => {
      const matches = text.match(/https:\/\/twitch.tv\/\w*/) ?? [];
      return matches[0].slice(TWITCH_URL.length);
    })
    .filter(uniqueOnly)
    .filter((streamer) => !removeList[streamer]);
}

const removeList = {
  "": true,
  gql: true,
};
