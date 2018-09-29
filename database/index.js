const mongoose = require("mongoose");
mongoose.connect("mongodb://yontaekc:yon123@ds117423.mlab.com:17423/sdc");

const db = mongoose.connection;
db.on("error", error => {
  console.error(error);
});
db.once("open", () => {
  console.log("MONGOOSE CONNECTED!");
});

const headerDBSchema = new mongoose.Schema({
  artistID: {
    type: Number,
    unique: true
  },
  followed: Boolean,
  artistName: String,
  followersNumber: Number,
  artistImages: [String],
  about: {
    Biography: String,
    Where: Object
  }
});

const HeaderDB = mongoose.model("HeaderDB", headerDBSchema);
module.exports = HeaderDB;
