var startCell;
var endCell;

class Node {
    constructor(i, j) {
        this.x = +i;
        this.y = +j;
        this.f = 0;
        this.g = 0;
    }

    isEqual(otherNode) {
        return (this.x == otherNode.x && this.y == otherNode.y);
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

function findPath(matrix, cellMatrix, startCell, endCell) {
    let size = matrix[0].length;
    let seenNodes = [];
    let nodesToSee = [];
    nodesToSee.push(startCell);
    startCell.f = startCell.g + startCell.heuristic();
    while (nodesToSee.length != 0) {
        nodesToSee.sort((a, b) => a.f - b.f);
        let currentCell = nodesToSee.shift();
        if (currentCell != startCell && currentCell != endCell) {
            changeColor(currentCell, "current");

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

function changeColor(current, mode){
    document.querySelector(`td[data-row = '${current.x}'][data-column = '${current.y}']`).dataset.mode = mode;
}

export function runAlgorithm(matrix, start, end) {
    let size = matrix[0].length;
    let cellMatrix = new Array(size);
    for (let i = 0; i < size; i++) {
        cellMatrix[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            cellMatrix[i][j] = new Node(i, j);
        }
    }

    console.dir(cellMatrix);
    startCell = cellMatrix[start.x][start.y];
    endCell = cellMatrix[end.x][end.y];

    let check = findPath(matrix, cellMatrix, startCell, endCell);

    if (check) {
        let trace = [];
        let currentCell = endCell.parent;
        while (currentCell != startCell) {
            trace.unshift(currentCell);
            currentCell = currentCell.parent;
        }
        for (let step of trace) {
            changeColor(step, "trace");
        }
    }
    else {
        alert("Решений нет");
    }
}

function test() {
    let fieldSize = 10;
    let searchMatrix = new Array(fieldSize);
    for (let i = 0; i < fieldSize; i++) {
        searchMatrix[i] = new Array(fieldSize);
        for (let j = 0; j < fieldSize; j++) {
            searchMatrix[i][j] = "default";
        }
    }
    let start = {
        x: 5, y: 5
    }
    let end = {
        x: 7, y: 7
    }
    
    findPath(searchMatrix, start, end);
}
