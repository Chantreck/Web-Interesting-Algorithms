var size;
var placeHolder = window.field;
var dots = window.dots;
var lines = window.lines;

function setup() {
    size = placeHolder.clientWidth;
    let canvas = createCanvas(size, size);
    canvas.parent('field');
    frameRate(30);
}

function draw() {
    background("white");
    let i = 0;
    for (let curLine of lines) {
        line(curLine.x1, curLine.y1, curLine.x2, curLine.y2);
        stroke("black");
    }
    for (let dot of dots) {
        circle(dot.x, dot.y, 20);
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
    window.objectCount.innerText = dots.length;
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