fs = require('fs')
fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	var floor = 0;
	var basement = 0;
	for (var i=0; i<data.length; i++) {
		var ch = data.charAt(i);
		if (ch == '(') {
			floor++;
		} else if (ch == ')') {
			floor--;
		}
		if (floor == -1) {
			basement = i+1;
			break;
		}
	}
	console.log("Entered basement at char " + basement);
})