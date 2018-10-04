INSERT INTO auth0admin (auth0, name, email, admin)
values (${sub}, ${name}, ${email}, false)
RETURNING *;