fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	var diff = 0;
	var items  = data.split('\n');
	for (var i=0; i<items.length; i++) {
		var processed = items[i];
		processed = processed.replace(/^"/g, '');
		processed = processed.replace(/"$/g, '');
		processed = processed.replace(/\\\"/g, '.');
		processed = processed.replace(/\\\\/g, '.');
		processed = processed.replace(/\\x[0-9a-fA-F]{2}/g, '.');
		diff += items[i].length - processed.length;
	}
	console.log("Character difference: " + diff);
});
