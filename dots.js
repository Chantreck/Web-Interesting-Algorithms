export class DotCollection extends Array {
    search(x, y, radius) {
        for (let dot of this) {
            if ((dot.x - x)**2 + (dot.y - y)**2 < radius**2) {
                return dot;
            }
        }
    }
    add(x, y) {
        if (this.search(x, y, 20) == undefined) {
            this.push(new Dot(x, y));
        }
    }
    remove(x, y) {
        let target = this.search(x, y, 10);
        if (target != undefined) this.splice(this.indexOf(target), 1);
    }
}

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Line {
    constructor(dot1, dot2) {
        this.x1 = dot1.x;
        this.x2 = dot2.x;
        this.y1 = dot1.y;
        this.y2 = dot2.y;
    }
}