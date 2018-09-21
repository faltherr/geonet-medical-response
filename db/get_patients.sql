SELECT patients.*, survey.*, healthworkers.name as healthworker_name
FROM patients
JOIN healthworkers on patients.healthworker_id = healthworkers.id
FULL JOIN survey on patients.id = survey.patient_id
ORDER BY patients.id;
