import { storage } from "src/storage";

let lastUrl = "";

storage.set({ streamerList: parseBody() });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "url_update") {
    if (request.url !== lastUrl) {
      lastUrl = request.url;
      console.log(parseBody());
      storage.set({ streamerList: parseBody() });
    }
  }
});

function parseBody(): string[] {
  const desc = document.body.outerHTML;
  const matches = desc.match(/twitch.tv\/\w*/g);

  if (!matches) {
    return [];
  }

  function uniqueOnly(value, index, self) {
    return self.indexOf(value) === index;
  }

  return matches.filter(uniqueOnly).map((url) => "https://www." + url);
}
