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

/* export class DotCollection extends Map {
    search(x, y, radius) {
        let dots = this.values();
        for (let dot of dots) {
            if ((dot.x - x)**2 + (dot.y - y)**2 < radius**2) {
                return this.get(dot.x, dot.y);
            }
        }
    }
    get(x, y) {
        return super.get(`${x},${y}`);
    }
    add(x, y) {
        let coordId = `${x},${y}`;
        if (this.search(x, y, 20) == undefined) {
            this.set(coordId, new Dot(x, y));
        }
    }
    remove(x, y) {
        let target = this.search(x, y, 10);
        if (target != undefined) this.delete(`${target.x},${target.y}`);
    }
} */

export class Dot {
    constructor(x, y,claster) {
        this.x = x;
        this.y = y;
        this.claster=undefined;
    }
}