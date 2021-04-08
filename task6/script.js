var cells;
var pixels;
var mode;

window.addEventListener("load", () => {
    cells = [];
    for (let i = 0; i < 5; i++) {
        cells[i] = [];
        for (let j = 0; j < 5; j++) {
            cells[i][j] = 0;
        }
    }

    selectDefaultMode();
    /* window.defaultMode.onclick = selectDefaultMode;
    window.bonusMode.onclick = selectBonusMode; */
    
    window.clearField.onclick = clearField;

    window.backButton.onclick = () => location.href="../index.html";
})

function selectDefaultMode() {
    mode = "default";
    window.field.style.display = "none";
    window.table.style.display = "block";
    generateTable(5, window.table);
}

function selectBonusMode() {
    mode = "bonus";
    window.table.style.display = "none";
    window.field.style.display = "block";

    generateField(50, window.field);
}

function generateTable(tableSize, tablePlaceHolder) {
    let table = document.createElement("TABLE");
    let width = tablePlaceHolder.clientWidth;
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
    tablePlaceHolder.innerHTML = "";
    tablePlaceHolder.appendChild(table);
}

function generateField(tableSize, tablePlaceHolder) {
    let table = document.createElement("TABLE");
    let width = tablePlaceHolder.clientWidth;
    table.width = width;

    for (let i = 0; i < tableSize; i++){
        let row = table.insertRow(-1);
        for (let j = 0; j < tableSize; j++){
            let cell = row.insertCell(-1);
            cell.dataset.state = pixels[i][j];
            cell.dataset.row = i;
            cell.dataset.column = j;
            cell.height = width / tableSize;
        }
    }

    table.addEventListener("click", markCell);
    tablePlaceHolder.innerHTML = "";
    tablePlaceHolder.appendChild(table);
}

function markCell(event) {
    let cell = event.target;
    cell.dataset.state = (+cell.dataset.state) ? 0 : 1;
    cells[cell.dataset.row][cell.dataset.column] = cell.dataset.state;
}

function clearField() {
    switch (mode) {
        case 'default':
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    cells[i][j] = 0;
                }
            }
            generateTable(5, window.table);
            break;

        case 'bonus':

    }
}