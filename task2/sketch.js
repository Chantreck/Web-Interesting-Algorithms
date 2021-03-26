var placeHolder = window.field;

function setup() {
    let size = placeHolder.clientWidth;
    let canvas = createCanvas(size, size);
    canvas.parent('field');
    frameRate(1);
}

function draw() {
    background("white");
}

function windowResized() {
    let size = placeHolder.clientWidth;
    resizeCanvas(size, size);
}