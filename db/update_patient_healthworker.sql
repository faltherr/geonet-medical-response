UPDATE patients 
SET healthworker_id = $2
WHERE id = $1;

SELECT patients.*, survey.*, healthworkers.name as healthworker_name
FROM patients
JOIN healthworkers on patients.healthworker_id = healthworkers.id
FULL JOIN survey on patients.survey_id = survey.id
ORDER BY patients.id