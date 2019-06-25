var crypto = require('crypto');
var input = 'iwrupvqb';
var startStr = '000000';

var result = 0;
for (;;result++) {
	var md5sum = crypto.createHash('md5');
	md5sum.update(input+result);
	if (result%1000 == 0) {
		// Give some feedback that process is still running
		console.log('Checked ' + result);
	}
	if (md5sum.digest('hex').substr(0,startStr.length) == startStr) break;
}

console.log('Found hash beginning ' + startStr + ' at ' + result);
