var getQ = `SELECT
artists.artistName,
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
AND artists.artistID = ${req.params.artistID}`;

module.exports = { getQ };
