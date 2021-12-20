// Select the Elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables

let LIST, id;

// get item from local storage

//add item to localstorage
localStorage.setItem
// Show todays date

const options = {weekday : "long", month: "short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function

function addToDO(toDo, id, done, trash){
    
    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
    <li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the Enter key

document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        //if the input isn't empty
        if(toDo) {
            addToDO(toDo);

            list.push({
                name : toDo,
                id : id,
                done : false,
                trash : false,
            });

            id++;
        }
        input.value = "";
    }
});

addToDO("Jogging",list, false, false);

//complete to do

function completeToDO(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
};

// remove to do

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return clicked element inside list
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete"){
        completeToDO(element);
    } else if (elementJob == "delete"){
        removeToDo(element);
    }
});
