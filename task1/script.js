var mode = "default";
var matrix = [];

buildMatrix();
generateField();
    
window.onresize = generateField;
window.backButton.onclick = () => location.href="../index.html";
window.startAlgorithmButton.onclick = startAlgorithm;
window.chooseSize.oninput = generateField;
window.settingsButtons.addEventListener("click", buttonClickListener);

function buttonClickListener(event) {
    if (event.target.className == "changeCellButton") {
        let label = document.getElementById("currentMode");
        mode = event.target.dataset.mode;
        if (mode == "default") {
            label.innetText = "не выбрано";
        }
        else if (mode == "blocked") {
            label.innerText = "выбор преград";
        }
        else if (mode == "start") {
            label.innerText = "выбор стартовой клетки";
        }
        else {
            label.innerText = "выбор конечной клетки";
        }
    }
    if (event.target.className == "clearField") {
        buildMatrix();
        generateField();
    }
    if (event.target.className == "buildMaze") {
        let size = document.getElementById("chooseSize").value;
        let maze = interact(size);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                matrix[i][j] = maze[i][j];
            }
        }
        
    }
}

function Cell(cellObject) {
    this.x = cellObject.dataset.row;
    this.y = cellObject.dataset.column;
}

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
    let fieldSize = document.getElementById("chooseSize").value;
    document.getElementById("fieldSize").innerText = fieldSize;
    
    let field = new Array(fieldSize);
    for (let i = 0; i < fieldSize; i++){
        field[i] = new Array(fieldSize);
    }

    let table = document.createElement("TABLE");
    let width = 0.4 * document.documentElement.clientWidth;
    table.width = width;

    for (let i = 0; i < fieldSize; i++){
        let row = table.insertRow(-1);
        for (let j = 0; j < fieldSize; j++){
            let cell = row.insertCell(-1);
            cell.dataset.mode = matrix[i][j];
            cell.dataset.row = i;
            cell.dataset.column = j;
            cell.height = width / fieldSize;
        }
    }

    table.addEventListener("click", markCell);

    let tableHolder = document.querySelector(".field");
    tableHolder.innerHTML = "";
    tableHolder.appendChild(table);
}

function clearSolutions(){
    let track = document.querySelectorAll("td[data-mode='trace'], td[data-mode='current'");
    for (let cell of track) {
        cell.dataset.mode = "default";
    }
}

function markCell(event) {
    let formerCellStart;
    let formerCellEnd;
    switch (mode) {
        case "default":
            return;
        case "blocked":
            clearSolutions();
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
            clearSolutions();
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
            clearSolutions();
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

function startAlgorithm() {
    let startCell = document.querySelector("td[data-mode = 'start']");
    let endCell = document.querySelector("td[data-mode = 'end']");
    let fieldSize = document.getElementById("chooseSize").value;

    clearSolutions();
    //Проверка на доступность начала и конца
    if (startCell == undefined || startCell.x > fieldSize || startCell.y > fieldSize) {
        alert("Выберите корректную начальную клетку.");
        return;
    }
    if (endCell == undefined || endCell.x > fieldSize || endCell.y > fieldSize) {
        alert("Выберите корректную конечную клетку.");
        return;
    }
    
    //создаем уменьшенную версию матрицы для алгоритма
    let searchMatrix = new Array(fieldSize);
    for (let i = 0; i < fieldSize; i++) {
        searchMatrix[i] = new Array(fieldSize);
        searchMatrix[i] = matrix[i].slice(0, fieldSize);
    }

    startCell = new Cell(startCell);
    endCell = new Cell(endCell);
    runAlgorithm(searchMatrix, startCell, endCell);
}

function mazeGeneration() {

}

import {runAlgorithm} from './algorithm.js';
import {interact} from './mazeBuilder.js';