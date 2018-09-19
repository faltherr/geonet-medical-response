SELECT outposts.*, healthworkers.name as healthworker_name FROM outposts
JOIN healthworkers on outposts.id = healthworkers.outpost_id 
ORDER BY outposts.id