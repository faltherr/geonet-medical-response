CREATE TABLE survey (
id serial primary key,
name text,
phone varchar(20),
location varchar(40),
age integer,
famPlan varchar(7),
hiv varchar(7),
parity integer,
dueDate date,
alert BOOLEAN NOT NULL DEFAULT FALSE,
completed BOOLEAN NOT NULL DEFAULT FALSE,
latitude text,
longitude text
)