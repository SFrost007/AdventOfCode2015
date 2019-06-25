fs = require('fs')
fs.readFile("input.txt", 'utf8', function(err, data) {
	if (err) return console.log("Failed to open file: " + err);

	var strings = data.split('\n');
	var nice = 0;
	for (var i=0; i<strings.length; i++) {
		var str = strings[i];
		var vowels=0;
		var lastChar='';
		var consecutive=false;
		var invalid=false;
		for (var j=0; j<str.length; j++) {
			var ch = str.charAt(j);
			if (ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u')
				vowels++;
			consecutive |= lastChar == ch;
			invalid |= ((lastChar=='a' && ch=='b')
				|| (lastChar=='c' && ch=='d')
				|| (lastChar=='p' && ch=='q')
				|| (lastChar=='x' && ch=='y'));
			lastChar = ch;
		}
		if (vowels >= 3 && consecutive && !invalid)
			nice++;
	}
	console.log("Nice strings: " + nice);
})