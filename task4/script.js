window.addEventListener("load", () => {
    window.action = "default";
    window.dotsCollection = new DotCollection();
    window.backButton.onclick = () => location.href="../index.html";
    window.actionButtons.addEventListener("click", buttonClickHandler);
    window.startAlgorithmButton.addEventListener("click", startAlgorithm);
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

function clearField() {
    window.dotsCollection = new DotCollection();
}

function startAlgorithm() {
    /* var parent1 = "A B C D E F G H I J".split(' ');
    var parent2 = "I J D A G H B F C E".split(' ');
    crossover(parent1, parent2, 5); */
}

import {DotCollection} from '../dots.js'
// import {crossover} from './evolution.js'