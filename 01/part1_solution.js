fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	var floor = 0;
	for (var i=0; i<data.length; i++) {
		var ch = data.charAt(i);
		if (ch == '(') {
			floor++;
		} else if (ch == ')') {
			floor--;
		}
	}
	console.log("Result is floor " + floor);
});
