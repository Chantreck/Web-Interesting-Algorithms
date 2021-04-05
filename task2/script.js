window.addEventListener("load", () => {
    window.action = "default";
    window.dots = new DotCollection();
    window.backButton.onclick = () => location.href="../index.html";
    window.actionButtons.addEventListener("click", buttonClickHandler);
    window.clearField.addEventListener("click", clearField);
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

import {DotCollection} from './dots_task2.js'
import {run} from './node.js'