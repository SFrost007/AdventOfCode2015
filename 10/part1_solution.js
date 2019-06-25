var input = "3113322113";
var iterations = 50;

var prevStep = input;
for (var i=0; i<iterations; i++) {
	var curChar = prevStep.charAt(0);
	var repetitions = 0;
	var nextStep = '';
	for (var j=0; j<prevStep.length; j++) {
		if (prevStep.charAt(j) == curChar) {
			repetitions++;
		} else {
			nextStep += repetitions+''+curChar;
			curChar = prevStep.charAt(j);
			repetitions = 1;
		}
	}
	nextStep += repetitions+''+curChar;
	//console.log(prevStep + ' becomes ' + nextStep);
	prevStep = nextStep;
}
console.log("Length: " + prevStep.length);
