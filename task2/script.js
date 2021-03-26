class DotCollection extends Map {
    get(x, y) {
        return super.get(`${x},${y}`);
    }
    add(x, y) {
        let coordId = `${x},${y}`;
        if (!this.has(coordId)) {
            this.set(coordId, new Dot(x, y));
        }
    }
    remove(x, y) {
        let coordId = `${x},${y}`;
        this.delete(coordId);
    }
}

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var dots = new DotCollection();

window.addEventListener("load", () => {
    window.action = "default";
    window.backButton.onclick = () => location.href="../index.html";
    window.actionButtons.addEventListener("click", buttonClickHandler);
})

function buttonClickHandler(event) {
    if (event.target.className == "selectActionButton") {
        changeAction(event.target.dataset.action);
    }
    if (event.target.className == "clearField") {
        clearField();
    }
}

let statusMap = new Map([['default', 'Не выбрано'], ['add', 'Добавление точки'], ['remove', 'Удаление точки'], ['info', 'Просмотр информации о точке']]);

function changeAction(actionName) {
    let label = document.getElementById("currentAction");
    window.action = actionName;
    label.innerText = statusMap.get(window.action);
}

//canvas.addEventListener("click", manageDots);

/* function manageDots(event) {
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
} */