UPDATE survey 
SET alert = FALSE
WHERE id = $1
RETURNING *;
