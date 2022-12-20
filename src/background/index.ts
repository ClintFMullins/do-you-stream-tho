import { log } from "src/utils/logging";
import { getTwitchUsers } from "src/utils/twitch-api";

let streamerList = [];
/**
 * Listen for URL updates, trigger a new check
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // log("updated", tabId, changeInfo, tab);
  log("updated", tab.active, changeInfo.status);

  if (tab.active && changeInfo.status === "complete") {
    triggerStreamerCheck(tabId);
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

  chrome.tabs.sendMessage(tabId, {
    name: "check_for_streamers",
  });
}

/**
 * Handles messages sent from the popup and inject scripts
 */
chrome.runtime.onMessage.addListener((message, _sender, response) => {
  switch (message.name) {
    case "streamer_list": {
      log("background streamer_list", streamerList);

      streamerList = message.streamerList;
      updateIcon(message.streamerList.length !== 0);
      return;
    }
    case "request_list": {
      log("background request_list", streamerList);

      try {
        getTwitchUsers(streamerList)
          .then((streamersData) => {
            const parsedUsers = streamerList
              .map((streamer) => {
                return streamersData.data[streamer];
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
 * on load
 *  0. background is listening for updates from content
 *  1. content sends an update on load
 *
 * on url change
 *  0. background detects a url change
 *  1. background sends a message to content saying "update me"
 *  2. content sends an update
 *
 * on focus change
 *  0. when a new tab is in focus
 *  1. background sends a message to it saying "update me"
 *  2. content sends an update
 *
 *
 *  TODO:
 *  don't do check so often
 */
