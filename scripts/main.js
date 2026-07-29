let myLeads = [];
const inputButton = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.getElementById("ul-el");
const deleteButton = document.querySelector("#delete-btn");
const tabBtn = document.getElementById("tab-btn");

//use inbuilt local storage variable
//localStorage.setItem("myLeads", "www.example.com")

//let name = localStorage.getItem("myLeads")
//console.log(name)
// localStorage.clear();

// 1. Save a key-value pair in localStorage
// 2. Refresh the page. Get the value and log it to the console
// 3. Clear localStorage

// HINTS:
// localStorage.setItem(key, value)
// localStorage.getItem(key)
// localStorage.clear()
// PS: both key and value need to be strings

const getLeadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (getLeadsFromLocalStorage) {
    myLeads = getLeadsFromLocalStorage;
    render(myLeads);
}

function render(leads) {
      //create list item variable to store the items before adding them to dom
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {
        // dom manipulation is resource intensive so we should avoid manipulating it many times in a loop
       // use string literal to format the element
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                     ${leads[i]} 
                </a>
            </li>
        `
    }
    // append to ul
    ulEl.innerHTML = listItems;
}

// eventlistner for button click
inputButton.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    // clear input field
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

//event listener for delete button when its doubleclicked
deleteButton.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
   // call renderLeads which is now using an empty array myLeads
   render(myLeads);
})

//add event listener for tab button to grab tab url
tabBtn.addEventListener("click", function() {
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

//practice exercises

const welcomeEl = document.getElementById("welcome-el")
const greeting = "Welcome back";
// Give the function a parameter, greeting, that replaces "Welcome back"
function greetUser(greet, name, emoji) {
    welcomeEl.textContent = `${greet}, ${name} ${emoji}`;
}

