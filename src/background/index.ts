import { storage } from "../storage";

chrome.tabs.onUpdated.addListener(
  async (
    id: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  ) => {
    if (
      !tab.url?.startsWith("https://www.youtube.com") ||
      changeInfo.status !== "complete"
    ) {
      return;
    }

    getTwitchHandles(id, (handles) => {
      console.log(handles);
    });
  }
);

function getTwitchHandles(tabId, callback: (handles: string[]) => void) {
  chrome.scripting.executeScript(
    {
      target: { tabId },
      func: parseBody,
    },
    (injectionResult) => {
      callback(injectionResult[0].result);
    }
  );
}

function parseBody() {
  const desc = document.body.outerHTML;
  const matches = desc.match(/twitch.tv\/\w*/g);
  function filterUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  console.log(matches);
  return matches.filter(filterUnique).map((url) => "https://www." + url);
}
