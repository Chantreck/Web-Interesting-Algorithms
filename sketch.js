var size;
var placeHolder = window.field;
var dotsCollection = window.dotsCollection;

function setup() {
    size = placeHolder.clientWidth;
    let canvas = createCanvas(size, size);
    canvas.parent('field');
    frameRate(30);
}

function draw() {
    background("white");
    let dots = dotsCollection.values();
    for (let dot of dots) {
        circle(dot.x, dot.y, 20);
    }
}

function manageDots(x, y) {
    switch (action) {
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