var size;
var placeHolder = window.field;
var dots = window.dots;
/*
function generateColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
  }
  */
//var colors = ["red", "green", "blue", "yellow", "gray","orange", "white", "aqua","lime"]

function setup() {
    size = placeHolder.clientWidth;
    let canvas = createCanvas(size, size);
    canvas.parent('field');
    frameRate(15);
}

function draw() {
    background("white");
    let i = 0;
    for (let dot of dots) {
        if (dot.cluster != undefined) {
            if (dot.cluster >= colors.length) fill(generateColor());
            else fill(colors[dot.cluster]);
        } else {
            fill("white");
        }
        circle(dot.x, dot.y, 20);
        fill("black");
        text(`${i}`, dot.x, dot.y);
        textAlign(CENTER, CENTER);
        i++;
    }
}

function manageDots(x, y) {
    switch (window.action) {
        case "default":
            return;
        case "add":
            dots.add(x, y);
            break;
        case "remove":
            dots.remove(x, y);
            break;
    }
}

function mouseClicked() {
    if (mouseX >= 10 && mouseX <= size-10 && mouseY >= 10 && mouseY <= size-10) {
        manageDots(mouseX, mouseY);
    }
}

function windowResized() {
    size = placeHolder.clientWidth;
    resizeCanvas(size, size);
}