var dotsCollection = window.dots;

function makeClusterArray(algorithm) {
    algorithm(window.chooseSize.value);

    console.log("algo ended")

    let clusters = new Set();
    dotsCollection.map(dot => clusters.add(dot.cluster));

    clusters = Array.from(clusters);
    for (let i = 0; i < clusters.length; i++) {
        let clusterNum = clusters[i];
        clusters[i] = dotsCollection.filter(dot => dot.cluster == clusterNum)
    }

    return clusters;
}

function findIntersection(kmeansCluster, hierarchyCluster) {
    let result = hierarchyCluster.filter(i => kmeansCluster.includes(i));
    return result;
}

function calculateJaccard(kmeansCluster, hierarchyCluster) {
    let intersection = findIntersection(kmeansCluster, hierarchyCluster).length;
    let union = kmeansCluster.length + hierarchyCluster.length - intersection;
    return intersection / union;
}

function makeJaccardList(kmeansClusters, hierarchyClusters) {
    let list = [];
    for (let i = 0; i < kmeansClusters.length; i++) {
        for (let j = 0; j < kmeansClusters.length; j++) {
            list[list.length] = {
                jaccard: calculateJaccard(kmeansClusters[i], hierarchyClusters[j]),
                kmeans: i,
                hierarchy: j
            }
        }
    }
    return list;
}

function getDifference(arrA, arrB) {
    return arrA.filter(x => !arrB.includes(x)).concat(arrB.filter(x => !arrA.includes(x)));
}

function generateColors() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

function clearDots(list, kmeans, hierarchy) {
    return list.filter(dot => dot.kmeans != kmeans && dot.hierarchy != hierarchy);
}

export function compare() {
    dotsCollection = window.dots;
    let kmeansClusters = makeClusterArray(kmeans); //список К-средних 
    let hierarchyClusters = makeClusterArray(hierarchy); //список кластеров иерарихии

    let list = makeJaccardList(kmeansClusters, hierarchyClusters);
    list.sort((a, b) => b.jaccard - a.jaccard);

    window.kmeansColors = [];
    window.hierarchyColors = [];

    let count = 0;
    window.colors = ["red", "green", "blue", "yellow", "gray", "orange", "pink", "aqua", "lime", "magenta", "white"];

    while(list.length) {
        let currentCluster = list[0]; //пара кластеров, наибольшая похожая друг на друга
        let kmeansCluster = currentCluster.kmeans; //номер кластера по К-средних
        let hierarchyCluster = currentCluster.hierarchy; //номер кластера по иерархии

        window.kmeansColors[kmeansCluster] = window.colors[count];
        window.hierarchyColors[hierarchyCluster] = window.colors[count];
        count++;

        let intersection = findIntersection(kmeansClusters[kmeansCluster], hierarchyClusters[hierarchyCluster]);
        for (let dot of intersection) {
            dot.kmeansCluster = kmeansCluster;
            dot.hierarchyCluster = kmeansCluster;
        }

        let difference = getDifference(kmeansClusters[kmeansCluster], hierarchyClusters[hierarchyCluster]);
        for (let dot of difference) {
            dot.kmeansCluster = kmeansCluster;
            dot.hierarchyCluster = hierarchyCluster;
        }

        list = clearDots(list, kmeansCluster, hierarchyCluster);
    }
}

import {kmeans} from './k-means.js'
import {hierarchy} from './hierarchy.js'