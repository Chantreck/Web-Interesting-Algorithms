var placeHolder = window.field;
var x2;
var y2;

function setup() {
    window.clearField.addEventListener("click", cleaning);
    window.size = placeHolder.clientWidth;
    const canvas = createCanvas(size, size);
    canvas.parent('field');
    background("white");
    clear();
    frameRate(60);
}

function draw() {
    let x1 = mouseX;
    let y1 = mouseY;
    if (mouseIsPressed == true) {
        if (mouseButton == LEFT) {
            stroke("black");
            strokeWeight(30);
            line(x1, y1, x2, y2);
        }
    }
    x2 = mouseX;
    y2 = mouseY;
}

function windowResized() {
    size = placeHolder.clientWidth;
    resizeCanvas(size, size);
}

function cleaning() {
    clear();
    window.resultBlock.style.display = "none";
}