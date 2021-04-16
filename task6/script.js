var cells;

window.addEventListener("load", () => {
    cells = [];
    for (let i = 0; i < 5; i++) {
        cells[i] = [];
        for (let j = 0; j < 5; j++) {
            cells[i][j] = 0;
        }
    }

    generateTable(5);
    window.clearField.addEventListener("click", clearField);
    window.startAlgorithmButton.addEventListener("click", () => run(cells));
    window.backButton.addEventListener("click", () => location.href="../index.html");
})

function generateTable(tableSize) {
    let table = document.createElement("TABLE");
    let tablePlaceholder = window.field;
    let width = tablePlaceholder.clientWidth;
    table.width = width;

    for (let i = 0; i < tableSize; i++){
        let row = table.insertRow(-1);
        for (let j = 0; j < tableSize; j++){
            let cell = row.insertCell(-1);
            cell.dataset.state = cells[i][j];
            cell.dataset.row = i;
            cell.dataset.column = j;
            cell.height = width / tableSize;
        }
    }

    table.addEventListener("click", markCell);
    tablePlaceholder.innerHTML = "";
    tablePlaceholder.appendChild(table);
}

function markCell(event) {
    let cell = event.target;
    cell.dataset.state = (+cell.dataset.state) ? 0 : 1;
    cells[cell.dataset.row][cell.dataset.column] = cell.dataset.state;
}

function clearField() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            cells[i][j] = 0;
        }
    }
    generateTable(5, window.table);
}

import {run} from './network.js'