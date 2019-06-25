fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	var diff = 0;
	var items  = data.split('\n');
	for (var i=0; i<items.length; i++) {
		var input = items[i];
		var processed = '"'; // Starting quote
		for (var j=0; j<input.length; j++) {
			var ch = input.charAt(j);
			switch (ch) {
				case '"':
					processed += '\\\"'
					break;
				case '\\':
					processed += '\\\\';
					break;
				default:
					processed += ch;
			}
		}
		processed += '"'; // Trailing quote
		diff += processed.length - items[i].length;
	}
	console.log("Character difference: " + diff);
});
