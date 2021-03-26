window.addEventListener("load", () => {
    window.action = "default";
    window.dotsCollection = new DotCollection();
    window.backButton.onclick = () => location.href="../index.html";
    window.actionButtons.addEventListener("click", buttonClickHandler);
})

function buttonClickHandler(event) {
    if (event.target.className == "selectActionButton") {
        changeAction(event.target.dataset.action);
    }
    if (event.target.className == "clearField") {
        clearField();
    }
}

let statusMap = new Map([['default', 'Не выбрано'], ['add', 'Добавление городов'], ['remove', 'Удаление городов']]);

function changeAction(actionName) {
    let label = document.getElementById("currentAction");
    window.action = actionName;
    label.innerText = statusMap.get(window.action);
}

import {DotCollection} from '../dots.js'