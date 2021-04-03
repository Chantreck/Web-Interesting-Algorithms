import { DotCollection, Dot } from  "./dots_task2.js"



/*function getCenterMass(j, centre_mass, count) {// пересчет центра масс
    let center = new DotCollection();
    center.push((centre_mass[j].x / count[j]), (centre_mass[j].y / count[j]));
    // center[j].x=centre_mass[j].x/count[j];
    //center[j].j=centre_mass[j].j/count[j];
    return center;
}
*/

export function run() {
    var dotsCollection = window.dots;
    let count_claster = 5;
    let count = [];
    function getRandom(size) { // рандомные
        let rand = Math.floor(Math.random() * (size));
        return rand;
    }
    
    
    let random = new Set();
    while (random.size != count_claster) // рандомные центры класстеров
        random.add(getRandom(dotsCollection.length));
    
    var arr = Array.from(random);
    /*arr[0]=0;
    arr[1]=1;
    arr[2]=2;
    console.dir(arr);
    */
    
    
    
    var centre_mass = new DotCollection();
    for (let i = 0; i < count_claster; i++) {
        centre_mass.push(new Dot(0, 0));
    }
    
    var center_ = new DotCollection();
    
    for (let i = 0; i < count_claster; i++) {
        center_.push(new Dot(dotsCollection[arr[i]].x, dotsCollection[arr[i]].y));
    }
    console.dir(center_);
    //console.dir(centre_mass);
    
    
    /*for (let i = 0; i < count_claster; i++) {
        centre_mass[i].x -= dotsCollection[arr[i]].x;
        centre_mass[i].y -= dotsCollection[arr[i]].y;
    }*/
    
    
    
    
    let k = 0;
    let Change = true;
    let minim;
    console.dir(center_);
    while (Change == true && k < 1000) {
        k++;
        Change = false;
        for (let i = 0; i < dotsCollection.length; i++) {
    
            minim = calculationMinDistation(i, center_); //вернула индекс
            //dotsCollection[i].claster = minim; // присвоила 
    
            //centre_mass[minim].x += dotsCollection[i].x; // центра масс в виде суммы по икс
            //centre_mass[minim].y += dotsCollection[i].y; // центра масс в виде суммы по игрек
    
            if (dotsCollection[i].claster != minim) { // проверка
                Change = true;
                dotsCollection[i].claster = minim;
            }
    
    
    
        }
        for (let i = 0; i < count_claster; i++) {
            center_[i].x = 0;
            center_[i].y = 0;
            center_[i].claster = 0;
        }
    
        /*for (let i = 0; i < count_claster; i++) {
            centre_mass.shift();
            centre_mass.push(new Dot (0,0));
        }*/
    
        /*for (let i = 0; i < count_claster; i++) { //кол-во точек в кластере
            count[i] = 0;
        }
        for (let i = 0; i < count_claster; i++) {
            for (let j = 0; j < dotsCollection.length; j++) {
                if (dotsCollection[j].claster == i) {
                    count[i] += 1;
                }
            }
        }
        */
        for (let i = 0; i < dotsCollection.length; i++) {
            center_[dotsCollection[i].claster].x += dotsCollection[i].x; // центра масс в виде суммы по икс
            center_[dotsCollection[i].claster].y += dotsCollection[i].y;
            center_[dotsCollection[i].claster].claster++; // центра масс в виде суммы по игрек
        }
        console.dir(center_);
        for (let i = 0; i < count_claster; i++) { //центроид 
            //center_[i]= getCenterMass(i, centre_mass, count);
            center_[i].x = center_[i].x / center_[i].claster;
            center_[i].y = center_[i].y / center_[i].claster;
        }
        /*for (let i = 0; i < count_claster; i++) {
            centre_mass.shift();
            centre_mass.push(new Dot (0,0));
        }
        */
    
        console.dir(k);
        //console.dir(center_);
        //
    }
    console.dir(dotsCollection);
    function calculationMinDistation(j, center_) { // расстояние от 1 точки до другой
        //console.dir(centre_mass);
    
        let x1 = dotsCollection[j].x;
        let y1 = dotsCollection[j].y;
        let distance_point = new Array(count_claster);
    
        for (let i = 0; i < count_claster; i++) {
            let x2 = center_[i].x;
            let y2 = center_[i].y;
            //if (x1 == x2 && y1 == y2) {
            //  return i;
            //}
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
}