import { DotCollection, Dot } from "./dots.js"

export function run() {
    var dotsCollection = window.dots;

    for (let i = 0; i < dotsCollection.length; i++) {
        dotsCollection[i].cluster = 0;

    }
    console.log(dotsCollection);
    

    for (let i = 0; i < dotsCollection.length; i++) {
        dotsCollection[i].cluster = i;
    }
    var count_cluster = window.count;

    var centroid = new DotCollection();
    let copyDots = new DotCollection();

    for (let i = 0; i < dotsCollection.length; i++) {
        centroid.push(new Dot(dotsCollection[i].x, dotsCollection[i].y));
        copyDots.push(new Dot(dotsCollection[i].x, dotsCollection[i].y));
    }


    let min_distance = Number.MAX_SAFE_INTEGER;
    let min_i = 0;
    let min_j = 0;
    let iterations = 0;
    //debugger;
    while (iterations != count_cluster) {
        iterations = 0;
        for (let i = 0; i < centroid.length; i++) {
            for (let j = i + 1; j < copyDots.length; j++) {
                if (calculationMinDistance(i, j) < min_distance && centroid[i].x > 0 && centroid[i].y > 0 && centroid[j].x > 0 && centroid[j].y > 0) {
                    min_i = i;
                    min_j = j;
                    min_distance = calculationMinDistance(i, j);
                }
            }
        }

        let max_cluster = min_j;
        for (let i = 0; i < dotsCollection.length; i++) {
            if (dotsCollection[i].cluster == max_cluster) {
                dotsCollection[i].cluster = dotsCollection[min_i].cluster;
            }
        }

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



        min_distance = Number.MAX_SAFE_INTEGER;
        min_j = 0;
        min_i = 0;
        for (let i = 0; i < centroid.length; i++) {
            if (centroid[i].x != 0 && centroid[i].y != 0)
                iterations += 1;
        }

    }
    let clustersHierarchy = new Set()
    dotsCollection.map(i => clustersHierarchy.add(i.cluster));
    clustersHierarchy=Array.from(clustersHierarchy);
    for (let i = 0; i < clustersHierarchy.length; i++) {
        let clusterNum = clustersHierarchy[i];
        clustersHierarchy[i] = dotsCollection.filter(i => i.cluster == clusterNum)
    }
    console.log(clustersHierarchy);


    function calculationMinDistance(i, j) {

        let MinDistance = sqrt((copyDots[j].x - centroid[i].x) ** 2 + (copyDots[j].y - centroid[i].y) ** 2);
        return MinDistance;

    }

}

