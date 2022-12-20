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

/**
 * Using 'a tags' to attempt some validation, that it's not random
 * user comment twitch spam
 */
function getStreamersFromHTML(): string[] {
  return Array.from(document.getElementsByTagName("a"))
    .map(extractTwitchMatch)
    .filter(uniqueAndValid);
}

function uniqueAndValid(streamer, index, self) {
  return !removeList[streamer] && self.indexOf(streamer) === index;
}

function extractTwitchMatch(link: HTMLAnchorElement) {
  const text = link.innerText ?? "";
  const matches = text.match(/twitch.tv\/\w*/) ?? [];

  return matches?.[0]?.slice(TWITCH_URL_FRAGMENT.length).toLowerCase() ?? "";
}

const removeList = {
  "": true,
  gql: true,
};
