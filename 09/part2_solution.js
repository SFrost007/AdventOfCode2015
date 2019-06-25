fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	// Classic Travelling Salesman Problem.
	// Just brute it as we only have 7 destinations

	// Parse input data
	var destinations = [];
	var distances = {};
	var instructions  = data.split('\n');
	for (var i=0; i<instructions.length; i++) {
		var instr = instructions[i];
		var parts = instr.match(/(.*) to (.*) = (\d+)/);
		var startLoc = parts[1];
		var endLoc = parts[2];
		var distance = parseInt(parts[3]);
		if (destinations.indexOf(startLoc) == -1) {
			destinations.push(startLoc);
			distances[startLoc] = {};
		}
		if (destinations.indexOf(endLoc) == -1) {
			destinations.push(endLoc);
			distances[endLoc] = {};
		}
		distances[startLoc][endLoc] = distance;
		distances[endLoc][startLoc] = distance;
	}

	// Create list of all routes
	var routes = [];
	var current;
	function permute(arr, memo) {
		var cur; memo = memo || [];
		for (var i=0; i<arr.length; i++) {
			cur = arr.splice(i, 1);
			if (arr.length === 0) {
				routes.push(memo.concat(cur));
			}
			permute(arr.slice(), memo.concat(cur));
			arr.splice(i, 0, cur[0]);
		}
	}
	permute(destinations);

	// Go through all the routes finding the longest distance
	var longest = 0;
	for (var i=0; i<routes.length; i++) {
		var route = routes[i];
		var thisLength = 0;
		for (var j=0; j<route.length-1; j++) {
			var startLoc = route[j];
			var endLoc = route[j+1];
			thisLength += distances[startLoc][endLoc];
		}
		if (thisLength > longest)
			longest = thisLength;
	}

	console.log("Longest distance:");
	console.log(longest);
});
