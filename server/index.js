require("newrelic");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cluster = require("cluster");
const os = require("os");
var model = require("../database/postgresql/model.js");

// const app = express();

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.use(require("morgan")("short"));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static(__dirname + "/../public/dist"));

  app.get("/api/v1/artists/:artistID", model.get);

  app.post("/api/v1/artists/:artistID", model.post);

  app.put("/api/v1/artists/:artistID", model.put);

  app.delete("/api/v1/artists/:artistID", model.del);

  app.listen(process.env.PORT || 3004, function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info(
      `==> 🌎 Listening on port %s. Open up http://127.0.0.1:${process.env
        .PORT || 3004}/ in your browser.`
    );
  });
  console.log("app is running on port", 3004);
  module.exports = app;
}

cluster.on("exit", worker => {
  console.log("mayday! mayday! worker", worker.id, " is no more!");
  cluster.fork();
});
// Using postgresql

//cassandra

// const cassandra = require("cassandra-driver");
// const client = new cassandra.Client({
//   contactPoints: ["127.0.0.1"],
//   // protocolOptions: { port: 9042 },
//   keyspace: "spotify"
// });

//Using Cassandra

// app.get("/artists/:artistID", (req, res) => {
//   console.log("##########RECEIVING GET##########");
//   if (!!parseInt(req.params.artistID)) {
//     console.log(req.params.artistID);
//     const query = `SELECT * FROM artists WHERE artistID = ${
//       req.params.artistID
//     };`;
//     client.execute(query).then(result => res.send(result.rows[0]));
//   } else {
//     // conditional error handling if artistID parameter is string
//     res
//       .status(400)
//       .send({ ERROR: "artistID parameter accepts numbers between 1 and 100" });
//   }
// });

// Upon GET request to '/artist/:artistID', queries the HeaderDB (mongoDB) and sends back artistObj.
// Using MongoDB/Mongoose

// app.get("/artists/:artistID", (req, res) => {
//   console.log("##########RECEIVING GET##########");
//   if (!!parseInt(req.params.artistID)) {
//     HeaderDB.find(
//       { artistID: parseInt(req.params.artistID) },
//       (err, artistObj) => {
//         res.statusCode = 200;
//         res.send(artistObj);
//       }
//     );
//   } else {
//     // conditional error handling if artistID parameter is string
//     res
//       .status(400)
//       .send({ ERROR: "artistID parameter accepts numbers between 1 and 100" });
//   }
// });
