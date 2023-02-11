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

let requestSize = 0;
let responseSize = 0;

urlFilter = "<all_urls>";

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    console.log(details);
    if (details.requestBody) {
      requestSize += details.requestBody.raw
        .map((chunk) => chunk.bytes.byteLength)
        .reduce((sum, length) => sum + length, 0);
      console.log("Request size:", requestSize);
    }
  },
  { urls: [urlFilter] },
  ["extraHeaders", "requestBody"]
);

// chrome.webRequest.onCompleted.addListener(
//   function (details) {
//     responseSize += details.responseHeaders
//       .map((header) => header.value)
//       .join("").length;
//     responseSize += details.bodySize;
//     console.log("Response size:", responseSize);
//   },
//   { urls: [urlFilter] },
//   ["responseHeaders"]
// );
