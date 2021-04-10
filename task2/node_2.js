import { DotCollection, Dot } from "./dots_task2.js"

export function run() {
    var dotsCollection = window.dots;
    var count = [];
    for (let i = 0; i < dotsCollection.length; i++) {
        dotsCollection[i].claster = i;
    }
    let count_claster = 3;

    var centroid = new DotCollection();
    for (let i = 0; i < dotsCollection.length; i++)
        centroid.push(new Dot(dotsCollection[i].x, dotsCollection[i].y));
    /*for (let i = 0; i < count_claster; i++) {
        //centroid.push(new Dot(0, 0));
        count[i] = 0;
    }
    */
    let copyDots = new DotCollection();
    for (let i = 0; i < dotsCollection.length; i++)
        copyDots.push(new Dot(dotsCollection[i].x, dotsCollection[i].y));

    let min_distance = Number.MAX_SAFE_INTEGER;
    let min_i = 0;
    let min_j = 0;
    let k = 0;
    debugger;
    while (k != count_claster) {
        k = 0;
        for (let i = 0; i < centroid.length; i++) {
            for (let j = i + 1; j < copyDots.length; j++) {
                if (sqrt((copyDots[j].x - centroid[i].x) ** 2 + (copyDots[j].y - centroid[i].y) ** 2) < min_distance && centroid[i].x > 0 && centroid[i].y > 0) {
                    min_i = i;
                    min_j = j;
                    min_distance = sqrt((copyDots[j].x - centroid[i].x) ** 2 + (copyDots[j].y - centroid[i].y) ** 2);
                }
            }
        }
        if (min_j > min_i) {
            //dotsCollection[min_j].claster = dotsCollection[min_i].claster;
            let a =  min_j; 
            for (let i = 0; i < dotsCollection.length; i++) {
                if (dotsCollection[i].claster == a) {
                    dotsCollection[i].claster = dotsCollection[min_i].claster;
                }
            }
            centroid[min_i].x += (centroid[min_j].x);
            centroid[min_i].y += (centroid[min_j].y);
            centroid[min_i].x /= 2;
            centroid[min_i].y /= 2;
            centroid[min_j].x = 0;
            centroid[min_j].y = 0;
            copyDots[min_j].x = 0;
            copyDots[min_j].y = 0;
            copyDots[min_i].x = centroid[min_i].x;
            copyDots[min_i].y = centroid[min_i].y;
        }

        else {
            //dotsCollection[min_i].claster = dotsCollection[min_j].claster;
            for (let i = 0; i < dotsCollection.length; i++) {
                if (dotsCollection[i].claster == dotsCollection[min_i].claster) {
                    dotsCollection[i].claster = dotsCollection[min_i].claster;
                }
            }
            centroid[min_j].x += centroid[min_i].x;
            centroid[min_j].y += centroid[min_i].y;
            centroid[min_j].x /= 2;
            centroid[min_j].y /= 2;
            centroid[min_i].x = 0;
            centroid[min_i].y = 0;
            copyDots[min_i].x = 0;
            copyDots[min_i].y = 0;
            copyDots[min_j].x = centroid[min_j].x;
            copyDots[min_j].y = centroid[min_j].y;
        }

        min_distance = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < centroid.length; i++) {
            if (centroid[i].x > 0 && centroid[i].y > 0)
                k += 1;
        }

    }
    console.log(copyDots);
    console.log(min_j);
    console.log(min_j)
    console.log(dotsCollection);
    console.log(centroid);
}

