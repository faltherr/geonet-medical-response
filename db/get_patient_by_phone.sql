SELECT patients.*, survey.*, healthworkers.phone as healthworker_phone
FROM patients
JOIN healthworkers on patients.healthworker_id = healthworkers.id
FULL JOIN survey on patients.survey_id = survey.id
WHERE survey.phone = $1
