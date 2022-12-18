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

function getStreamersFromHTML(): string[] {
  const desc = document.body.outerHTML;
  const matches = desc.match(/twitch.tv\/\w*/g);

  if (!matches) {
    return [];
  }

  function uniqueOnly(value, index, self) {
    return self.indexOf(value) === index;
  }

  return matches
    .filter(uniqueOnly)
    .map((url) => url.split("twitch.tv/")[1])
    .filter((streamer) => !removeList[streamer]);
}

const removeList = {
  "": true,
  gql: true,
};
