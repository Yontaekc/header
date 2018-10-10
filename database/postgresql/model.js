var { Pool } = require("pg");
var format = require("pg-format");
var helper = require("./modelHelper.js");
var redis = require("redis");
const pool = new Pool({
  host: "18.223.124.200",
  database: "spotify",
  port: "5432",
  user: "power_user",
  password: "poweruserpassword"
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

var get = (req, res, rClient) => {
  if (!!parseInt(req.params.artistID)) {
    pool.connect().then(client => {
      return client
        .query(
          `SELECT artists.artistName,
          artists.biography,
          artists.followed,
          artists.followersnumber,
          artists.artistImages,
          cities.city,
          artists_cities.followers
        FROM
          artists, cities, artists_cities
        WHERE
          artists.artistID = artists_cities.artistID 
        AND
          cities.cityID = artists_cities.cityID
        AND artists.artistID = ${req.params.artistID}`
        )
        .then((response, err) => {
          if (err) {
            console.log(err);
          }
          client.release();
          let data = response.rows;
          rClient.setex(
            req.params.artistID,
            3600,
            JSON.stringify(helper.reshape(response.rows))
          );
          res.send(helper.reshape(response.rows));
        })
        .catch(err => {
          client.release();
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
  }
};

var post = (req, res) => {
  let values = helper.randomCity(req);
  let artistValues = helper.randomArtist();
  artistValues.unshift(req.params.artistID);
  console.log(artistValues);

  client
    .query(
      `INSERT INTO artists (artistID, artistName, followed, followersNumber, biography, artistImages) VALUES (${
        artistValues[0]
      }, ${"'" + artistValues[1] + "'"}, ${artistValues[2]}, ${
        artistValues[3]
      }, ${"'" + artistValues[4] + "'"}, ${"'" + artistValues[5] + "'"}::json)`
    )
    .then((response, err) => {
      if (err) {
        console.log(err);
      }
      res.send(response);
      return client
        .query(
          format(
            "INSERT INTO artists_cities (artistID, cityID, followers) VALUES %L",
            values
          )
        )
        .then((response, err) => {
          if (err) {
            console.log(err);
          }
          console.log(response);
        });
    });
};

var put = (req, res) => {
  client
    .query(
      `UPDATE artists SET followersNumber = followersNumber + 1 WHERE artistID = ${
        req.params.artistID
      };`
    )
    .then((response, err) => {
      if (err) {
        console.log(err);
      }
      res.send(response);
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
};

var del = (req, res) => {
  client
    .query(
      `DELETE FROM artists_cities WHERE artistID = ${req.params.artistID};`
    )
    .then((response, err) => {
      if (err) {
        console.log(err);
      }
      res.send(response);
      return client
        .query(`DELETE FROM artists WHERE artistID = ${req.params.artistID};`)
        .then((response, err) => {
          if (err) {
            console.log(err);
          }
          res.send(response);
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
};

module.exports = { get, post, put, del };
