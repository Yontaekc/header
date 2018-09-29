# CRUD API EndPoint

This Server will handle 4 methods for CRUD using same endpoint

1. Post: /api/v1/artists/:artistID

   > With new artist generated from seeder, it will be posted to database using specific artistID

2. GET: /api/v1/artists/:artistID

   > With specific artistID given, artist with related data such as bio, locations of followers, images, and name will appear

3. PUT: /api/v1/artists/:artistID

   > With specific artistID and information that is to be updated given, artist information with this id will be updated

4. DELETE: /api/v1/artists/:artistID
   > With specific artistID given, it will delete the whole data of the artist with this id
