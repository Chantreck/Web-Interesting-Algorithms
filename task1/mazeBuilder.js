var n;
var value;
var visited;
var unvisited;

export function interact(size){
    n = size;
    value = [];
    visited = [];
    unvisited = -1;
    return build_maze(size);
}
    
class Point {
    constructor(x = -1, y = -1) {
        this.x = x;
        this.y = y;
    }
}

function getNeighbours(point) {
    let up = new Point(point.x, point.y-2);
    let down = new Point(point.x, point.y+2);
    let right= new Point(point.x+2, point.y);
    let left = new Point(point.x-2, point.y);

    let sides = [down, right, up, left];
    let result = [];
    let size = 0;
        
    for (let i = 0; i < 4; i++) {                  
        if (sides[i].x >= 0 && sides[i].x < n && sides[i].y >= 0 && sides[i].y < n) {       
            if (visited[sides[i].x][sides[i].y] == false && value[sides[i].x][sides[i].y] == "default") {                            
                result[size] = sides[i];
                size++;
            }
        }           
    }
    return result;
}

function RemoveWall(PointFirst, PointSecond) {
    let x = (PointFirst.x + PointSecond.x) / 2;
    let y = (PointFirst.y + PointSecond.y) / 2;
    value[x][y] = "default";
    visited[PointSecond.x][PointSecond.y] = true;
    unvisited--;
}

function random(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function build_maze(fieldSize) {    
    n = fieldSize;
    if (!(n % 2)) n += 1; 
    
    for (let i = 0; i < n; i++) {
        value[i] = [];
        visited[i] = [];
        for (let j = 0; j < n; j++) {
            visited[i][j] = false;
            if (i % 2 == 0 && j % 2 == 0) {
                unvisited++;
                value[i][j] = "default";
            } else
                value[i][j] = "blocked";
        }
    } 


    let CurrentPoint = new Point(0,0);
    let NeighbourPoint = new Point();
    let Neighbours;
    let stack = [];
    let size = 0;
    visited[0][0] = true;

    do {         
        Neighbours = getNeighbours(CurrentPoint);
        
        if (Neighbours.length > 0) {
            stack[size] = CurrentPoint;           
            size++;        
            NeighbourPoint = Neighbours[random(0, Neighbours.length - 1)];           
            RemoveWall(CurrentPoint, NeighbourPoint);
            CurrentPoint = NeighbourPoint;
        }
        else {
            if (size > 0) {
                CurrentPoint = stack[size-1];
                size--;
            } 
        }
    } while (unvisited > 0);

    return value;
}