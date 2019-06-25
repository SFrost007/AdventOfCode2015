fs = require('fs');
fs.readFile("input.txt", 'utf8', function(err, data) {
  if (err) return console.log("Failed to open file: " + err);

  var instructions = data.split('\n');
  var ingredients = [];
  for (var i=0; i<instructions.length; i++) {
    var instr = instructions[i];
    var parts = instr.match(/(.+): capacity ([-\d]+), durability ([-\d]+), flavor ([-\d]+), texture ([-\d]+), calories ([-\d]+)/);
    ingredients.push({
      name: parts[1],
      capacity: parseInt(parts[2]),
      durability: parseInt(parts[3]),
      flavor: parseInt(parts[4]),
      texture: parseInt(parts[5]),
      calories: parseInt(parts[6]),
    });
  }

  var teaspoons = 100;
  var best = 0;
  for (var a=0; a<teaspoons; a++) {
    for (var b=0; b<teaspoons-a; b++) {
      for (var c=0; c<teaspoons-(a+b); c++) {
        var d = teaspoons - (a+b+c);

        var calories = ingredients[0].calories * a
                     + ingredients[1].calories * b
                     + ingredients[2].calories * c
                     + ingredients[3].calories * d;
        if (calories != 500)
          continue;

        var capacity = ingredients[0].capacity * a
                     + ingredients[1].capacity * b
                     + ingredients[2].capacity * c
                     + ingredients[3].capacity * d;

        var durability = ingredients[0].durability * a
                       + ingredients[1].durability * b
                       + ingredients[2].durability * c
                       + ingredients[3].durability * d;

        var flavor = ingredients[0].flavor * a
                   + ingredients[1].flavor * b
                   + ingredients[2].flavor * c
                   + ingredients[3].flavor * d;

        var texture = ingredients[0].texture * a
                    + ingredients[1].texture * b
                    + ingredients[2].texture * c
                    + ingredients[3].texture * d;

        if (capacity < 0 || durability < 0 || flavor < 0 || texture < 0)
          continue;

        var score = capacity * durability * flavor * texture;
        if (score > best)
          best = score;
      }
    }
  }

  console.log("Best score: " + best);

});
