-- Active: 1698726407899@@147.139.210.135@5432@dmm01@public
CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    content TEXT
);

INSERT INTO recipes (title, ingredients, photo, category_id) VALUES ('gelato', 'Vanili, susu, air', 'https://picsum.photos/200', 2);

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM 
recipes JOIN category ON recipes.category_id=category.id WHERE recipes.title ILIKE '%ayam%' ORDER BY category_id DESC;
SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM 
recipes JOIN category ON recipes.category_id=category.id WHERE recipes.ingredients ILIKE '%pangsit%' ORDER BY category_id DESC;
SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM 
recipes JOIN category ON recipes.category_id=category.id ORDER BY recipes.id DESC OFFSET 0 LIMIT 2;
SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM 
recipes JOIN category ON recipes.category_id=category.id WHERE category_id=1;

ALTER TABLE recipes ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES category(id);
ALTER TABLE recipes ADD CONSTRAINT fk_food_writer FOREIGN KEY (food_writer) REFERENCES users(id);

ALTER TABLE recipes RENAME COLUMN content TO ingredients;
ALTER TABLE recipes ADD COLUMN photo VARCHAR;

ALTER TABLE recipes ADD COLUMN food_writer INT;

ALTER TABLE recipes DROP COLUMN food_writer;

ALTER TABLE recipes ALTER COLUMN food_writer SET NOT NULL

CREATE TABLE category(
    id INT UNIQUE,
    name VARCHAR
);
CREATE TABLE users(
    uuid VARCHAR UNIQUE,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    username VARCHAR
);

INSERT INTO users(uuid, email, password, username) VALUES ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'admin@recipe.com',
'$argon2i$v=19$m=16,t=2,p=1$M3lneUs5RVVRWmhpQzRJUQ$zxN5Up66Kh0zwkdXYkzK2A', 'recipe admin');

SELECT * FROM users WHERE email='admin@recipe.com';

DROP TABLE users;
SELECT * FROM recipes;

INSERT INTO category(id, name) VALUES (1, 'Main course');
INSERT INTO category(id, name) VALUES (2, 'Appetizer');
INSERT INTO category(id, name) VALUES (3, 'Dessert');
INSERT INTO users(id, name, email, password) VALUES (1, 'Reza', 'wawa@gmail.com', 'papapapa');

ALTER TABLE recipes ADD COLUMN users_id VARCHAR;

UPDATE recipes SET users_id='1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' WHERE photo='https://picsum.photos/200';