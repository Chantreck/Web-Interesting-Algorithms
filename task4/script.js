window.addEventListener("load", () => {
    window.action = "default";
    window.lines = [];
    window.dots = new DotCollection();

    window.actionButtons.addEventListener("click", (event) => changeAction(event.target.dataset.action));
    window.field.addEventListener("click", () => {
        if (window.action == "add" || window.action == "remove") {
            clearSolution();
        }
    });
    window.populationSizeSelector.addEventListener("input", selectPopulationSize);
    window.mutationRateSelector.addEventListener("input", selectMutationRate);

    window.startAlgorithmButton.addEventListener("click", startAlgorithm);
    window.test.addEventListener("click", startTest);
    window.clearField.addEventListener("click", clearField);

    window.backButton.addEventListener("click", () => location.href="../index.html");
});

window.addEventListener("resize", () => {
    if (window.action != "running") {
        let size = window.field.clientWidth;
        for (let dot of window.dots) {
            if (dot.x > size - 10 || dot.y > size - 10) {
                window.dots.remove(dot.x, dot.y);
            }
        }
        window.lines = [];
        updateInfo();
    }
});

function changeAction(actionName) {
    let statusMap = new Map([['default', 'Не выбрано'], ['add', 'Добавление городов'], ['remove', 'Удаление городов'], ['running', 'Эволюционирование']]);
    window.action = actionName;
    window.currentAction.innerText = statusMap.get(window.action);
}

function selectPopulationSize() {
    switch (window.populationSizeSelector.value) {
        case '0':
            window.populationSize.innerText = "маленький";
            break;
        case '1':
            window.populationSize.innerText = "средний";
            break;
        case '2':
            window.populationSize.innerText = "большой";
    }
}

function selectMutationRate() {
    window.mutationRate.innerText = window.mutationRateSelector.value;
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
        showError("block", "А в чем смысл?", "Должно быть не меньше двух городов");
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