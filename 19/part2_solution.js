fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
  if (err) return console.log("Failed to open file: " + err);

  var input = data.split('\n');
  var inString = input[input.length-1];

  // Parse the input rules to a more useful format
  var rules = [];
  for (var i=0; i<input.length-2; i++) {
    var ruleParts = input[i].split(' => ');
    rules.push({
      in: ruleParts[0],
      out: ruleParts[1]
    });
  }

  var candidates = [inString];
  var checked = [];
  var found = false;
  var iterations = 0;

  while (candidates.length && !found) {
    iterations++;
    var newCandidates = [];
    for (var i=0; i<candidates.length; i++) {
      var lastRepPos = 0;
      var outStr = candidates[i];
      for (var i=0; i<outStr.length; i++) {
        
      }
    }
    candidates = newCandidates.sort(function(a,b){return a.length - b.length});
    console.log("Now checking:");
    console.log(candidates);
  }

  if (found) {
    console.log("Found molecule in " + iterations + "iterations");
  } else {
    console.log("Failed to find molecule");
  }
});
