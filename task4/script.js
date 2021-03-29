window.addEventListener("load", () => {
    window.action = "default";
    window.lines = [];
    window.dots = new DotCollection();

    window.backButton.onclick = () => location.href="../index.html";
    window.actionButtons.addEventListener("click", (event) => changeAction(event.target.dataset.action));
    window.field.addEventListener("click", () => {
        if (window.action == "add" || window.action == "remove") {
            clearSolution();
        }
    });
    window.startAlgorithmButton.addEventListener("click", startAlgorithm);
    window.test.addEventListener("click", startTest);
    window.clearField.addEventListener("click", clearField);
})

function changeAction(actionName) {
    let statusMap = new Map([['default', 'Не выбрано'], ['add', 'Добавление городов'], ['remove', 'Удаление городов'], ['running', 'Эволюционирование']]);
    let label = document.getElementById("currentAction");
    window.action = actionName;
    label.innerText = statusMap.get(window.action);
}

function clearSolution() {
    window.lines = [];
    showInfo("none");
}

function clearField() {
    window.dots = new DotCollection();
    updateInfo();
    clearSolution();
}

function startCheck() {
    if (window.dots.length <= 1) {
        showError("block", "Должно быть не меньше двух городов");
        return false;
    }
    showError("none");
    return true;
}

function updateInfo() {
    window.objectCount.innerText = window.dots.length;
}

async function startAlgorithm() {
    if (!startCheck()) return;
    updateInfo();
    buttonsActivity(true);
    changeAction("running");

    console.log(window.dots);
    await evolution(window.dots, window.lines);
    buttonsActivity(false);
    changeAction("default");
}

function startTest() {
    window.dots = test2;
    startAlgorithm();
}

import {DotCollection} from '../dots.js'
import {evolution, showInfo} from './evolution.js'
import {buttonsActivity, showError} from '../general.js'
import {test, test2} from './benchmark.js'