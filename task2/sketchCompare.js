var size;
var placeHolder = window.hiddenField;
var dots = window.dots;

function setup() {
    size = placeHolder.clientWidth;
    let canvas = createCanvas(size, size);
    canvas.parent('hiddenField');
    frameRate(15);
}

function draw() {
    resizeCanvas(placeHolder.clientWidth, placeHolder.clientWidth);
    background("white");
    let i = 0;
    for (let dot of dots) {
        if (dot.kmeansColor != undefined) {
            fill(window.kmeansColors[dot.kmeansCluster]);
            arc(dot.x, dot.y, 20, 20, 0, PI, OPEN);
            fill(window.hierarchyColors[dot.hierarchyCluster]);
            arc(dot.x, dot.y, 20, 20, PI, 2*PI, OPEN);
        } else {
            fill("white");
            circle(dot.x, dot.y, 20);
        }
        
        fill("black");
        text(`${i}`, dot.x, dot.y);
        textAlign(CENTER, CENTER);
        i++;
    }
}