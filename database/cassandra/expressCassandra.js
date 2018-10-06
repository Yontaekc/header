var ExpressCassandra = require("express-cassandra");
const faker = require("faker");
faker.locale = "en_US";

var models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ["127.0.0.1"],
    protocolOptions: { port: 9042 },
    keyspace: "spotify",
    queryOptions: { consistency: ExpressCassandra.consistencies.one }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: "SimpleStrategy",
      replication_factor: 1
    },
    migration: "safe"
  }
});

var MyModel = models.loadSchema("artistss", {
  fields: {
    artistID: "int",
    artistName: "text",
    followed: "boolean",
    followersNumber: "int",
    artistImages: {
      type: "list",
      typeDef: "<text>"
    },
    biography: "text",
    city: {
      type: "map",
      typeDef: "<text, int>"
    }
  },
  key: ["artistID"]
});

// MyModel or models.instance.Person can now be used as the model instance
// console.log(models.instance.artistss === MyModel);

var john = new models.instance.artistss({
  artistID: 1,
  artistName: "yon",
  followed: true,
  followersNumber: 12345,
  artistImages: ["a", "c"],
  biography: "text dfsefsefsdfwefsdfe",
  city: {
    nt: 123
  }
});

var insertDB = function(n, next) {
  var arr = [];
  var counter = 0;
  for (let i = 1; i <= 1000; i++) {
    let newArtist = {
      artistID: i,
      artistName: faker.name.findName(),
      followed: Math.round(Math.random()) ? true : false,
      followersNumber: Math.round(Math.random() * 5000000 + 5000000),
      biography: faker.lorem.paragraphs(),
      artistImages: [],
      city: {}
    };
    // adding cities
    for (let i = 0; i < faker.random.number({ min: 10, max: 12 }); i++) {
      newArtist.city[faker.address.city()] = faker.random.number({
        min: 1000,
        max: 100000
      });
    }
    var obj = {};
    for (let i = 1; i <= faker.random.number({ min: 2, max: 10 }); i++) {
      obj[faker.random.number({ min: 0, max: 1000 })] = null;
    }
    Object.keys(obj).forEach(num => {
      newArtist.artistImages.push(
        `https://s3-us-west-1.amazonaws.com/artistsyon/${num}.jpg`
      );
    });
    // console.log(newArtist);
    // arr.push(Object.values(newArtist));
    var test = new models.instance.artistss(newArtist);
    test.save(function(err) {
      counter++;
      if (err) {
        console.log(err);
        return;
      }
      console.log("Yuppiie!");
    });
    console.log("on file", i);
  }
};

insertDB();

// john.save(function(err) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("Yuppiie!");
// });

// sync the schema definition with the cassandra database table
// if the schema has not changed, the callback will fire immediately
// otherwise express-cassandra will try to migrate the schema and fire the callback afterwards
MyModel.syncDB(function(err, result) {
  if (err) throw err;
  // result == true if any database schema was updated
  // result == false if no schema change was detected in your models
});
