console.log('get initiated once')
const MapOfWebsites= new Map()

chrome.webRequest.onSendHeaders.addListener(
  function (details) {
    let WebsiteValue = Number(details.requestHeaders.map((header) => header.value).join("").length)
    var doesMapContainWebsite = MapOfWebsites.has(details.initiator)
    console.log(details)
    if (doesMapContainWebsite){
        MapOfWebsites.set(details.initiator,MapOfWebsites.get(details.initiator)+WebsiteValue)
    }else{
      MapOfWebsites.set(details.initiator,WebsiteValue)
    }
    console.log(MapOfWebsites)
    // console.log(
    //   "Request size:",
    //   details.requestHeaders.map((header) => header.value).join("").length
    // );
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders"]
);
