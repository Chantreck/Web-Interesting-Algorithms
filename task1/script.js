var mode = "default";
var matrix = [];

window.addEventListener("load", () => {
    buildMatrix();
    generateField();
    window.startAlgorithmButton.addEventListener("click", startAlgorithm);
    window.clearField.addEventListener("click", cleanField);
    window.buildMaze.addEventListener("click", mazeBuilder);
    window.settingsButtons.addEventListener("click", buttonClickListener);
    window.chooseSize.addEventListener("input", generateField);
    window.onresize = generateField;
    window.backButton.onclick = () => location.href="../index.html";
});

function changeAction(action) {
    let statusMap = new Map([['default', 'Не выбрано'], ['blocked', 'Выбор преград'], ['start', 'Выбор стартовой клетки'], ['end', 'Выбор конечной клетки'], ['running', 'Поиск пути']]);
    mode = action;
    window.currentMode.innerText = statusMap.get(action);
}

function buttonClickListener(event) {
   changeAction(event.target.dataset.mode);
}

function cleanField() {
    buildMatrix();
    generateField();
}

function mazeBuilder() {
    buildMatrix();
    let size = window.chooseSize.value;
    let maze = interact(size);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            matrix[i][j] = maze[i][j];
        }
    }
    generateField();
}

function Cell(cellObject) {
    this.x = cellObject.dataset.row;
    this.y = cellObject.dataset.column;
}

function buildMatrix() {
    const MAX_SIZE = window.chooseSize.max;
    for (let i = 0; i < MAX_SIZE; i++) {
        matrix[i] = [];
        for (let j = 0; j < MAX_SIZE; j++) {
            matrix[i][j] = "default";
        }
    }
}

function generateField() {
    let fieldPlaceHolder = window.field;
    let fieldSize = window.chooseSize.value;
    window.fieldSize.innerText = fieldSize;
    
    let field = new Array(fieldSize);
    for (let i = 0; i < fieldSize; i++){
        field[i] = new Array(fieldSize);
    }

    let table = document.createElement("TABLE");
    let width = fieldPlaceHolder.clientWidth;
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
    fieldPlaceHolder.innerHTML = "";
    fieldPlaceHolder.appendChild(table);
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

function checkStart(startCell, endCell, fieldSize) {
    if (startCell == undefined || startCell.x > fieldSize || startCell.y > fieldSize) {
        showError("block", "Ошибочка вышла", "Выберите корректную начальную клетку");
        return false;
    }
    if (endCell == undefined || endCell.x > fieldSize || endCell.y > fieldSize) {
        showError("block", "Ошибочка вышла", "Выберите корректную конечную клетку");
        return false;
    }
    showError("none");
    return true;
}

async function startAlgorithm() {
    let startCell = document.querySelector("td[data-mode = 'start']");
    let endCell = document.querySelector("td[data-mode = 'end']");
    let fieldSize = window.chooseSize.value;

    if (!checkStart(startCell, endCell, fieldSize)) return;
    
    changeAction("running");
    clearSolutions();
    buttonsActivity(true);

    await runAlgorithm(matrix, new Cell(startCell), new Cell(endCell), fieldSize);
    changeAction("default");
    buttonsActivity(false);
}

import {runAlgorithm} from './algorithm.js'
import {interact} from './mazeBuilder.js'
import {buttonsActivity, showError} from '../general.js'