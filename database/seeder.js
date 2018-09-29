const faker = require("faker");
// let HeaderDB = require("./index.js");
faker.locale = "en_US";

var artistsData = function() {
  var arr = [];
  for (let i = 1; i <= 25000; i++) {
    let newArtist = {
      ID: i,
      artistName: faker.name.findName(),
      followed: Math.round(Math.random()) ? true : false,
      followersNumber: Math.round(Math.random() * 5000000 + 5000000),
      artistImages: `https://s3-us-west-1.amazonaws.com/artistsyon/${i}.jpg`,
      Biography: '"' + faker.lorem.paragraphs() + '"',
      JoinID: i + "\n"
    };
    var a = faker.random.number();
    arr.push(Object.values(newArtist).join(","));
  }
  return arr.join("");
};

// console.log(artistsData());

module.exports = artistsData;
