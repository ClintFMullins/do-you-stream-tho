import { log } from "src/utils/logging";

function sendListToBackground() {
  const streamerList = getStreamersFromHTML();

  log("page, sending list", window.location, streamerList);

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

const TWITCH_URL_FRAGMENT = "twitch.tv/";

function getStreamersFromHTML(): string[] {
  function uniqueOnly(value, index, self) {
    return self.indexOf(value) === index;
  }

  return Array.from(document.getElementsByTagName("a"))
    .map((link) => link.innerText ?? "")
    .filter((text) => text.includes(TWITCH_URL_FRAGMENT))
    .map((text) => {
      const matches = text.match(/twitch.tv\/\w*/) ?? [];

      return matches?.[0].slice(TWITCH_URL_FRAGMENT.length) ?? "";
    })
    .filter(uniqueOnly)
    .filter((streamer) => !removeList[streamer]);
}

const removeList = {
  "": true,
  gql: true,
};
