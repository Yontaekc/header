-- DROP DATABASE IF EXISTS spotify;
-- CREATE DATABASE spotify;

CREATE TABLE IF NOT EXISTS artists(
  artistID SERIAL PRIMARY KEY,
  artistName VARCHAR,
  followed BOOLEAN,
  followersNumber INTEGER,
  artistImages json,
  Biography VARCHAR
);

CREATE TABLE IF NOT EXISTS cities(
  cityID SERIAL PRIMARY KEY,
  city VARCHAR
);

CREATE TABLE IF NOT EXISTS artists_cities(
  artistID INTEGER REFERENCES artists (artistID) ON UPDATE CASCADE,
  cityID INTEGER REFERENCES cities (cityID) ON UPDATE CASCADE,
  followers INTEGER NOT NULL
);

-- COPY artists FROM '/Users/yontaekchung/Desktop/SDC/header/database/artistData/artists1.csv' DELIMITER ',' CSV HEADER;