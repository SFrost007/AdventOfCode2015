fs = require('fs')
fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	// Pseudo-enum
	var Operation = {
		'ON': 1,
		'OFF': 2,
		'TOGGLE': 3
	}

	// Allocate lights grid
	var lights = new Array(1000);
	for (var i=0; i<lights.length; i++) {
		lights[i] = new Array(1000);
	}

	var instructions = data.split('\n');
	for (var i=0; i<instructions.length; i++) {
		var instr = instructions[i];

		// Split the instruction into its component parts with regex
		var parts = instr.match(/(.+) (\d+),(\d+) through (\d+),(\d+)$/);

		var operation;
		switch (parts[1]) {
			case 'turn on':
				operation = Operation.ON; break;
			case 'turn off':
				operation = Operation.OFF; break;
			case 'toggle':
				operation = Operation.TOGGLE; break;
		}

		for (var x=parseInt(parts[2]); x<=parseInt(parts[4]); x++) {
			for (var y=parseInt(parts[3]); y<=parseInt(parts[5]); y++) {
				switch (operation) {
					case Operation.ON:
						lights[x][y] = true;
						break;
					case Operation.OFF:
						lights[x][y] = false;
						break;
					case Operation.TOGGLE:
						lights[x][y] = !lights[x][y];
						break;
				}
			}
		}
	}

	// Check how many are lit
	var lit = 0;
	for (var i in lights) {
		for (var j in lights[i]) {
			lit += lights[i][j];
		}
	}

	console.log("Lit: " + lit);
})