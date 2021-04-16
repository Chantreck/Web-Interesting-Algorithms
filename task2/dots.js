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
            this.push(new Dot(+x.toFixed(3), +y.toFixed(3)));
        }
    }
    remove(x, y) {
        let target = this.search(x, y, 10);
        if (target != undefined) this.splice(this.indexOf(target), 1);
    }
}

export class Dot {
    constructor(x, y, cluster) {
        this.x = x;
        this.y = y;
        this.cluster = undefined;
        this.kmeansColor = undefined;
        this.hierarchyColor = undefined;
    }
}