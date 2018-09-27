UPDATE survey 
SET name = $2,
    phone = $3,
    location = $4,
    latitude = $5,
    longitude = $6,
    age = $7,
    famplan = $8,
    hiv = $9,
    parity = $10,
    duedate = $11,
    alert = $12,
    completed = $13

WHERE id = $1;

SELECT patients.*, survey.*, healthworkers.name as healthworker_name
FROM patients
JOIN healthworkers on patients.healthworker_id = healthworkers.id
FULL JOIN survey on patients.survey_id = survey.id
ORDER BY patients.id
