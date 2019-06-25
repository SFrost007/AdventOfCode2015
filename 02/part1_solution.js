fs = require('fs')
fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	var presents = data.split('\n');
	var paper = 0;
	for (var i=0; i<presents.length; i++) {
		var present = presents[i];
		var dimensions = present.split('x');
		dimensions[0] = parseInt(dimensions[0]);
		dimensions[1] = parseInt(dimensions[1]);
		dimensions[2] = parseInt(dimensions[2]);
		dimensions.sort(function(a,b){return a-b});

		var side1 = dimensions[0] * dimensions[1];
		var side2 = dimensions[1] * dimensions[2];
		var side3 = dimensions[2] * dimensions[0];
		var extra = side1;
		paper += ((2*side1) + (2*side2) + (2*side3) + extra);
	}
	console.log("Paper required: " + paper);
})