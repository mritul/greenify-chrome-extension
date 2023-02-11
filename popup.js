const MainPage=()=>{
    const root = document.getElementById("ExtensionRoot");
    console.log(root)
    root.innerHTML=`    
    <div>
        <p>The current size of packets being sent from this page are : </p>
    </div>
    `
}
const allWebpage=()=>{
    const root = document.getElementById("ExtensionRoot")
    root.innerHTML=`
    <div>
    <div>
        All the possible combinations
    </div>
</div>
    `
}
const WebPageAddEventListeners=()=>{
    const currentWebpageDom = document.getElementById("currentWebpage")
    const allWebpageDom = document.getElementById("allWebpages")
    currentWebpageDom.addEventListener('click',MainPage)
    allWebpageDom.addEventListener('click',allWebpage)

}
const Init=()=>{
    console.log("init extensions")
    MainPage();
    WebPageAddEventListeners();
}
Init()