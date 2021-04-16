var dotsCollection = window.dots;

function makeClusterArray(algorithm) {
    algorithm(window.chooseSize.value);

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
    console.log("Intersection", kmeansCluster, hierarchyCluster);
    let result = hierarchyCluster.filter(i => kmeansCluster.includes(i));
    console.log(result);
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
    let kmeansClusters = makeClusterArray(kmeans);
    let hierarchyClusters = makeClusterArray(hierarchy);

    let list = makeJaccardList(kmeansClusters, hierarchyClusters);
    list.sort((a, b) => a.jaccard - b.jaccard);

    window.kmeansColors = [];
    window.hierarchyColors = [];

    while(list.length) {
        let currentCluster = list[0];
        let kmeansCluster = currentCluster.kmeans;
        let hierarchyCluster = currentCluster.hierarchy;

        let clusterColor = generateColors();
        window.kmeansColors[kmeansCluster] = clusterColor;
        window.hierarchyColors[hierarchyCluster] = clusterColor;

        let intersection = findIntersection(kmeansClusters[kmeansCluster], hierarchyClusters[hierarchyCluster]);
        for (let dot of intersection) {
            dot.kmeansCluster = kmeansClusters;
            dot.hierarchyCluster = hierarchyCluster;
        }

        console.log(intersection);

        let difference = getDifference(kmeansClusters[kmeansCluster], hierarchyClusters[hierarchyCluster]);
        for (let dot of difference) {
            dot.kmeansCluster = kmeansClusters;
            dot.hierarchyCluster = hierarchyCluster;
        }

        list = clearDots(list, kmeansCluster, hierarchyCluster);
    }
}

import {kmeans} from './k-means.js'
import {hierarchy} from './hierarchy.js'