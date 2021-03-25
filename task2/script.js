class DotCollection extends Map {
    get(x, y) {
        return super.get(`${x},${y}`);
    }
    add(x, y, context) {
        let coordId = `${x},${y}`;
        if (!this.has(coordId)) {
            console.log(x, y);
            context.beginPath();
            context.fillColor = 'black';
            let figure = new Path2D();
            figure.arc(x, y, 10, 0, Math.PI*2);
            context.fill(figure);
            this.set(coordId, new Dot(x, y));
        }
    }
    remove(x, y, context) {
        let coordId = `${x},${y}`;
        context.beginPath();
        context.fillColor = "rgba(255, 255, 255, 0)";
        context.arc(x, y, 10, 0, Math.PI*2);
        context.fill();
        this.delete(coordId);
        console.dir(this);
    }
}

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var action = "default";
var dots = new DotCollection();
var canvas = document.querySelector(".fieldCanvas");
var context = canvas.getContext('2d');

window.onload = resizeField;
window.backButton.onclick = () => location.href="../index.html";
window.onresize = resizeField;
window.actionButtons.addEventListener("click", changeAction);

let statusMap = new Map([['default', 'Не выбрано'], ['add', 'Добавление точки'], ['remove', 'Удаление точки']]);

function changeAction(event) {
    if (event.target.className == "selectActionButton") {
        let label = document.getElementById("currentAction");
        action = event.target.dataset.action;
        label.innerText = statusMap.get(action);
    }
    if (event.target.className == "clearField") {
        clearField();
    }
}

function resizeField() {
    let field = document.querySelector(".fieldCanvas");
    field.width = field.clientWidth;
    field.height = field.clientHeight;
}

function manageDots(event) {
    switch (action) {
        case "default":
            return;
        case "add":
            dots.add(event.offsetX, event.offsetY, context);
            break;
        case "remove":
            dots.remove(event.offsetX, event.offsetY, context);
            break;
    }
}

canvas.addEventListener("click", manageDots);