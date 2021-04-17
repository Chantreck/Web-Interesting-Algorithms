var size;
var placeHolder = window.field;
var dots = window.dots;

function setup() {
    placeHolder = window.field;
    size = placeHolder.clientWidth;
    let canvas = createCanvas(size, size);
    canvas.parent('field');
    frameRate(15);
}

function draw() {
    resizeCanvas(window.field.clientWidth, window.field.clientWidth);
    background("white");
    let i = 0;
    for (let dot of dots) {
        if (dot.kmeansCluster != undefined) {
            console.log("aa");
            fill(window.kmeansColors[dot.kmeansCluster]);
            arc(dot.x, dot.y, 20, 20, 0, PI, OPEN);
            fill(window.hierarchyColors[dot.hierarchyCluster]);
            arc(dot.x, dot.y, 20, 20, PI, TWO_PI, OPEN);
        } else {
            if (dot.cluster != undefined) {
                fill(colors[dot.cluster]);
            } else {
                fill("white");
            }
            circle(dot.x, dot.y, 20);
        }
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