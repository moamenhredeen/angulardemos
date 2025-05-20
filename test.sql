
-- get all users from the database
SELECT * FROM users;

-- get all users from the database
SELECT * FROM users;

-- get new users from the database
SELECT * FROM users WHERE created_at > NOW() - INTERVAL 1 DAY;

-- get users who have not logged in for the last 30 days
SELECT * FROM users WHERE last_login < NOW() - INTERVAL 30 DAY;

-- get users that have not logged in for the last 30 days
SELECT * FROM users WHERE last_login < NOW() - INTERVAL 30 DAY;

-- get users that have not logged in for the last 30 days
SELECT * FROM users WHERE last_login < NOW() - INTERVAL 30 DAY;

-- get all successful logins
SELECT * FROM users WHERE last_login > NOW() - INTERVAL 30 DAY;

-- get all failed logins
SELECT * FROM users WHERE last_login < NOW() - INTERVAL 30 DAY;



-- get all users from the database
SELECT * FROM users;

-- get all users from the database
SELECT * FROM users;


