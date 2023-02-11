const body = document.querySelector(".bod");
const BACKEND_URL = "http://localhost:3000/auth/login";
const continueBtn = document.querySelector(".btn");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const mainPage = document.querySelector(".main");
const loginPage = document.querySelector(".login");
const route_to_login = document.querySelector("#loginPage");
const invalid = document.querySelector(".invalid");
const requestCount = document.querySelector(".requestCount");
const url = document.querySelector(".url");
let MapofWebsites = new Map();

chrome.storage.sync.get(["access_token"], function (result) {
  if (result.access_token) {
    access_token = result.access_token;
    mainPage.style.display = "flex";
    loginPage.style.display = "none";

    chrome.storage.sync.get(["totalSize"], function (result) {
      console.log(result.totalSize);
    });

    requestCount.innerHTML = result.totalSize;
    chrome.storage.sync.get(["map"], function (result) {
      console.log("Map : ", result);
    });
  }
});

route_to_login.addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:5173/" });
});

continueBtn.addEventListener("click", async (e) => {
  const creds = { username: username.value, password: password.value };

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      body: JSON.stringify(creds),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    const data = await res.json();
    console.log(data);
    if (data.status !== 200) {
      invalid.style.display = "block";
      return;
    }

    chrome.storage.sync.set({ access_token: [data.token] }, function (result) {
      //func
    });

    mainPage.style.display = "flex";
    loginPage.style.display = "none";
  } catch (e) {
    console.log(e);
  }
});

chrome.storage.sync.get(["access_token"], function (result) {
  if (result.access_token) {
    setInterval(() => {
      chrome.storage.sync.get(["totalSize"], function (result) {
        requestCount.innerHTML = result.totalSize;
      });

      chrome.storage.sync.get(["map"], function (result) {
        console.log("Map : ", result.map);
        MapofWebsites = result.map;
        console.log("Here : ", MapofWebsites);
        if (MapofWebsites.size === 1) {
          console.log("The : ", url);
        }
      });
    }, 5000);
  }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const currTab = tab.url.toString();
    for (let [key, value] of MapOfWebsites) {
      if (currTab.includes(key)) {
        url.innerHTML = key;
        console.log("Key : ", key);
      }
    }
  });
});
