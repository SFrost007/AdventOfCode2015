fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
  if (err) return console.log("Failed to open file: " + err);

  var input = data.split('\n');
  var containers = [];
  for (var i=0; i<input.length; i++) {
    containers.push(parseInt(input[i]));
  }


  var combinations = [];
  function sum_to(arr, target, found) {
    if (!arr || arr.length == 0)
      return 0;

    if (!found) found = 0;

    var first = arr[0];
    var remain = arr.slice(1);
    var with_first;

    if (first > target) {
      with_first = 0;
    } else if (first == target) {
      combinations.push(found + 1);
      with_first = 1;
    } else {
      with_first = sum_to(remain, target-first, found+1);
    }

    return with_first + sum_to(remain, target, found);
  }
  sum_to(containers, 150);

  var min = Number.MAX_VALUE;
  for (var i=0; i<combinations.length; i++) {
    if (combinations[i] < min) {
      min = combinations[i];
    }
  }
  var repeats = 0;
  for (var i=0; i<combinations.length; i++) {
    if (combinations[i] == min) {
      repeats++;
    }
  }

  console.log("Combinations: " + repeats);
});
