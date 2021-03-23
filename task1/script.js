var mode = "default";
var matrix = [];

function buildMatrix() {
    const MAX_SIZE = document.getElementById("chooseSize").max;
    for (let i = 0; i < MAX_SIZE; i++) {
        matrix[i] = [];
        for (let j = 0; j < MAX_SIZE; j++) {
            matrix[i][j] = "default";
        }
    }
}

function generateField() {
    var tableSize = document.getElementById("chooseSize").value;
    document.getElementById("fieldSize").innerText = tableSize;
    
    let field = new Array(tableSize);
    for (let i = 0; i < tableSize; i++){
        field[i] = new Array(tableSize);
    }

    let table = document.createElement("TABLE");
    let width = 0.4 * document.documentElement.clientWidth;
    table.width = width;

    for (let i = 0; i < tableSize; i++){
        row = table.insertRow(-1);
        for (let j = 0; j < tableSize; j++){
            let cell = row.insertCell(-1);
            cell.dataset.mode = matrix[i][j];
            cell.dataset.row = i;
            cell.dataset.column = j;
            cell.height = width / tableSize;
        }
    }

    table.addEventListener("click", markCell);

    let dvTable = document.querySelector(".field");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}

function markCell(event) {
    let formerCellStart;
    let formerCellEnd;
    switch (mode) {
        case "default":
            return;
        case "blocked":
            if (event.target.dataset.mode == "blocked") {
                matrix[event.target.dataset.row][event.target.dataset.column] = "default";
                event.target.dataset.mode = "default";
            }
            else {
                matrix[event.target.dataset.row][event.target.dataset.column] = "blocked";
                event.target.dataset.mode = "blocked";
            }
            break;
        case "start":
            formerCellStart = document.querySelector("td[data-mode = 'start']");
            if (formerCellStart != undefined) {
                matrix[formerCellStart.dataset.row][formerCellStart.dataset.column] = "default";
                formerCellStart.dataset.mode = "default";
            }
            if (formerCellStart != event.target) {
                matrix[event.target.dataset.row][event.target.dataset.column] = "start";
                event.target.dataset.mode = "start";
            }
            break;
        case "end":
            formerCellEnd = document.querySelector("td[data-mode = 'end']");
            if (formerCellEnd != undefined) {
                matrix[formerCellEnd.dataset.row][formerCellEnd.dataset.column] = "default";
                formerCellEnd.dataset.mode = "default";
            }
            if (formerCellEnd != event.target) {
                matrix[event.target.dataset.row][event.target.dataset.column] = "end";
                event.target.dataset.mode = "end";
            }
            break;
    }
}