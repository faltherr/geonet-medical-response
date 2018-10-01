INSERT INTO patients(healthworker_id, survey_id)
VALUES ($1, $2)
RETURNING *;