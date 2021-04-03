window.addEventListener("load", () => {
    window.action = "default";
    window.lines = [];
    window.dots = new DotCollection();

    window.backButton.onclick = () => location.href="../index.html";
    window.actionButtons.addEventListener("click", (event) => changeAction(event.target.dataset.action));
    window.clearField.addEventListener("click", clearField);
    window.startAlgorithmButton.addEventListener("click", start);
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

function clearSolution() {
    window.lines = [];
    //showInfo("none");
}

function clearField() {
    window.dots = new DotCollection();
    updateInfo();
    clearSolution();
}



function showInfo(state) {
    window.hiddenInfo.style.display = state;
}

function updateInfo( tourLength) {
    window.tourLength.innerText = tourLength;
}
import {DotCollection} from '../dots.js'
import {Line} from '../dots.js';




function start() {

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
   
    var doots = window.dots.slice();
    console.log(doots);
    var ants = [];
    var bestPathArr = [];
    
    var Ant = function () {
    
        this.x;
        this.y;
    
        this.visited = [];
        this.path = [];
        this.dist = 0;
    
    
        this.distance = function(x2,y2){
            
            return (Math.sqrt(Math.pow(this.x - x2,2)+Math.pow(this.y - y2,2)));
        }
    }
    for(let i = 0; i < doots.length; i++){
        doots[i].pheromone = 0.2;
    } 




function calculate(a) {

    var denominator = 0;
    var numerator = 0;

    for(var i = 0; i < doots.length; i++){

        if(a.visited[i] == 0){

            var r = a.distance(doots[i].x,doots[i].y );
            doots[i].tendency = 1 / r;
            denominator += (Math.pow(doots[i].pheromone,1.5) * Math.pow(doots[i].tendency,2));

        }
        else{
            doots[i].tendency = 0;
        }
    }

    for(var i = 0; i < doots.length; i++){
        
        if(a.visited[i] == 0){
            numerator = Math.pow(doots[i].pheromone,1.5) * Math.pow(doots[i].tendency,2);

            doots[i].chance = (numerator / denominator);
        }
        else{
            doots[i].chance = 0;
        }
    }
}

function findNextNode(a) {

    var maxX;
    var maxY;
    var ind = -1;

    var nextRand = Math.random();

    for(var i = 0; i < doots.length; i++){

        if(a.visited[i] == 0 && nextRand < doots[i].chance){

            maxX = doots[i].x;
            maxY = doots[i].y;
            ind = i;
            break;
        }
        else if (nextRand >= doots[i].chance){
            nextRand -= doots[i].chance;
        }
    }
    
    for(var i = 0; i < doots.length; i++){
        doots[i].pheromone *= 0.7;
    }

    if(ind != -1){
        a.dist += a.distance(doots[ind].x,doots[ind].y);
        a.x = maxX;
        a.y = maxY;
        a.path.push(ind);
        a.visited[ind] = 1;
        doots[ind].pheromone /= 0.5;
    }

}

var isStarted = true;
var bestPath = 999999999;



    var ind = -1;

 
    for(var k = 0; k < 1000; k++){

        for(let i = 0; i < doots.length; i++){
            var a = new Ant();
    
            a.x = doots[i].x; 
            a.y = doots[i].y;
            ants.push(a);
        }

        for(var j = 0; j < ants.length; j++){

            ants[j].visited.length =  doots.length;
            ants[j].visited.fill(0);
            ants[j].visited[j] = 1
            ants[j].path = [];
            ants[j].path.push(j);

            for(var i = 0; i < doots.length; i++){
                calculate(ants[j]);
                findNextNode(ants[j]);
            }
            
            
            if (bestPath > ants[j].dist){
                 bestPath = ants[j].dist;
                 ind = j;
                 
                 bestPathArr = ants[j].path;
            }

            ants[j].dist = 0;
        }
        
        for(var i = 0; i < doots.length; i++){
            doots[i].pheromone = 0.3;
            ants.splice(0,ants.length);
        }
    }

    isStarted = false;
    console.log(bestPath);
    console.log(bestPathArr);
    visualize(doots, lines);
    updateInfo(bestPath);

}