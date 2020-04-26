//Maze Generator
var cols, rows;
var w = 40;
var grid = [];
var current;

var stack = [];
var solve = false;
var start = 0;
var past;
var direction = [false, false, false, false]; //north, east, south, east


 
function setup() {
  createCanvas(400, 400);
  cols = floor(width/w);
  rows= floor(height/w);
  //frameRate(5);
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i,j);
      grid.push(cell); 
    }
  }
  current = grid[0];
  
}









function draw() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  
  current.visited = true;
  current.highlight();
  
  
  // Step 1
  var next = current.checkNeighbors();
  if (next && solve==false) {
    next.visited = true;
    // Step 2
    stack.push(current);
    
    //Step 3
    removeWalls(current, next);
    
    
    // Step 4
    current = next;  
  }
  else if (stack.length > 0 && solve==false) {
    current = stack.pop();
  }
  else {
    solve=true;
    solver(0,0, "East");
  }
}



function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function index1(i, j) {

  return i + j * cols;
}


function Cell(i, j){
  this.i = i; //i is column number
  this.j = j; //j is row number
  this.walls = [true, true, true, true]; //top, right, bottom, left
  this.visited = false;
  
  
  
  this.checkNeighbors = function() {
    var neighbors = [];
    
    var top = grid[index(i, j-1)];
    var right = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left = grid[index(i-1, j)];
    
    if (solve == false) {
      if (top && !top.visited){
        neighbors.push(top);
      }
      if (right && !right.visited){
        neighbors.push(right);
      }
      if (bottom && !bottom.visited){
        neighbors.push(bottom);
      }
      if (left && !left.visited){
        neighbors.push(left);
      }
      
      if (neighbors.length > 0){
        var r = floor(random(0, neighbors.length));
        return neighbors[r];
      }
      else {
          return undefined;
      }
    }
  };
      
   
  
    
    
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  };
  
  
  
  this.show = function() {
    var x = this.i*w;
    var y = this.j*w;
    stroke(255);
    
    if (this.walls[0]) {
       line(x,y,x+w,y);
    }
    if (this.walls[1]) {
      line(x+w,y,x+w,y+w);
    }
    if (this.walls[2]) {
      line(x+w,y+w,x,y+w);
    }
    if (this.walls[3]) {
      line(x,y+w,x,y);
    }
    if (this.visited){
      noStroke();
      fill(255,0,255,100);
      rect(x,y,w,w);
    }
  };
};



function removeWalls(a, b) {
  var x = a.i - b.i;
  if (solve==false) {
    if (x==1) {
      a.walls[3]= false;
      b.walls[1]=false;
    }  
    else if (x== -1) {
      a.walls[1]= false;
      b.walls[3]=false;
    }
    
   var y = a.j - b.j;
   if (y==1) {
      a.walls[0]= false;
      b.walls[2]=false;
    }  
    else if (y==-1) {
      a.walls[2]= false;
      b.walls[0]=false;
    }
  }
  else {
    
    
  }
}

function solveHighlight(i, j) {
  var x = i*w;
  var y = j*w;
  noStroke();
  fill(0, 0, 100, 100);
  rect(x, y, w, w);  
}




function solver(x,y,expr) { 

  solveHighlight(x, y);
  
  if (current != grid[(rows*cols)-1]) {
    console.log(expr);
    switch (expr) {
      
      
      
      case "East":
        if (grid[index(x,y)].walls[0]==false) {
          current = grid[index(x,y-1)];
          solver(x, y-1, "North");//left
        }
        
        else if (grid[index(x,y)].walls[1]==false) {
          current = grid[index(x+1,y)];
          solver(x+1, y, "East");//forward
        }
        
        else if (grid[index(x,y)].walls[2]==false) {
          current = grid[index(x,y+1)];
          solver(x, y+1, "South");//right
        }
        
        else if (grid[index(x,y)].walls[3]==false){
          current = grid[index(x-1,y)];
          solver(x-1, y, "West");//back
        }
        
        break;       
        
 
        
      case "North":
        if (grid[index(x,y)].walls[3]==false) {
          current = grid[index(x-1,y)];
          solver(x-1, y, "West");//left
        }
        
        else if (grid[index(x,y)].walls[0]==false) {
          current = grid[index(x,y-1)];
          solver(x, y-1, "North");//forward
        }
        
        else if (grid[index(x,y)].walls[1]==false) {
          current = grid[index(x+1,y)];
          solver(x+1, y, "East");//right
        }
        
        else if (grid[index(x,y)].walls[2]==false){
          current = grid[index(x,y+1)];
          solver(x, y+1, "South");//back
        }
        break;
        
        
        
        
      case "South":
        if (grid[index(x,y)].walls[1]==false) {
          current = grid[index(x+1,y)];
          solver(x+1, y, "East");//left
        }
        
        else if (grid[index(x,y)].walls[2]==false) {
          current = grid[index(x,y+1)];
          solver(x, y+1, "South");//forward
        }
        
        else if (grid[index(x,y)].walls[3]==false) {
          current = grid[index(x-1,y)];
          solver(x-1, y, "West");//right
        }
        
        else if (grid[index(x,y)].walls[0]==false){
          current = grid[index(x,y-1)];
          solver(x, y-1, "North");//back
        }
        break;
        
        
        
      case "West":
        if (grid[index(x,y)].walls[2]==false) {
          current = grid[index(x,y+1)];
          solver(x, y+1 , "South");//left
        }
        
        else if (grid[index(x,y)].walls[3]==false) {
          current = grid[index(x-1,y)];
          solver(x-1, y, "West");//forward
        }
        
        else if (grid[index(x,y)].walls[0]==false) {
          current = grid[index(x,y-1)];
          solver(x, y-1, "North");//right
        }
        
        else if (grid[index(x,y)].walls[1]==false){
          current = grid[index(x+1,y)];
          solver(x+1, y, "East");//back
        }
        break;
    }
  } 
  else {
    console.log("Maze Solved");
    fatalERROR(100);
  }
   
}


