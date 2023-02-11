// let responseSize = 0;

// //Request Header Size
// chrome.webRequest.onSendHeaders.addListener(
//   function (details) {
//     console.log(
//       "Request Header size:",
//       details.requestHeaders.map((header) => header.value).join("").length
//     );
//   },
//   { urls: ["<all_urls>"] },
//   ["requestHeaders"]
// );

// // Response Header Size
// chrome.webRequest.onHeadersReceived.addListener(
//   function (details) {
//     console.log(
//       "Response Header size:",
//       details.responseHeaders.map((header) => header.value).join("").length
//     );
//   },
//   { urls: ["<all_urls>"] },
//   ["responseHeaders"]
// );

const MapOfWebsites = new Map();

let requestSize = 0;
let responseSize = 0;

urlFilter = "<all_urls>";

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var doesMapContainWebsite = MapOfWebsites.has(details.initiator);
    console.log(details);
    if (details.requestBody) {
      if (doesMapContainWebsite) {
        requestSize = details.requestBody.raw
          .map((chunk) => chunk.bytes.byteLength)
          .reduce((sum, length) => sum + length, 0);
        MapOfWebsites.set(
          details.initiator,
          MapOfWebsites.get(details.initiator) + requestSize
        );
      } else {
        MapOfWebsites.set(details.initiator, requestSize);
      }

      console.log(MapOfWebsites);
    }
  },
  { urls: [urlFilter] },
  ["extraHeaders", "requestBody"]
);
