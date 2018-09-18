INSERT INTO patients(name, age, sex, location, phone, active)
Values($1, $2, $3, $4, $5, $6)
RETURNING id;