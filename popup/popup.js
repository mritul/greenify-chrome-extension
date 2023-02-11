console.log("Works");
const continueBtn = document.querySelector(".btn");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const mainPage = document.querySelector(".main");
const loginPage = document.querySelector(".login");

continueBtn.addEventListener("click", (e) => {
  console.log(username.value, password.value);
  if (
    username.value.toString() == username.value &&
    password.value.toString() == password.value
  ) {
    mainPage.style.display = "flex";
    loginPage.style.display = "none";
  }
});
