var mode = "default"

function markCell(event) {
    alert("I was clicked!");
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

            if (i == 2 & j == 5) {
                cell.id = "blockedCell";
            }
            else if (i == 4 & j == 1) {
                cell.id = "startCell";
            }
            else if (i == 7 & j == 9) {
                cell.id = "endCell";
            }
            else {
                cell.id = "defaultCell";
            }
            cell.setAttribute("row", i);
            cell.setAttribute("column", j);
            cell.height = width / tableSize;
            //cell.innerHTML = `${i},${j}`;
        }
    }

    let dvTable = document.querySelector(".field");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}

function changeMode(newMode){
    //console.log(`Before: ${mode}`);
    mode = newMode;
    //console.log(`After: ${mode}`);
}