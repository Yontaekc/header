const fs = require("fs");
const path = require("path");
const faker = require("faker");
faker.locale = "en_US";

var data = "cityID,city\n";

for (let f = 1; f <= 1; f++) {
  var stream = fs.createWriteStream(
    path.join(__dirname, "/cityData", `cities${f}.csv`)
  );
  stream.write(data);
  for (let i = 1; i <= 100; i++) {
    let newCity = {
      cityID: i + 1000000 * (f - 1),
      city: faker.address.city()
    };
    // for (let i = 0; i < faker.random.number({ min: 10, max: 20 }); i++) {
    //   newCity.city[faker.address.city()] = faker.random.number({
    //     min: 1000,
    //     max: 100000
    //   });

    var input = Object.values(newCity).join(",");
    stream.write(input + "\n");
  }
}
