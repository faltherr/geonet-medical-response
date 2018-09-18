INSERT INTO healthworkers(name, phone, active)
Values($1, $2, $3)
RETURNING id;