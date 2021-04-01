window.addEventListener("load", () => {
    window.action = "default";
    window.lines = [];
    window.dots = new DotCollection();

    window.backButton.onclick = () => location.href="../index.html";
    window.actionButtons.addEventListener("click", (event) => changeAction(event.target.dataset.action));
    window.clearField.addEventListener("click", clearField);
});

function buttonClickHandler(event) {
    changeAction(event.target.dataset.action);
}

function changeAction(actionName) {
    let statusMap = new Map([['default', 'Не выбрано'], ['add', 'Добавление городов'], ['remove', 'Удаление городов'], ['running', 'Эволюционирование']]);
    let label = document.getElementById("currentAction");
    window.action = actionName;
    label.innerText = statusMap.get(window.action);
}

function clearField() {
    window.dots = new DotCollection();
    updateInfo();
}

function updateInfo() {
    window.objectCount.innerText = window.dots.length;
}

import {DotCollection} from '../dots.js'