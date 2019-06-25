fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
  if (err) return console.log("Failed to open file: " + err);

  // Game of life! Parse the input into a grid
  var input = data.split('\n');
  var grid = [];
  for (var x=0; x<input.length; x++) {
    grid[x] = [];
    for (var y=0; y<input[x].length; y++) {
      grid[x][y] = input[x].charAt(y);
    }
  }
  var grid_w = grid.length;
  var grid_h = grid[0].length;

  // Helper function
  function printState(iteration) {
    console.log(iteration
      ? "After "+iteration+" steps:"
      : "Initial state:");
    for (var x=0; x<grid.length; x++) {
      console.log(grid[x].join(''));
    }
    console.log(' ');
  }

  function neighbours(x,y) {
    var found = 0;
    for (var i=Math.max(0, x-1); i<=Math.min(grid_w-1, x+1); i++) {
      for (var j=Math.max(0, y-1); j<=Math.min(grid_h-1, y+1); j++) {
        if (x!=i || j!=y) {
          found += grid[i][j] == '#';
        }
      }
    }
    return found;
  }

  //printState();
  var num_generations = 100;
  for (var i=0; i<num_generations; i++) {
    var newGrid = [];
    for (var x=0; x<grid.length; x++) {
      newGrid[x] = [];
      for (var y=0; y<grid[x].length; y++) {
        var nextState = '';
        if ( (x == 0 && y==0)
          || (x == 0 && y == grid_h-1)
          || (x == grid_w-1 && y == 0)
          || (x == grid_w-1 && y == grid_h-1))
        {
          nextState = '#';
        } else {
          var num_neighbours = neighbours(x,y);
          var current = grid[x][y];
          if (grid[x][y] == '.') {
            nextState = num_neighbours == 3 ? '#' : '.';
          } else {
            nextState = num_neighbours == 2 || num_neighbours == 3 ? '#' : '.';
          }
        }
        newGrid[x][y] = nextState;
      }
    }
    grid = newGrid;
    //printState(i+1)
  }

  // Calculate number of lit lights
  var lit = 0;
  for (var x=0; x<grid.length; x++) {
    for (var y=0; y<grid[x].length; y++) {
      lit += grid[x][y] == '#';
    }
  }
  console.log("Lit lights: " + lit);
});
