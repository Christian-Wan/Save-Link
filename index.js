let myLeads = []
let inputEl = document.getElementById("input-el")
let ulEl = document.getElementById("ul-el")
let listItems = ""




if (localStorage.linkItems) {
    myLeads = JSON.parse(localStorage.getItem("linkItems"))
    for (let i = 0; i < myLeads.length; i++) {
        listItems = `<li><a target=_blank href= ${myLeads[i]} >
        ${myLeads[i]}
        </a></li>`
        ulEl.innerHTML += listItems
    }
}
else {
    localStorage.setItem("linkItems", JSON.stringify(myLeads))
}


document.getElementById("input-btn").addEventListener("click",function() {
    myLeads.push(inputEl.value)
    localStorage.setItem("linkItems", JSON.stringify(myLeads))
    renderLeads()
    inputEl.value = ""
})

document.getElementById("save-btn").addEventListener("click",function() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
        inputEl.value = tabs[0].url;
        myLeads.push(inputEl.value)
        localStorage.setItem("linkItems", JSON.stringify(myLeads))
        renderLeads()
        inputEl.value = ""
    });
})


document.getElementById("delete-btn").addEventListener("click",function() {
    myLeads = []
    localStorage.clear()
    ulEl.innerHTML = ""
})

function renderLeads() {
    listItems = `<li><a target=_blank href= ${inputEl.value} >
        ${inputEl.value}
        </a></li>`
    ulEl.innerHTML += listItems
}
