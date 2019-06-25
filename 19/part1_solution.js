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

  var outStrings = [];
  for (var i=0; i<inString.length; i++) {
    for (var j=0; j<rules.length; j++) {
      var rule = rules[j];
      if (inString.substr(i, rule.in.length) == rule.in) {
        var out = inString.substr(0, i)
                + rule.out
                + inString.substr(i + rule.in.length);
        if (outStrings.indexOf(out) == -1) {
          outStrings.push(out);
        }
      }
    }
  }

  console.log("Different outputs: " + outStrings.length);

});
