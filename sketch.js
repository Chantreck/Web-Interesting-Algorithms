var size;
var placeHolder = window.field;
var dots = window.dotsCollection;
var lines = window.lineCollection;

function setup() {
    size = placeHolder.clientWidth;
    let canvas = createCanvas(size, size);
    canvas.parent('field');
    frameRate(30);
}

function draw() {
    background("white");
    for (let line of window.lineCollection) {
        line(line.x1, line.y1, line.x2, line.y2);
        console.log("smth");
        console.log(line);
        stroke("black");
    }
    let i = 0;
    for (let dot of window.dotsCollection) {
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
            dotsCollection.add(x, y);
            // window.dotsCount.innerText = dotsCollection.size;
            break;
        case "remove":
            dotsCollection.remove(x, y);
            // window.dotsCount.innerText = dotsCollection.size;
            break;
        case "info":

    }
}

function mouseClicked() {
    if (mouseX >= 10 && mouseX <= size-10 && mouseY >= 10 && mouseY <= size-10) {
        manageDots(mouseX, mouseY);
    }
}

function windowResized() {
    let size = placeHolder.clientWidth;
    resizeCanvas(size, size);
}