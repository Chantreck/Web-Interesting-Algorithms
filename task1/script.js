var mode = "default"

function markCell(event) {
    alert("I was clicked!");
}

function generateField() {
    var tableSize = document.getElementById("chooseSize").value;
    
    let field = new Array(tableSize);
    for (let i = 0; i < tableSize; i++){
        field[i] = new Array(tableSize);
    }

    let table = document.createElement("TABLE");
    let width = 0.4 * document.documentElement.clientWidth;
    table.width = width;
    table.border = "1 solid black";

    for (let i = 0; i < tableSize; i++){
        row = table.insertRow(-1);
        for (let j = 0; j < tableSize; j++){
            let cell = row.insertCell(-1);
            cell.id = "defaultCell";
            cell.setAttribute("row", i);
            cell.setAttribute("column", j);
            //cell.addElementListener("click", markCell);
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