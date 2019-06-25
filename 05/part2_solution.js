fs = require('fs')
fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	var strings = data.split('\n');
	var nice = 0;

	for (var i=0; i<strings.length; i++) {
		var str = strings[i];

		// First search for the aba pattern
		var aba = false;
		for (var j=2; j<str.length; j++) {
			if (str.charAt(j) == str.charAt(j-2)) {
				aba = true;
				break;
			}
		}
		if (!aba) continue;

		// Now search for repeated patterns of two chars
		var found = false;
		for (var j=1; j<str.length; j++) {
			var search = str.substr(j-1, 2);
			for (var k=j+2; k<str.length; k++) {
				var match = str.substr(k-1, 2);
				found |= search == match;
			}
		}
		if (found) nice++;
	}
	console.log("Nice strings: " + nice);
})