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
 * user comment with twitch link spam
 */
function getStreamersFromHTML(): string[] {
  return Array.from(document.getElementsByTagName("a"))
    .map(extractTwitchMatch)
    .filter(uniqueAndValid);
}

function uniqueAndValid(streamer: string, idx: number, self: string[]) {
  return validStreamer(streamer) && self.indexOf(streamer) === idx;
}

function extractTwitchMatch(link: HTMLAnchorElement) {
  const text = link.innerText ?? "";
  const matches = text.match(/twitch.tv\/\w*/) ?? [];

  return matches?.[0]?.slice(TWITCH_URL_FRAGMENT.length).toLowerCase() ?? "";
}

function validStreamer(streamer: string) {
  return !removeList[streamer];
}

const removeList = ["", "gql", "videos"].reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {});
