CREATE TABLE authentification (username VARCHAR(140) PRIMARY KEY, password VARCHAR(36),password_hash TEXT);


CREATE TABLE participants (
    id VARCHAR(40) PRIMARY KEY,
    gender VARCHAR(1) NOT NULL,
    time_part1 NOT NULL, 
    time_quiz1 NOT NULL,
    list_answers_quiz1 TEXT NOT NULL,

    time_part2 NOT NULL, 
    time_quiz2 NOT NULL,
    list_answers_quiz2 TEXT,

    time_part3 NOT NULL, 
    time_quiz3 NOT NULL,
    list_answers_quiz3 TEXT,

    time_part4 NOT NULL, 
    time_quiz4 NOT NULL,
    list_answers_quiz4 TEXT,
)

