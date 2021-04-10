import { DotCollection, Dot } from "./dots_task2.js"

export function run() {
    var dotsCollection = window.dots;
   let count_claster = Math.min( 3, dotsCollection.length);
    var count = [];
    //let count_claster=document.getElementById("chooseSize").value;

    function getRandom(size) { // рандомные
        let rand = Math.floor(Math.random() * (size));
        return rand;
    }
    let random = new Set();
    while (random.size != count_claster){ // рандомные центры класстеров
        random.add(getRandom(dotsCollection.length));
    }
    console.log(random);
    var randomCentre = Array.from(random);

    var centroid = new DotCollection();

    for (let i = 0; i < count_claster; i++) {
        centroid.push(new Dot(dotsCollection[randomCentre[i]].x, dotsCollection[randomCentre[i]].y));
    }

    let Change = true;
    let min_cluster;

    while (Change == true) {

        Change = false;
        for (let i = 0; i < dotsCollection.length; i++) {

            min_cluster = calculationMinDistation(i, centroid); //вернула индекс

            if (dotsCollection[i].claster != min_cluster) { // проверка меняется ли кластер
                Change = true;
                dotsCollection[i].claster = min_cluster;
            }
        }
        for (let i = 0; i < count_claster; i++) {
            centroid[i].x = 0;
            centroid[i].y = 0;
            count[i] = 0;
        }

        for (let i = 0; i < dotsCollection.length; i++) {
            centroid[dotsCollection[i].claster].x += dotsCollection[i].x;
            centroid[dotsCollection[i].claster].y += dotsCollection[i].y;
        }
        for (let i = 0; i < count_claster; i++)
            for (let j = 0; j < dotsCollection.length; j++) {
                if (i == dotsCollection[j].claster) {
                    count[i] += 1;
                }
            }

        for (let i = 0; i < count_claster; i++) { //центроид 
            centroid[i].x = centroid[i].x / count[i];
            centroid[i].y = centroid[i].y / count[i];
        }

    }

    function calculationMinDistation(j, centroid) { // расстояние от 1 точки до другой
        let x1 = dotsCollection[j].x;
        let y1 = dotsCollection[j].y;
        let distance_point = new Array(count_claster);

        for (let i = 0; i < count_claster; i++) {
            let x2 = centroid[i].x;
            let y2 = centroid[i].y;
            distance_point[i] = sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        }

        let min = Number.MAX_SAFE_INTEGER;
        let index = 0;
        for (let i = 0; i < distance_point.length; i++) {
            if (distance_point[i] < min) {
                min = distance_point[i];
                index = i;
            }

        }
        return index;
    }
    /*function getDistance(random){
        let distance=0;
        for(let i=0;i<random.size-1;i++){
            distance = sqrt((dotsCollection[random].x - dotsCollection[random+1].x) ** 2 + (dotsCollection[random].y - dotsCollection[random+1].y) ** 2;
            if(distance<10)
                return false;
        }

    }
    */
    console.log(dotsCollection);
}
