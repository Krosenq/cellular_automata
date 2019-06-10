// CA rule 150

//create empty array to hold all values and set rules/initiate variables
const stateTable = [[]];
const renderWidth = 200;
const renderHeight = 150;
const container = document.querySelector(".container");
const rules = [
                [1, 1, 1],
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]   ]
           

//create first row in array based on random init states
for (let i = 0; i < renderWidth; i++) {
    stateTable[0].push(getInitState());
}

//create rest of the array and set it to 0s
for (let i = 1; i < renderHeight; i++) {
    arrayRow = [];
    for (let j = 0; j < renderWidth; j++) {  
        
        let leftSibling = stateTable[i-1][j-1];
        let prevSibling = stateTable[i-1][j];
        let rightSibling = stateTable[i-1][j+1];

        if (j == 0) {
            leftSibling = stateTable[i-1][renderWidth - 1];
        } else if (j == renderWidth - 1) {
            rightSibling = stateTable[i-1][0]
        }
        arrayRow.push(returnState(leftSibling, prevSibling, rightSibling, rules));
    }
    stateTable.push(arrayRow);
}

for (let i = 0; i < stateTable.length; i++) {
    renderDivRow(stateTable[i], i);
}


//check each value against rules; if it matches, change it from 0 to 1. when this is done there should be an array representing the final state

function returnState(leftSibling, prevSibling, rightSibling, rules) {
    
    for (let i = 0; i < rules.length; i++) {
        if ((rules[i][0] === leftSibling) && (rules[i][1] === prevSibling) && (rules[i][2] === rightSibling)) {
            return 1;
        }  
    }
    return 0;
}  //returns the state for a target node 


//render divs based on array
function renderDivRow(array, index) {
    row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    
    for (let i = 0; i < array.length; i++) {
        div = document.createElement("div");
        array[i] ? div.classList.add("active") : div.classList.add("inactive")
        container.childNodes[index].appendChild(div);
    }
}


function getInitState() {
    return Math.floor(Math.random()*2);
}

//change it so it only renders 1 row at a time