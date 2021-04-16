window.addEventListener("load", () => {
    window.action = "default";
    window.dots = new DotCollection();
    window.algorithm = kmeans;

    window.algorithmButtons.addEventListener("click", event => changeAlgorithm(event.target.dataset.algorithm));
    window.actionButtons.addEventListener("click", (event) => changeAction(event.target.dataset.action));

    window.clearField.addEventListener("click", clearField);
    window.chooseSize.addEventListener("input", changeClusterCount);

    window.startAlgorithmButton.addEventListener("click", runAlgorithm);
    window.backButton.onclick = () => location.href="../index.html";
});

function changeAlgorithm(algorithmName) {
    let nameMap = new Map([['kmeans', 'К-средних'], ['hierarchy', 'иерархический'], ['compare', 'сравнение']]);
    let algorithmMap = new Map([['kmeans', kmeans], ['hierarchy', hierarchy], ['compare', compare]]);
    window.algorithm = algorithmMap.get(algorithmName);
    window.currentAlgorithm.innerText = nameMap.get(algorithmName);

    if (algorithmName == "compare") {
        window.hiddenField.style.display = "block";
        window.field.style.display = "none";
    } else {
        window.field.style.display = "block";
        window.hiddenField.style.display = "none";
    }
}

function changeAction(actionName) {
    let statusMap = new Map([['default', 'Не выбрано'], ['add', 'Добавление точки'], ['remove', 'Удаление точки']]);
    window.action = actionName;
    window.currentAction.innerText = statusMap.get(actionName);
}

function clearField() {
    window.dots = new DotCollection();
}

function changeClusterCount() {
    window.countCluster.innerText = window.chooseSize.value;
}

function generateColors() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

function startCheck() {
    if (window.dots.length < window.chooseSize.value ) {
        showError("block", "А в чем смысл?", "Должно быть больше кластеров");
        return false;
    }
    showError("none");
    return true;
}

function runAlgorithm() {
    if (!startCheck()) return;
    window.colors = ["red", "green", "blue", "yellow", "gray", "orange", "white", "aqua","lime"];
    for (let i = 9; i < window.dots.length; i++) {
        window.colors[i] = generateColors();
    }

    algorithm(window.chooseSize.value);
}

import {DotCollection} from './dots.js'
import {kmeans} from './k-means.js'
import {hierarchy} from './hierarchy.js'
import {compare} from './comparison.js'
import{showError} from '../general.js'