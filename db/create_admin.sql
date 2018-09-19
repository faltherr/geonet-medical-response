INSERT INTO healthworkers (auth_id, name, email)
values (${sub}, ${name}, ${email})
RETURNING *;