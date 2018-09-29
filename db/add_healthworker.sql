INSERT INTO healthworkers(name, phone, outpost_id, email, latitude, longitude, location)
Values($1, $2, $3, $4, $5, $6, $7)
RETURNING id;