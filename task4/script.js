window.addEventListener("load", () => {
    window.action = "default";
    window.lineCollection = new DotCollection();
    window.dotsCollection = new DotCollection();
    window.backButton.onclick = () => location.href="../index.html";
    window.actionButtons.addEventListener("click", buttonClickHandler);
    window.startAlgorithmButton.addEventListener("click", startAlgorithm);
    window.test.addEventListener("click", startTest);
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
    window.lineCollection = new DotCollection();
    window.dotsCollection = new DotCollection();
}

function startAlgorithm() {
    console.log(window.dotsCollection);
    evolution(window.dotsCollection, window.lineCollection)
}

function startTest() {
    // Первая выборка
    window.dotsCollection.add(173.20001220703125, 229);
    window.dotsCollection.add(270.20001220703125,101);
    window.dotsCollection.add(448.20001220703125,170);
    window.dotsCollection.add(346.20001220703125,283);
    window.dotsCollection.add(235.20001220703125,295);
    window.dotsCollection.add(143.20001220703125,79);
    window.dotsCollection.add(475.20001220703125,380);
    window.dotsCollection.add(298.20001220703125,179);
    window.dotsCollection.add(395.20001220703125,75);

    // Вторая выборка
    window.dotsCollection.add(145.20001220703125,237);
    window.dotsCollection.add(282.20001220703125,85);
    window.dotsCollection.add(386.20001220703125,301);
    window.dotsCollection.add(393.20001220703125,137);
    window.dotsCollection.add(127.20001220703125,120);
    window.dotsCollection.add(246.20001220703125,307);
    window.dotsCollection.add(277.20001220703125,191);
    window.dotsCollection.add(397.20001220703125,219);
    window.dotsCollection.add(338.20001220703125,98);
    window.dotsCollection.add(198.20001220703125,95);
    window.dotsCollection.add(323.20001220703125,307);
    //window.dotsCollection.add();
    //test(window.dotsCollection, window.lineCollection)
}

import {DotCollection} from '../dots.js'
import {evolution} from './evolution.js'