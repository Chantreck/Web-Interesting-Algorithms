window.addEventListener("load", () => {
    window.action = "default";
    window.lines = [];
    window.dots = new DotCollection();

    window.backButton.onclick = () => location.href="../index.html";
    window.actionButtons.addEventListener("click", (event) => changeAction(event.target.dataset.action));
    window.clearField.addEventListener("click", clearField);
    window.startAlgorithmButton.addEventListener("click", startAlgorithm);
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

function updateInfo(iterationNumber, tourLength) {
    window.objectCount.innerText = window.dots.length;
    window.iterationNumber.innerText = iterationNumber;
    window.tourLength.innerText = tourLength;
}

function visualize(cities, lines) {
    window.lines = [];
    let tour =bestPathArr.slice();
    for (let i = 0; i < tour.length - 1; i++) {
        let departure = tour[i];
        let arrival = tour[i + 1];
        window.lines.push(new Line(cities[departure], cities[arrival]));
    }
    let lastCity = tour[tour.length - 1];
    window.lines.push(new Line(cities[lastCity], cities[tour[0]]));
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

var ants = [];
var bestPathArr = [];
var doots;
var pheromone = [];

var Ant = function () {
    this.x;
    this.y;
    this.currentPos;

    this.visited = [];
    this.path = [];
    this.dist = 0;

    this.distance = function(x2, y2){
        return (Math.sqrt(Math.pow(this.x - x2, 2) + Math.pow(this.y - y2, 2)));
    }
}

function calculate(a) {
    var denominator = 0;
    var numerator = 0;

    for(var i = 0; i < doots.length; i++){
        if(a.visited[i] == 0){
            var r = a.distance(doots[i].x,doots[i].y );
            doots[i].tendency = 1 / r;
            denominator += (Math.pow(pheromone[a.currentPos][i],1.5) * Math.pow(doots[i].tendency,2));

        }
        else {
            doots[i].tendency = 0;
        }
    }

    for (var i = 0; i < doots.length; i++) {
        if (a.visited[i] == 0){
            numerator = Math.pow(pheromone[a.currentPos][i], 1.5) * Math.pow(doots[i].tendency, 2);
            doots[i].chance = (numerator / denominator);
        }
        else {
            doots[i].chance = 0;
        }
    }
}

function findNextNode(a) {
    var maxX;
    var maxY;
    var indf = -1;
    var nextRand = Math.random();

    for (var i = 0; i < doots.length; i++){
        if (a.visited[i] == 0 && nextRand < doots[i].chance){
            maxX = doots[i].x;
            maxY = doots[i].y;
            indf = i;
            break;
        }
        else if (nextRand >= doots[i].chance){
            nextRand -= doots[i].chance;
        }
    }

    for (var i = 0; i < doots.length; i++){
        doots[i].pheromone *= 0.7;
    }

    if (indf != -1){
        a.dist += a.distance(doots[indf].x,doots[indf].y);
        a.x = maxX;
        a.y = maxY;
        a.currentPos = indf;
        a.path.push(indf);
        a.visited[indf] = 1;
    }
}

async function start() {
    doots = window.dots.slice();
    ants = [];
    bestPathArr = [];
    doots;
    pheromone = [];

    var isStarted = true;
    var bestPath = Infinity;
    var ind = -1;

    for (let i = 0; i < doots.length; i++){
        var a = new Ant();
        ants.push(a);
    }

    pheromone.length = doots.length;

    for (var i = 0; i < doots.length; i++) {
        pheromone[i] = [];
        for (var j = 0; j < doots.length; j++) {
            pheromone[i][j] = 0.2;
        }
    }

    for (var k = 0; k < 100; k++) {
        for (var j = 0; j < ants.length; j++) {
            ants[j].visited.length =  doots.length;
            ants[j].visited.fill(0);
            ants[j].visited[j] = 1;

            ants[j].x = doots[j].x;
            ants[j].y = doots[j].y;

            ants[j].path = [];
            ants[j].currentPos= j;
            ants[j].path.push(j);
            
            for (var i = 0; i < doots.length; i++){
                calculate(ants[j]);
                findNextNode(ants[j]);
            }

            ants[j].path.push(j);
            ants[j].dist +=  ants[j].distance(doots[j].x,doots[j].y);

            if (bestPath >= ants[j].dist){
                bestPath = ants[j].dist;
                ind = j;
                bestPathArr = ants[j].path;
            }
        }

        for (var i = 0; i < doots.length; i++){
            for (var j = 0; j < doots.length; j++){
                pheromone[i][j] *= 0.8;
            }
        }
    
        for (var j = 0; j < ants.length; j++){
            for (var i = 0; i < ants[j].path.length - 1; i++){
                pheromone[ants[j].path[i]][ants[j].path[i + 1]] += 4/ants[j].dist;
                pheromone[ants[j].path[i + 1]][ants[j].path[i]] += 4/ants[j].dist;
            }
            ants[j].dist = 0;
        }

        visualize(doots, lines);
        updateInfo(k, bestPath);
        await sleep(100);
    }
    isStarted = false;
}

function startTest() {
    window.dots = test2;
    startAlgorithm();
}

import {DotCollection, Line} from '../dots.js'
import {showError, buttonsActivity, sleep} from '../general.js'
import {test, test2} from '../task4/benchmark.js'