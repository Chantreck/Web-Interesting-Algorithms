/* var cells; */

window.addEventListener("load", () => {
    /* cells = [];
    for (let i = 0; i < 5; i++) {
        cells[i] = [];
        for (let j = 0; j < 5; j++) {
            cells[i][j] = 0;
        }
    } */

    //generateTable(5);
    window.startAlgorithmButton.addEventListener("click", start);
    window.backButton.addEventListener("click", () => location.href="../index.html");
})

/* function generateTable(tableSize) {
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
} */

/* function markCell(event) {
    let cell = event.target;
    cell.dataset.state = (+cell.dataset.state) ? 0 : 1;
    cells[cell.dataset.row][cell.dataset.column] = cell.dataset.state;
} */

function transfer() {
    let canvas = document.querySelector("#field canvas");

    let destination = window.hiddenCanvas;
    let destinationContext = destination.getContext("2d");
    destination.width = destination.width;
    let scale = 28 / (canvas.width);
    destinationContext.setTransform(scale, 0, 0, scale, 0, 0);
    destinationContext.drawImage(canvas.getContext("2d").canvas, 0, 0)
}

function start() {
    transfer();
    let data = window.hiddenCanvas.getContext("2d").getImageData(0, 0, 28, 28);

    let values = [];
    for (let i = 3; i < data.data.length; i += 4) {
        values.push(data.data[i] / 255);
    }
    
    run(values);
    window.resultBlock.style.display = "block";
}

import {run} from './network.js'