UPDATE patients 
SET name = $1,
    age = $2,
    sex = $3,
    location = $4,
    phone = $5,
    active = $6
WHERE id = $7;

SELECT patients.*, survey.*, healthworkers.name as healthworker_name, healthworkers.phone as healthworker_phone, healthworkers.active as healthworker_active FROM patients
JOIN healthworkers on patients.healthworker_id = healthworkers.id
JOIN survey on patients.id = survey.patient_id
ORDER BY patients.id;