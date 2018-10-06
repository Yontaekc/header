const fs = require("fs");
const path = require("path");
const faker = require("faker");
faker.locale = "en_US";

var data =
  "artistID,artistImages,artistName,biography,city,followed,followersNumber\n";

for (let f = 1; f <= 10; f++) {
  var stream = fs.createWriteStream(
    path.join(__dirname, "/artistData", `artistss${f}.csv`)
  );
  stream.write(data);
  var arr = [];
  for (let i = 10000001; i <= 11000000; i++) {
    let newArtist = {
      artistID: i + 1000000 * (f - 1),
      artistImages: [],
      artistName: faker.name.findName(),
      biography:
        '"' +
        faker.lorem.sentences() +
        " " +
        faker.lorem.sentences() +
        " " +
        faker.lorem.sentences() +
        " " +
        faker.lorem.sentences() +
        " " +
        faker.lorem.sentences() +
        " " +
        '"',
      city: {},
      followed: Math.round(Math.random()) ? true : false,
      followersNumber: Math.round(Math.random() * 5000000 + 5000000)
    };
    var obj = {};
    for (let i = 1; i <= faker.random.number({ min: 2, max: 10 }); i++) {
      obj[faker.random.number({ min: 0, max: 1000 })] = null;
    }
    Object.keys(obj).forEach(num => {
      newArtist.artistImages.push(
        `'https://s3-us-west-1.amazonaws.com/artistsyon/${num}.jpg'`
      );
    });
    newArtist.artistImages = '"[' + newArtist.artistImages + ']"';
    var str = "";
    var num = faker.random.number({ min: 10, max: 12 });
    for (let i = 0; i < num; i++) {
      if (i === num - 1) {
        str +=
          `'${faker.address.cityPrefix() + faker.address.citySuffix()}'` +
          `: ${faker.random.number({
            min: 1000,
            max: 100000
          })}`;
      } else {
        str +=
          `'${faker.address.cityPrefix() + faker.address.citySuffix()}'` +
          `: ${faker.random.number({
            min: 1000,
            max: 100000
          })},`;
      }
    }
    newArtist.city = '"{' + str + '}"';
    var input = Object.values(newArtist).join(",");
    stream.write(input + "\n");
  }
}
