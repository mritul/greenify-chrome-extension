chrome.webRequest.onSendHeaders.addListener(
  function (details) {
    console.log(
      "Request size:",
      details.requestHeaders.map((header) => header.value).join("").length
    );
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders"]
);
