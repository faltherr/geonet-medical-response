SELECT healthworkers.*, outposts.location as outpost_location FROM healthworkers
JOIN outposts on healthworkers.outpost_id = outposts.id
ORDER BY healthworkers.id;
