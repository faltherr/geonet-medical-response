UPDATE healthworkers
SET name = $2,
    phone = $3,
    email = $4,
    location = $5,
    in_field = $6

WHERE id = $1;

SELECT healthworkers.*, outposts.location as outpost_location 
FROM healthworkers
FULL JOIN outposts on healthworkers.outpost_id = outposts.id
ORDER BY healthworkers.id;