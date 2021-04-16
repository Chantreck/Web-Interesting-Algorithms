window.addEventListener("load", () => {
    window.action = "default";
    window.dots = new DotCollection();
    window.count=6;
    window.backButton.onclick = () => location.href="../index.html";
    window.actionButtons.addEventListener("click", buttonClickHandler);
    window.clearField.addEventListener("click", clearField);
    window.chooseSize.addEventListener("input", changeClusterCount);
    window.colors = ["red", "green", "blue", "yellow", "gray","orange", "white", "aqua","lime"];
    //window.algorithmDone = false;
   // window.chooseSize.addEventListener("input", run);
    window.startAlgorithmButton.onclick = run;
})

function buttonClickHandler(event) {
    changeAction(event.target.dataset.action);
}

let statusMap = new Map([['default', 'Не выбрано'], ['add', 'Добавление точки'], ['remove', 'Удаление точки'], ['info', 'Просмотр информации о точке']]);

function changeAction(actionName) {
    let label = document.getElementById("currentAction");
    window.action = actionName;
    label.innerText = statusMap.get(window.action);
}

function clearField() {
    window.dots = new DotCollection();
}
function changeClusterCount(){
window.count=window.chooseSize.value;
}
import {DotCollection} from './dots_task2.js'
//import {run} from './node.js'
import{run} from './node_2.js'
