fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
  if (err) return console.log("Failed to open file: " + err);

  function sumNumbers(obj) {
    var total = 0;
    if (typeof obj == "number") {
      total += obj;
    } else if (typeof obj != "string") {
      for (var i in obj)
        total += sumNumbers(obj[i]);
    }
    return total;
  }

  console.log("Total is " + sumNumbers(JSON.parse(data)));
});
