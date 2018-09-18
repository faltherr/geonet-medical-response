SELECT healthworkers.name as healthworker_name, healthworkers.phone as healthworker_phone, healthworkers.active as heathworker_active, patients.*, survey.*  FROM patients
JOIN healthworkers on patients.healthworker_id = healthworkers.id
JOIN survey on patients.id = survey.patient_id
ORDER BY patients.id;