INSERT INTO survey(name, phone,location, latitude, longitude, age, famplan, hiv, parity, duedate, completed)
Values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING *;