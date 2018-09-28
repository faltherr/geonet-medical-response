UPDATE
healthworkers
SET outpost_id = 0
WHERE outpost_id = $1;
DELETE FROM 
outposts 
WHERE id = $1