fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
  if (err) return console.log("Failed to open file: " + err);

  var instructions = data.split('\n');
  var sues = [];
  for (var i=0; i<instructions.length; i++) {
    var instr = instructions[i];
    var parts = instr.match(/Sue (\d+): (.*)/);
    var newSue = {
      id: parseInt(parts[1])
    };
    var clues = parts[2].split(',')
    for (var j=0; j<clues.length; j++) {
      var clue = clues[j].split(':');
      newSue[clue[0].trim()] = parseInt(clue[1]);
    }
    sues.push(newSue);
  }

  for (var i=sues.length-1; i>=0; i--) {
    var sue = sues[i];
    if ( (sue.children !== undefined && sue.children != 3)
      || (sue.cats !== undefined && sue.cats <= 7)
      || (sue.samoyeds !== undefined && sue.samoyeds != 2)
      || (sue.pomeranians !== undefined && sue.pomeranians >= 3)
      || (sue.akitas !== undefined && sue.akitas > 0)
      || (sue.vizslas !== undefined && sue.vizslas > 0)
      || (sue.goldfish !== undefined && sue.goldfish >= 5)
      || (sue.trees !== undefined && sue.trees <= 3)
      || (sue.cars !== undefined && sue.cars != 2)
      || (sue.perfumes !== undefined && sue.perfumes != 1)
    ) {
      sues.splice(i,1);
    }
  }

  if (sues.length == 1) {
    console.log("Only valid Sue: " + sues[0].id);
  } else {
    console.log("Still valid: " + sues.length);
    console.log(sues);
  }
});
