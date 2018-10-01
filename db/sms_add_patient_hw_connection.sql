INSERT INTO patients(survey_id)
VALUES ($1)
RETURNING *;