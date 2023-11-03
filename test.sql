-- Active: 1698726407899@@147.139.210.135@5432@dmm01@public
CREATE TABLE users(
    name VARCHAR,
    umur INTEGER,
    alamat VARCHAR
);

INSERT INTO users (name, umur, alamat) VALUES ('ahmad', 20, 'tegal');

INSERT INTO users (name, umur, alamat) VALUES ('juki', 19, 'bojong soang');

INSERT INTO users (name, umur, alamat) VALUES ('wendi', 20, 'tanggerang');

INSERT INTO users (name, umur, alamat) VALUES ('ansor', 17, 'depok');

UPDATE users SET alamat='bogor' WHERE name='ansor';

DELETE FROM users WHERE name='ahmad';

DELETE FROM users

SELECT * FROM users;
