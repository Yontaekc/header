const path = require("path");
const express = require("express");
const cors = require("cors");
require("console-stamp")(console, "HH:MM:ss.l");

const app = express();
app.use(require("morgan")("short"));
app.use(cors());
const bodyParser = require("body-parser");
const HeaderDB = require("../database/index.js");
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public/dist"));

// Upon GET request to '/artist/:artistID', queries the HeaderDB (mongoDB) and sends back artistObj.
app.get("/artists/:artistID", (req, res) => {
  console.log("##########RECEIVING GET##########");
  if (!!parseInt(req.params.artistID)) {
    HeaderDB.find(
      { artistID: parseInt(req.params.artistID) },
      (err, artistObj) => {
        res.statusCode = 200;
        res.send(artistObj);
      }
    );
  } else {
    // conditional error handling if artistID parameter is string
    res
      .status(400)
      .send({ ERROR: "artistID parameter accepts numbers between 1 and 100" });
  }
});

app.post("/artists/:artistID", (req, res) => {
  res.status(400).send({ ERROR: "does not accept post request" });
});

app.put("/artists/:artistID", (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  // Find note and update it with the request body
  HeaderDB.findByIdAndUpdate(req.params.artistID, {}, { new: true })
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: "Data not found with id " + req.params.artistID
        });
      }
      res.send(data);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.artistID
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.artistID
      });
    });
});

app.delete("/artists/:artistID", (req, res) => {
  HeaderDB.find({ id: req.params.artistID })
    .remove()
    .exec()
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.artistID
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.artistID
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.artistID
      });
    });
});

app.listen(process.env.PORT || 3004, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(
    `==> 🌎 Listening on port %s. Open up http://127.0.0.1:${process.env.PORT ||
      3004}/ in your browser.`
  );
});

module.exports = app;
