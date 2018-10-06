const faker = require("faker");
faker.locale = "en_US";

let reshape = function(arr) {
  var obj = {};
  for (let i of arr) {
    obj[i.city] = i.followers;
  }
  let output = arr[0];
  output.city = obj;
  delete output.followers;
  return output;
};

var randomCity = req => {
  var values = [];
  var obj = {};
  var loop = faker.random.number({ min: 10, max: 12 });
  for (let x = 0; x < loop; x++) {
    var num = Math.ceil(Math.random() * 100);
    var noRepeat = (obj, num) => {
      if (obj[num]) {
        num = Math.ceil(Math.random() * 100);
        noRepeat(obj, num);
      } else {
        obj[num] = true;
      }
    };
    noRepeat(obj, num);
  }
  for (let i = 0; i < loop; i++) {
    var arr = [];
    arr.push(
      req.params.artistID,
      Object.keys(obj)[i],
      Math.round(Math.random() * 5000000 + 5000000)
    );
    values.push(arr);
  }
  return values;
};

var randomArtist = () => {
  let newArtist = {
    artistName: faker.name.findName(),
    followed: Math.round(Math.random()) ? true : false,
    followersNumber: Math.round(Math.random() * 5000000 + 5000000),
    biography:
      faker.lorem.sentences() +
      " " +
      faker.lorem.sentences() +
      " " +
      faker.lorem.sentences() +
      " " +
      faker.lorem.sentences() +
      " " +
      faker.lorem.sentences(),
    artistImages: []
  };
  var obj = {};
  for (let i = 1; i <= faker.random.number({ min: 2, max: 10 }); i++) {
    obj[faker.random.number({ min: 0, max: 1000 })] = null;
  }
  Object.keys(obj).forEach(num => {
    newArtist.artistImages.push(
      `https://s3-us-west-1.amazonaws.com/artistsyon/${num}.jpg`
    );
  });
  newArtist.artistImages = JSON.stringify(newArtist.artistImages);
  return Object.values(newArtist);
};
console.log(randomArtist());

// `INSERT INTO artists (artistID, artistName, followed, followersNumber, biography, artistImages) VALUES (2, 'yon', true, 1234, 'bro', '["https://s3-us-west-1.amazonaws.com/artistsyon/1.jpg", "https://s3-us-west-1.amazonaws.com/artistsyon/2.jpg"]'::json)`

module.exports = { reshape, randomCity, randomArtist };
