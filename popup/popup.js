chrome.storage.sync.get(["access_token"], function (result) {
  if (result.access_token) {
    mainPage.style.display = "flex";
    loginPage.style.display = "none";
  }
});

const BACKEND_URL = "http://localhost:3000/auth/login";
const continueBtn = document.querySelector(".btn");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const mainPage = document.querySelector(".main");
const loginPage = document.querySelector(".login");
const route_to_login = document.querySelector("#loginPage");
const invalid = document.querySelector(".invalid");

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
