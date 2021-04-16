window.addEventListener("load", () => {
    window.action = "default";
    window.lines = [];
    window.dots = new DotCollection();
    window.endAlgo=true;
    window.backButton.onclick = () => location.href="../index.html";
    window.actionButtons.addEventListener("click", (event) => changeAction(event.target.dataset.action));
    window.clearField.addEventListener("click", clearField);
    window.startAlgorithmButton.addEventListener("click", startAlgorithm);
    window.endAlgorithmButton.addEventListener("click", endAlgorithm);
    window.test.addEventListener("click", startTest);
    window.field.addEventListener("click", () => {
        if (window.action == "add" || window.action == "remove") {
            clearSolution();
        }
    });
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
    let statusMap = new Map([['default', 'Не выбрано'], ['add', 'Добавление городов'], ['remove', 'Удаление городов'], ['running', 'Муравьи бегают']]);
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
        showError("block", "А в чем смысл?", "Должно быть не меньше двух городов");
        return false;
    }
    showError("none");
    return true;
}

function showInfo(state) {
    window.hiddenInfo.style.display = state;
}

export function updateInfo(iterationNumber, tourLength) {
    window.objectCount.innerText = window.dots.length;
    window.iterationNumber.innerText = iterationNumber;
    window.tourLength.innerText = tourLength;
}


async function startAlgorithm() {
    if (!startCheck()) return;
    showInfo("block");
    updateInfo();
    
    buttonsActivity(true);
    changeAction("running");

    await start();
    buttonsActivity(false);
    changeAction("default");
}

async function endAlgorithm(){
 window.endAlgo = false;
}

function startTest() {
    window.dots = test2;
    startAlgorithm();
}

import {start} from './ant_algorithm.js';
import {DotCollection} from '../dots.js'
import {showError, buttonsActivity} from '../general.js'
import {test2} from '../task4/benchmark.js'