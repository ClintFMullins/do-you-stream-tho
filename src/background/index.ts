import { debounce } from "src/utils/debounce";
import { log } from "src/utils/logging";
import { getTwitchUsers } from "src/utils/twitch-api";

let streamerList = [];
let clearLastDelayedCheck = () => {};
/**
 * Listen for URL updates, trigger a new check
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  log("updated", tab.active, changeInfo.status);

  if (tab.active && changeInfo.status === "complete") {
    triggerStreamerCheck(tabId);
    clearLastDelayedCheck = delayedStreamerCheck(tabId);
  }

  return true;
});

/**
 * Listen for active tab updates, trigger a new check
 */
chrome.tabs.onActivated.addListener((activeInfo) => {
  triggerStreamerCheck(activeInfo.tabId);

  return true;
});

/**
 * Send a message that triggers a new check
 */
function triggerStreamerCheck(tabId: number) {
  log("sending check request");

  // Clear any delayed calls before sending a new one
  clearLastDelayedCheck();

  chrome.tabs.sendMessage(tabId, {
    name: "check_for_streamers",
  });
}

/**
 * Send a delayed message that triggers a new check.
 * Race conditions here we come!
 */
const delayedStreamerCheck = debounce(triggerStreamerCheck, 2000);

/**
 * Handles messages sent from the popup and inject scripts
 */
chrome.runtime.onMessage.addListener((message, _sender, response) => {
  switch (message.name) {
    case "streamer_list": {
      log("background streamer_list", streamerList);

      streamerList = message.streamerList;
      if (message.streamerList.length !== 0) {
        updateIcon(true);
        chrome.action.setBadgeText({
          text: `${message.streamerList.length}`,
        });
      } else {
        updateIcon(false);
        chrome.action.setBadgeText({ text: "" });
      }

      return;
    }
    case "request_list": {
      log("background request_list", streamerList);

      try {
        getTwitchUsers(streamerList)
          .then((streamersData) => {
            const parsedUsers = streamerList
              .map((streamer) => {
                return streamersData.data?.[streamer] ?? null;
              })
              .filter((streamer) => !!streamer);

            log("background request_list resp", parsedUsers);

            response(parsedUsers);
          })
          .catch((err) => {
            throw err;
          });
      } catch (err) {
        response([]);
        throw err;
      }
    }
    default: {
      // no-op
    }
  }

  return true;
});

/**
 * Update our icon to show if there are Twitch streamers present on the current page
 */
function updateIcon(showing: boolean) {
  chrome.action.setIcon({
    path: `src/assets/icons/stream_${showing ? "on" : "off"}_16.png`,
  });
}
/**
 * - update icon to be actually ok
 */
