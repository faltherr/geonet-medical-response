INSERT INTO healthworkers(name, phone, active, email)
Values($1, $2, $3, $4)
RETURNING id;