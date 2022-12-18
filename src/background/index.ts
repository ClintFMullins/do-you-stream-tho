let streamerList = [];

/**
 * Listen for URL updates, trigger a new check
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("updated", tabId, changeInfo, tab);

  if (tab.active && changeInfo.status === "complete") {
    triggerStreamerCheck(tabId);
  }
});

/**
 * Listen for active tab updates, trigger a new check
 */
chrome.tabs.onActivated.addListener((activeInfo) => {
  triggerStreamerCheck(activeInfo.tabId);
});

/**
 * Send a message that triggers a new check
 */
function triggerStreamerCheck(tabId: number) {
  console.log("sending check request");

  chrome.tabs.sendMessage(tabId, {
    name: "check_for_streamers",
  });
}

/**
 * When we receive a new check, update our icon and local vars
 */
chrome.runtime.onMessage.addListener((message, sender, response) => {
  switch (message.name) {
    case "streamer_list": {
      console.log("background receiving streamerList", streamerList);

      streamerList = message.streamerList;
      updateIcon(message.streamerList.length !== 0);
      return;
    }
    case "request_list": {
      response(streamerList);
      return;
    }
    default: {
      // no-op
    }
  }
});

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
