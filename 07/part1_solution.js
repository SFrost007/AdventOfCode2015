fs = require('fs')

var wires = {};

fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	// On each scan through the instruction set, only process the instructions
	// for which we have all inputs ready, then remove them from the
	// instruction set. Loop until the instruction set is empty.
	var instructions = data.split('\n');
	while (instructions.length) {
		// Loop backwards so that we can remove from the array as we go
		for (var i=instructions.length-1; i>=0; i--) {
			if (processInstruction(instructions[i]))
				instructions.splice(i, 1);
		}
		console.log(' ');
	}

	console.log("Final values: " + JSON.stringify(wires));
	console.log("Value of wire a: " + wires['a']);
})

// Attempts to process an instruction, returning whether it was successful
function processInstruction(instr) {
	var parts = instr.split(' -> ');
	var inputs = parts[0].split(' ');

	// Check whether we have all required data to process this instruction
	for (var i=0; i<inputs.length; i++) {
		var input = inputs[i];
		if (isOperand(input) || isRawValue(input))
			continue;

		if (wires[input] == undefined) {
			return false;
		} else {
			// Swap the value in for ease of processing later
			inputs[i] = wires[input];
		}
	}

	// We have all required inputs, process the command
	var outAddr = parts[1];
	console.log('Processing ' + inputs + ' -> ' + outAddr);
	switch (inputs.length) {
		case 1:
			writeOutput(outAddr, parseInt(inputs[0]));
			break;
		case 2:
			// Only two-operand case is NOT
			writeOutput(outAddr, ~inputs[1]);
			break;
		case 3:
			processComplexInstruction(inputs, outAddr);
			break;
	}
	return true;
}

function processComplexInstruction(inputs, outAddr) {
	// Operand is always index 1
	switch (inputs[1]) {
		case 'AND':
			writeOutput(outAddr, inputs[0] & inputs[2]);
			break;
		case 'OR':
			writeOutput(outAddr, inputs[0] | inputs[2]);
			break;
		case 'LSHIFT':
			writeOutput(outAddr, inputs[0] << inputs[2]);
			break;
		case 'RSHIFT':
			writeOutput(outAddr, inputs[0] >> inputs[2]);
			break;
	}
}

function isOperand(chunk) {
	return (chunk == 'AND'
		|| chunk == 'OR'
		|| chunk == 'NOT'
		|| chunk == 'LSHIFT'
		|| chunk == 'RSHIFT');
}

function isRawValue(chunk) {
	return !isNaN(parseInt(chunk));
}

// Simulate 16-bit unsigned int wrapping
function writeOutput(addr, val) {
	wires[addr] = val > 0
		? val % 65536
		: val + 65536; // Nasty!
}
