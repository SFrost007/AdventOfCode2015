fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
  if (err) return console.log("Failed to open file: " + err);

  var instructions = data.split('\n');
  var people = {};
  for (var i=0; i<instructions.length; i++) {
    var instr = instructions[i];
    var parts = instr.match(/(.+) would (.+) (\d+) happiness units by sitting next to (.+)./);
    var source = parts[1];
    var target = parts[4];
    var diff = parseInt(parts[3]);
    if (parts[2] === "lose")
      diff *= -1;

    if (!people[source])
      people[source] = {};

    people[source][target] = diff;
  }

  var layouts = [];
  var current;
  function permute(arr, memo) {
    var cur; memo = memo || [];
    for (var i=0; i<arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        layouts.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }
  }
  permute(Object.keys(people));

  var best = 0;
  for (var i=0; i<layouts.length; i++) {
    var layout = layouts[i];
    var thisConfig = people[layout[0]][layout[layout.length-1]];
    thisConfig += people[layout[layout.length-1]][layout[0]];
    for (var j=0; j<layout.length-1; j++) {
      thisConfig += people[layout[j]][layout[j+1]];
      thisConfig += people[layout[j+1]][layout[j]];
    }
    if (thisConfig > best) {
      best = thisConfig;
    }
  }

  console.log("Best " + best);
});
