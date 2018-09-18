SELECT * FROM outposts 
JOIN healthworkers on outposts.id = healthworkers.outpost_id 
ORDER BY outposts.id