var startCell;
var endCell;

class Node {
    constructor(i, j) {
        this.x = +i;
        this.y = +j;
        this.f = 0;
        this.g = 0;
    }

    heuristic() {
        return Math.abs(this.x - endCell.x) + Math.abs(this.y - endCell.y);
    }
}

function findNeibougrhs(matrix, cellMatrix, currentCell, size){
    let curX = currentCell.x;
    let curY = currentCell.y;
    let result = [];
    if (curX - 1 >= 0) {
        result.push(cellMatrix[curX - 1][curY]);
    }
    if (curY - 1 >= 0) {
        result.push(cellMatrix[curX][curY - 1]);
    }
    if (curX + 1 < size) {
        result.push(cellMatrix[curX + 1][curY]);
    }
    if (curY + 1 < size) {
        result.push(cellMatrix[curX][curY + 1]);
    }
    return result;
}

async function findPath(matrix, cellMatrix, startCell, endCell, size) {
    let seenNodes = [];
    let nodesToSee = [];
    nodesToSee.push(startCell);
    startCell.f = startCell.g + startCell.heuristic();
    while (nodesToSee.length != 0) {
        nodesToSee.sort((a, b) => a.f - b.f);
        let currentCell = nodesToSee.shift();
        if (currentCell != startCell && currentCell != endCell) {
            changeColor(currentCell, "current");
            await sleep(200);
        }
        if (currentCell == endCell) {
            return true;
        }
        seenNodes.push(currentCell);
        
        let neighbourghs = findNeibougrhs(matrix, cellMatrix, currentCell, size);
        for (let neighbourgh of neighbourghs) {
            if (neighbourgh == undefined) {
                continue;
            }
            if (matrix[neighbourgh.x][neighbourgh.y] == "blocked") {
                continue;
            }
            let newG = currentCell.g + 1;
            if (seenNodes.includes(neighbourgh) && newG >= neighbourgh.g) {
                continue;
            }
            else {
                neighbourgh.parent = currentCell;
                neighbourgh.g = newG;
                neighbourgh.f = neighbourgh.g + neighbourgh.heuristic();
                if (!nodesToSee.includes(neighbourgh)){
                    nodesToSee.push(neighbourgh);
                }
            }
        }
    }
    return false;
}

function changeColor (current, mode) {
    document.querySelector(`td[data-row = '${current.x}'][data-column = '${current.y}']`).dataset.mode = mode;
}

async function showSolution(check, startCell, endCell) {
    if (check) {
        let trace = [];
        let currentCell = endCell.parent;
        while (currentCell != startCell) {
            trace.unshift(currentCell);
            currentCell = currentCell.parent;
        }
        for (let step of trace) {
            changeColor(step, "trace");
            await sleep(50);
        }
    }
    else {
        showError("block", "Решений нет", "Попробуйте что-нибудь поменять");
    }
}

export async function runAlgorithm(matrix, start, end, size) {
    let cellMatrix = new Array(size);
    for (let i = 0; i < size; i++) {
        cellMatrix[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            cellMatrix[i][j] = new Node(i, j);
        }
    }

    startCell = cellMatrix[start.x][start.y];
    endCell = cellMatrix[end.x][end.y];

    let check = await findPath(matrix, cellMatrix, startCell, endCell, size);
    await showSolution(check, startCell, endCell);
}

import {showError, sleep} from '../general.js';