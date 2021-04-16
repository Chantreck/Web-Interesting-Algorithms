var points = [];
var bestPathArr = [];
var bestPath;
var doots;
var pheromone = [];
var A = 1;
var B = 3;
var Q = 4;

var Point = function () {
    this.x;
    this.y;
    this.currentPos;

    this.visited = [];
    this.path = [];
    this.dist = 0;

    this.distance = function (x2, y2) {
        return (Math.sqrt(Math.pow(this.x - x2, 2) + Math.pow(this.y - y2, 2)));
    }
}

function computation_references(a) {
    var denom = 0;
    var numer = 0;

    for (var i = 0; i < doots.length; i++) {
        if (a.visited[i] == 0) {
            var interval = a.distance(doots[i].x, doots[i].y);
            doots[i].aspiration = 1 / interval;
            denom += (Math.pow(pheromone[a.currentPos][i], A) * Math.pow(doots[i].aspiration, B));

        }
        else {
            doots[i].aspiration = 0;
        }
    }

    for (var i = 0; i < doots.length; i++) {
        if (a.visited[i] == 0) {
            numer = Math.pow(pheromone[a.currentPos][i], A) * Math.pow(doots[i].aspiration, B);
            doots[i].wish = (numer / denom);
        }
        else {
            doots[i].wish = 0;
        }
    }
}

function findNextPoint(a) {
    var X;
    var Y;
    var vertex = -1;
    var rand = Math.random();

    for (var i = 0; i < doots.length; i++) {
        if (doots[i].wish > rand && a.visited[i] == 0) {
            X = doots[i].x;
            Y = doots[i].y;
            vertex = i;
            break;
        }
        else if (rand >= doots[i].wish) {
            rand -= doots[i].wish;
        }
    }

    for (var i = 0; i < doots.length; i++) {
        doots[i].pheromone *= 0.8;
    }

    if (vertex != -1) {
        a.dist += a.distance(doots[vertex].x, doots[vertex].y);
        a.x = X;
        a.y = Y;
        a.currentPos = vertex;
        a.path.push(vertex);
        a.visited[vertex] = 1;
    }
}

function visualize(cities, lines) {
    window.lines = [];
    let tour = bestPathArr.slice();
    for (let i = 0; i < tour.length - 1; i++) {
        let departure = tour[i];
        let arrival = tour[i + 1];
        window.lines.push(new Line(cities[departure], cities[arrival]));
    }
    let lastCity = tour[tour.length - 1];
    window.lines.push(new Line(cities[lastCity], cities[tour[0]]));
}



export async function start() {
    doots = window.dots.slice();
    points = [];
    bestPathArr = [];
    doots;
    pheromone = [];
    bestPath = Infinity;
    var vertexf = -1;

    for (let i = 0; i < doots.length; i++) {
        var a = new Point();
        points.push(a);
    }

    pheromone.length = doots.length;

    for (var i = 0; i < doots.length; i++) {
        pheromone[i] = [];
        for (var j = 0; j < doots.length; j++) {
            pheromone[i][j] = 0.2;
        }
    }

    for (var k = 0; k < 1000; k++) {
        if (window.endAlgo == false) {
            break;
        }
        for (var j = 0; j < points.length; j++) {
            points[j].visited.length = doots.length;
            points[j].visited.fill(0);
            points[j].visited[j] = 1;

            points[j].x = doots[j].x;
            points[j].y = doots[j].y;

            points[j].path = [];
            points[j].currentPos = j;
            points[j].path.push(j);

            for (var i = 0; i < doots.length; i++) {
                computation_references(points[j]);
                findNextPoint(points[j]);
            }


            points[j].path.push(j);
            points[j].dist += points[j].distance(doots[j].x, doots[j].y);

            if (bestPath >= points[j].dist) {
                bestPath = points[j].dist;
                vertexf = j;
                bestPathArr = points[j].path;
            }
        }

        for (var i = 0; i < doots.length; i++) {
            for (var j = 0; j < doots.length; j++) {
                pheromone[i][j] *= 0.8;
            }
        }

        for (var j = 0; j < points.length; j++) {
            for (var i = 0; i < points[j].path.length - 1; i++) {
                pheromone[points[j].path[i]][points[j].path[i + 1]] += Q / points[j].dist;
                pheromone[points[j].path[i + 1]][points[j].path[i]] += Q / points[j].dist;
            }
            points[j].dist = 0;
        }

        visualize(doots, lines);
        updateInfo(k, bestPath);
        await sleep(10);
    }
    window.endAlgo = true;

}


import { Line } from '../dots.js'
import { updateInfo } from './script.js'
import { sleep } from '../general.js';


