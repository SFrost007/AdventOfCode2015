fs = require('fs')
fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	var presents = data.split('\n');
	var ribbon = 0;
	for (var i=0; i<presents.length; i++) {
		var present = presents[i];
		var dimensions = present.split('x');
		dimensions[0] = parseInt(dimensions[0]);
		dimensions[1] = parseInt(dimensions[1]);
		dimensions[2] = parseInt(dimensions[2]);
		dimensions.sort(function(a,b){return a-b});

		var perim = 2 * (dimensions[0] + dimensions[1]);
		var volume = dimensions[0] * dimensions[1] * dimensions[2];
		ribbon += perim + volume;
	}
	console.log("Ribbon required: " + ribbon);
})