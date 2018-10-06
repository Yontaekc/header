CREATE TABLE artists(
  artistID INT PRIMARY KEY,
  artistName TEXT,
  followed BOOLEAN,
  followersNumber INT,
  artistImages list<text>,
  biography TEXT,
  city map<text, int>
);

