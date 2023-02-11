const MapOfWebsites = new Map();
const map = "map";
const totalSize = "totalSize";
let requestSize = 0;
let totalResponseSize;

chrome.storage.sync.get(["totalSize"], function (result) {
  totalResponseSize = result.totalSize !== undefined ? result.totalSize : 0;
});

urlFilter = "<all_urls>";

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var doesMapContainWebsite = MapOfWebsites.has(details.initiator);
    try {
      if (details.requestBody && details.requestBody.raw) {
        if (doesMapContainWebsite) {
          console.log(details.requestBody.raw);
          requestSize = details.requestBody.raw
            .map((chunk) => chunk.bytes.byteLength)
            .reduce((sum, length) => sum + length, 0);
          totalResponseSize += requestSize;
          MapOfWebsites.set(
            details.initiator,
            MapOfWebsites.get(details.initiator) + requestSize
          );
        } else {
          MapOfWebsites.set(details.initiator, requestSize);
        }
      }
    } catch (e) {}
  },
  { urls: [urlFilter] },
  ["extraHeaders", "requestBody"]
);

setInterval(() => {
  chrome.storage.sync.set(
    { map: JSON.stringify(Array.from(MapOfWebsites.entries())) },
    function () {}
  );

  chrome.storage.sync.set(
    { ["totalSize"]: totalResponseSize },
    function (result) {}
  );
}, 5000);

// chrome.tabs.onActivated.addListener(function (activeInfo) {
//   chrome.tabs.get(activeInfo.tabId, function (tab) {
//     const currTab = tab.url.toString();
//     console.log(tab);
//     console.log(MapOfWebsites.entries());
//   });
// });

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const currTab = tab.url.toString();
    console.log(MapOfWebsites);
    for (let [key, value] of Object.entries(MapOfWebsites)) {
      url.innerHTML = key;
      console.log(currTab, MapofWebsites[key]);
    }
  });
});
