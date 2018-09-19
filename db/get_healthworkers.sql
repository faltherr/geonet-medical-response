SELECT healthworkers.*, outposts.*, patients.name as patient_name  FROM healthworkers
JOIN outposts on healthworkers.outpost_id = outposts.id
JOIN patients on healthworkers.id = patients.healthworker_id
ORDER BY healthworkers.id;