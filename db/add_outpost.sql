INSERT INTO outposts(outpost_name, location, latitude, longitude)
Values($1, $2, $3, $4)
RETURNING *;