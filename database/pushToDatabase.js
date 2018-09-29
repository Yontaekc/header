var { Client } = require("pg");
var connectionString = "postgres://yontaekc:yon123@localhost:5432/spotify";
var client = new Client(connectionString);
client.connect();

for (let i = 1; i <= 10; i++) {
  client.query(
    `COPY artists FROM '/Users/yontaekchung/artists${i}.csv' DELIMITER ',' CSV HEADER`,
    (res, err) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    }
  );
}

// client
//   .query(`SELECT artistimages FROM artists WHERE ID = 823472`)
//   .then((res, err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(res.rows[0].artistimages);
//     console.log(Array.isArray(res.rows[0].artistimages));
//   });
