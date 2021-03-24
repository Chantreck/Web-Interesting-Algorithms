class Cell
{
    constructor(x = -1, y = -1)
    {
        this.x=x;
        this.y=y;
    }
}

function getNeighbours(cell) //возвращаем непосещенных соседей клетки
{        
    let up = new Cell(cell.x, cell.y-2);
    let dw = new Cell(cell.x, cell.y+2);
    let rt = new Cell(cell.x+2, cell.y);
    let lt = new Cell(cell.x-2, cell.y);

    let d = [dw, rt, up, lt];
    let result = [];
    let size=0;
        
    for(let i = 0; i < 4; i++)
    {                  
        if(d[i].x >= 0 && d[i].x <= n && d[i].y > 0 && d[i].y <= n)
        {       
            if(visited[d[i].x][d[i].y] == false && status[d[i].x][d[i].y] == true)
            {                            
                result[size] = d[i];
                size++;
            }
        }           
    }
    return result;
}


function RemoveWall(CellFirst, CellSecond) //удаляем стену
{
    let x = (CellFirst.x+CellSecond.x)/2;
    let y = (CellFirst.y+CellSecond.y)/2;
    status[x][y]=true;
    visited[CellSecond.x][CellSecond.y]=true;
    unvisited--;
}

function random(min, max) 
{
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}


let n = 15;     ///!!!!!!!!!!!!!!!!!!!!!!!!
let status = [];  // клетка/стена
let visited = [];
let unvisited = -1;

for(let i = 0; i < n; i++)
{
    status[i] = [];
    visited[i] = [];
    for(let j = 0; j < n; j++)
    {
        visited[i][j] = false;
        if(i % 2 == 0 && j % 2 == 0)
        {
            unvisited++;
            status[i][j] = true;
        }
        else
            status[i][j] = false;
    }
} 

//генерация лабиринта
let CurrentCell = new Cell(0,0);
let NeighbourCell = new Cell();
let Neighbours;
let stack = [];
let size=0;
visited[0][0]=true;

do{         
    Neighbours = getNeighbours(CurrentCell);
    
    if(Neighbours.length > 0)
    {
        stack[size]=CurrentCell;           
        size++;        
        NeighbourCell = Neighbours[random(0, Neighbours.length - 1)];           
        RemoveWall(CurrentCell, NeighbourCell);
        CurrentCell=NeighbourCell;
    }
    else
    {
        if (size > 0)
        {
            CurrentCell=stack[size-1];
            size--;
        }
        else
        {
            alert("У нас проблемы");
        }
    }
} while(unvisited > 0);
