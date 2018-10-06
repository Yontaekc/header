const fs = require("fs");
const path = require("path");
const faker = require("faker");
faker.locale = "en_US";

var data = "artistID,cityID,followers\n";

for (let f = 9; f <= 10; f++) {
  var stream = fs.createWriteStream(
    path.join(__dirname, "/artist_cityData", `artist_city${f}.csv`)
  );
  stream.write(data);
  var id = 10000001 + 1000000 * (f - 1);
  var obj = {};
  for (let i = 1; i <= 10000000; i++) {
    let newCity = {
      artistID: id,
      cityID: undefined,
      followers: Math.round(Math.random() * 5000000 + 5000000)
    };
    var city = Math.ceil(Math.random() * 100);
    obj[city] = true;
    var checkRepeat = function(obj, city) {
      if (obj[city]) {
        city = Math.ceil(Math.random() * 100);
        checkRepeat(obj, city);
      } else {
        newCity.cityID = city;
        return;
      }
    };
    checkRepeat(obj, city);
    if (i % 10 === 0) {
      id++;
      obj = {};
    }

    var input = Object.values(newCity).join(",");
    stream.write(input + "\n");
  }
}
