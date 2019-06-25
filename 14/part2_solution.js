fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
  if (err) return console.log("Failed to open file: " + err);

  var instructions = data.split('\n');
  var allReindeer = [];
  for (var i=0; i<instructions.length; i++) {
    var instr = instructions[i];
    var parts = instr.match(/(.+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./);
    allReindeer.push({
      name: parts[1],
      speed: parseInt(parts[2]),
      movetime: parseInt(parts[3]),
      resttime: parseInt(parts[4]),
      state: "Moving",
      travelled: 0,
      transitioned: 0,
      points: 0
    });
  }

  function awardLeadersAPoint() {
    var furthest = 0;
    for (var j=0; j<allReindeer.length; j++) {
      var deer = allReindeer[j];
      if (furthest < deer.travelled) {
        furthest = deer.travelled;
      }
    }
    for (var j=0; j<allReindeer.length; j++) {
      var deer = allReindeer[j];
      if (deer.travelled == furthest) {
        deer.points++;
      }
    }
  }

  var timeLimit = 2503;
  for (var i=1; i<=timeLimit; i++) {
    for (var j=0; j<allReindeer.length; j++) {
      var deer = allReindeer[j];
      if (deer.state == "Moving") {
        deer.travelled += deer.speed;
        if ((i-deer.transitioned) % deer.movetime == 0) {
          deer.state = "Stopped";
          deer.transitioned = i;
        }
      } else {
        if ((i-deer.transitioned) % deer.resttime == 0) {
          deer.state = "Moving";
          deer.transitioned = i;
        }
      }
    }
    awardLeadersAPoint();
  }

  var max = 0;
  for (var i=0; i<allReindeer.length; i++) {
    var deer = allReindeer[i];
    if (deer.points > max) {
      max = deer.points;
    }
  }

  console.log("Winning points: " + max);
});
