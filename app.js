import chrome from "chrome"
const btn = document.querySelector(".btn")
console.log(btn);
btn.addEventListener("click",()=>{
    console.log("hi")
    let DetailsOfWeb = chrome.webRequest
    console.log(DetailsOfWeb)
})