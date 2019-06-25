var target = 34000000;
//target = 130;
var found = false;
var house = 602500;

var max = 0;

while (!found) {
	house++;
	var presents = 0;
	for (var i=0; i<=house/2; i++) {
		if (house % i == 0) {
			presents += (10*i);
		}
	}
	presents += 10*house;
	if (presents > target) {
		found = true;
	}
	max = Math.max(max, presents);
	if (house % 100 == 0) {
		console.log("Checked house " + house + " max: " + max);
	}
}

console.log("Answer is house " + house);
