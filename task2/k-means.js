var dotsCollection;
var clusterCount;

function getRandom(size) {
    let rand = Math.floor(Math.random() * (size));
    return rand;
}

function nearestClusterToPoint(point, centroidArray) { // ближайший кластер
    let x1 = dotsCollection[point].x;
    let y1 = dotsCollection[point].y;

    let distancesToPoint = new Array(clusterCount);
    console.log(clusterCount);
    for (let i = 0; i < clusterCount; i++) {
        let x2 = centroidArray[i].x;
        let y2 = centroidArray[i].y;
        distancesToPoint[i] = sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    let min = Infinity;
    let index = 0;
    for (let i = 0; i < distancesToPoint.length; i++) {
        if (distancesToPoint[i] < min) {
            min = distancesToPoint[i];
            index = i;
        }
    }
    
    return index;
}

function getRandomClusters() {
    let random = new Set();
    while (random.size != clusterCount) { // рандомные центры класстеров
        random.add(getRandom(dotsCollection.length));
    }
    return random;
}

function checkClustersChange(centroid) {
    let check = false;
    let nearestCluster;
    for (let i = 0; i < dotsCollection.length; i++) {
        nearestCluster = nearestClusterToPoint(i, centroid);
        if (dotsCollection[i].cluster != nearestCluster) { // проверка меняется ли кластер
            check = true;
            dotsCollection[i].cluster = nearestCluster;
        }
    }
    return check;
}

function calculateCentroids(centroid, count) {
    for (let i = 0; i < dotsCollection.length; i++) {
        centroid[dotsCollection[i].cluster].x += dotsCollection[i].x;
        centroid[dotsCollection[i].cluster].y += dotsCollection[i].y;
    }
    
    for (let i = 0; i < clusterCount; i++)
        for (let j = 0; j < dotsCollection.length; j++) {
            if (i == dotsCollection[j].cluster) {
                count[i] += 1;
            }
        }

    for (let i = 0; i < clusterCount; i++) {
        centroid[i].x = centroid[i].x / count[i];
        centroid[i].y = centroid[i].y / count[i];
    }
}

export function kmeans(countCluster) {
    dotsCollection = window.dots;
    clusterCount = countCluster;
    var count = [];

    let random = Array.from(getRandomClusters());

    console.log("80")

    var centroid = new DotCollection();
    for (let i = 0; i < clusterCount; i++) {
        centroid.push(new Dot(dotsCollection[random[i]].x, dotsCollection[random[i]].y));
    }

    console.log("87")

    let change = true;

    while (change) {
        change = checkClustersChange(centroid);

        for (let i = 0; i < clusterCount; i++) {
            centroid[i].x = 0;
            centroid[i].y = 0;
            count[i] = 0;
        }

        calculateCentroids(centroid, count);
    }
}

import {DotCollection, Dot} from "./dots.js"