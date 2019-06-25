fs = require('fs')
fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	var santaX=0, santaY=0;
	var roboX=0, roboY=0;
	var x = 0, y = 0;
	var houses = {};
	houses['0,0'] = 1;

	for (var i=0; i<data.length; i++) {
		if (i%2==0) {
			x=santaX; y=santaY;
		} else {
			x=roboX; y=roboY;
		}
		var ch = data.charAt(i);
		switch(ch) {
			case '^': y--; break;
			case 'v': y++; break;
			case '<': x--; break;
			case '>': x++; break;
		}
		var addr = x+','+y;
		if (houses[addr]) {
			houses[addr]++;
		} else {
			houses[addr] = 1;
		}
		if (i%2==0) {
			santaX=x; santaY=y;
		} else {
			roboX=x; roboY=y;
		}
	}

	var housesVisited = 0;
	for (var i in houses) {
		housesVisited++;
	}
	console.log("Houses visited: " + housesVisited);
})