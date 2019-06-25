fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
  if (err) return console.log("Failed to open file: " + err);

});
