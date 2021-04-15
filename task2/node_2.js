import { DotCollection, Dot } from "./dots_task2.js"

export function run() {
    var dotsCollection = window.dots;

    for (let i = 0; i < dotsCollection.length; i++) {
        dotsCollection[i].cluster = 0;
    
    }
    function generateColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }

    for (let i = 9; i < dotsCollection.length; i++) {
        window.colors[i] = generateColor();
    }

    var count = [];
    for (let i = 0; i < dotsCollection.length; i++) {
        dotsCollection[i].cluster = i;
    }
    var count_cluster= window.count; 

    var centroid = new DotCollection();
   
    for (let i = 0; i < dotsCollection.length; i++)
        centroid.push(new Dot(dotsCollection[i].x, dotsCollection[i].y));


    let copyDots = new DotCollection();

    for (let i = 0; i < dotsCollection.length; i++)
        copyDots.push(new Dot(dotsCollection[i].x, dotsCollection[i].y));

    let min_distance = Number.MAX_SAFE_INTEGER;
    let min_i = 0;
    let min_j = 0;
    let k = 0;
    debugger;
    while (k != count_cluster) {
        k = 0;
        for (let i = 0; i < centroid.length; i++) {
            for (let j = i + 1; j < copyDots.length; j++) {
                if (sqrt((copyDots[j].x - centroid[i].x) ** 2 + (copyDots[j].y - centroid[i].y) ** 2) < min_distance && centroid[i].x > 0 && centroid[i].y > 0 && centroid[j].x > 0 && centroid[j].y > 0) {
                    min_i = i;
                    min_j = j;
                    min_distance = sqrt((copyDots[j].x - centroid[i].x) ** 2 + (copyDots[j].y - centroid[i].y) ** 2);
                }
            }
        }
        //if (min_j > min_i) {
        //dotsCollection[min_j].cluster = dotsCollection[min_i].cluster;
        let a = min_j;
        for (let i = 0; i < dotsCollection.length; i++) {
            if (dotsCollection[i].cluster == a) {
                dotsCollection[i].cluster = dotsCollection[min_i].cluster;
            }
        }
        {
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
            // }
        }

        min_distance = Number.MAX_SAFE_INTEGER;
        min_j = 0;
        min_i = 0;
        for (let i = 0; i < centroid.length; i++) {
            if (centroid[i].x != 0 && centroid[i].y != 0)
                k += 1;
        }

    }
   
    // window.algorithmDone = true; 
    //console.log(copyDots);
    //console.log(min_j);
    //console.log(min_j)
    console.log(dotsCollection);
    console.log(centroid);

}

