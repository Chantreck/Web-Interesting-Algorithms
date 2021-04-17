var dotsCollection;
var clusterCount;

function calculateMinDistance(copyDots, centroid, i, j) {
    return sqrt((copyDots[j].x - centroid[i].x) ** 2 + (copyDots[j].y - centroid[i].y) ** 2);
}

function changeCentroids(centroid, min_i, min_j, copyDots) {
    centroid[min_i].x += centroid[min_j].x;
    centroid[min_i].y += centroid[min_j].y;
    centroid[min_i].x /= 2;
    centroid[min_i].y /= 2;
    centroid[min_j].x = 0;
    centroid[min_j].y = 0;
    copyDots[min_j].x = 0;
    copyDots[min_j].y = 0;
    copyDots[min_i].x = centroid[min_i].x;
    copyDots[min_i].y = centroid[min_i].y;
}

export function hierarchy(countCluster) {
    dotsCollection = window.dots;
    clusterCount = countCluster;

    for (let i = 0; i < dotsCollection.length; i++) {
        dotsCollection[i].cluster = i;
    }

    var centroid = new DotCollection();
    let copyDots = new DotCollection();

    for (let i = 0; i < dotsCollection.length; i++) {
        centroid.push(new Dot(dotsCollection[i].x, dotsCollection[i].y));
        copyDots.push(new Dot(dotsCollection[i].x, dotsCollection[i].y));
    }

    let minDistance = Infinity;
    let min_i = 0;
    let min_j = 0;
    let currentClusterCount = dotsCollection.length;

    while (currentClusterCount != clusterCount) {
        currentClusterCount = 0;

        for (let i = 0; i < centroid.length; i++) {
            for (let j = i + 1; j < copyDots.length; j++) {
                let currentMinDistance = calculateMinDistance(copyDots, centroid, i, j);
                if (currentMinDistance < minDistance && centroid[i].x > 0 && centroid[i].y > 0 && centroid[j].x > 0 && centroid[j].y > 0) {
                    min_i = i;
                    min_j = j;
                    minDistance = currentMinDistance;
                }
            }
        }

        let maxCluster = min_j;
        for (let i = 0; i < dotsCollection.length; i++) {
            if (dotsCollection[i].cluster == maxCluster) {
                dotsCollection[i].cluster = dotsCollection[min_i].cluster;
            }
        }
        
        changeCentroids(centroid, min_i, min_j, copyDots);

        minDistance = Infinity;
        min_j = 0;
        min_i = 0;
        for (let i = 0; i < centroid.length; i++) {
            if (centroid[i].x != 0 && centroid[i].y != 0)
                currentClusterCount += 1;
        }
    }
}

import { DotCollection, Dot } from "./dots.js"