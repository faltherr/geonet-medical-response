CREATE TABLE patients(
  id SERIAL PRIMARY KEY,
  name TEXT,
  age REAL,
  sex TEXT,
  location TEXT,
  phone TEXT,
  active BOOLEAN,
  healthworker_id INTEGER references healthworkers(id),
  survey_id INTEGER references survey(id)
);

CREATE TABLE healthworkers(
  id SERIAL PRIMARY KEY,
  auth_id TEXT,
  name TEXT,
  phone REAL,
  active BOOLEAN,
  outpost_id INTEGER references outposts(id),
  patient_id INTEGER references patients(id)
);

CREATE TABLE outposts(
   id SERIAL PRIMARY KEY,
   latitude REAL,
   longitude REAL,
   healthworker_id INTEGER references healthworkers(id) 
);

CREATE TABLE survey(
  id SERIAL PRIMARY KEY,
  patient_id INTEGER references patients(id),
  due_date TEXT,
  -- calculate due date??
  HIV_status BOOLEAN,
  alcohol_use BOOLEAN,
);



INSERT INTO patients (name, age, sex, location, phone, active)
values ('Nicolas Cage', 54, 'Male', '3words', 5555555555, true)