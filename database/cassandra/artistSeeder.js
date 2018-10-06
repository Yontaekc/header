var async = require("async");
const cassandra = require("cassandra-driver");
const client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  // protocolOptions: { port: 9042 },
  keyspace: "spotify"
});

const insert =
  "INSERT INTO artists (artistID, artistName, followed, followersNumber, biography, artistImages, city) VALUES (?, ?, ?, ?, ?, ?, ?);";

// const copy = `COPY artists FROM '/users/yontaekchung/artistss${f}.csv' WITH DELIMITER=',' AND HEADER=TRUE;`;

// for (let f = 1; f <= 1; f++) {
//   client
//     .execute(
//       `COPY artists FROM '/users/yontaekchung/artistss${f}.csv' WITH DELIMITER=',' AND HEADER=TRUE;`
//     )
//     .then(result => console.log("result:", result));
// }

// var insertDB = function(n, next) {
//   var arr = [];
//   var counter = 0;
//   for (let i = 1; i <= 1000; i++) {
//     let newArtist = {
//       artistID: i,
//       artistImages: [],
//       artistName: faker.name.findName(),
//       biography: faker.lorem.paragraphs(),
//       city: {},
//       followed: Math.round(Math.random()) ? true : false,
//       followersNumber: Math.round(Math.random() * 5000000 + 5000000)
//     };
//     // adding cities
//     for (let i = 0; i < faker.random.number({ min: 10, max: 12 }); i++) {
//       newArtist.city[faker.address.city()] = faker.random.number({
//         min: 1000,
//         max: 100000
//       });
//     }
//     var obj = {};
//     for (let i = 1; i <= faker.random.number({ min: 2, max: 10 }); i++) {
//       obj[faker.random.number({ min: 0, max: 1000 })] = null;
//     }
//     Object.keys(obj).forEach(num => {
//       newArtist.artistImages.push(
//         `https://s3-us-west-1.amazonaws.com/artistsyon/${num}.jpg`
//       );
//     });
//     // console.log(newArtist);
//     arr.push(Object.values(newArtist));
//     console.log("on file", i);
//   }
// next(null, "done");

// client.execute(
//   copy,
//   item,
//   {
//     hints: [null, null, null, null, null, null, "map"],
//     prepare: true
//   },
//   (err, result) => {
//     counter++;
//     console.log("hi", counter);
//     if (err) {
//       console.log(err);
//     }
//     if (counter === 10000) {
//       return;
//     } else if (counter % 1000) {
//       insertDB();
//     }
//   }
// );

const query = "SELECT * FROM artists WHERE artistID = 19999999;";
client
  .execute(query)
  .then(result => console.log("User with email:", result.rows[0]));
