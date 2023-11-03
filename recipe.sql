CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    content TEXT
);

INSERT INTO recipes (title, ingredients, photo, category_id) VALUES ('gelato', 'Vanili, susu, air', 'https://picsum.photos/200', 2);

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id;

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
    id INT UNIQUE,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR
);

DROP TABLE users;
SELECT * FROM recipes;

INSERT INTO category(id, name) VALUES (1, 'Main course');
INSERT INTO category(id, name) VALUES (2, 'Appetizer');
INSERT INTO category(id, name) VALUES (3, 'Dessert');
INSERT INTO users(id, name, email, password) VALUES (1, 'Reza', 'wawa@gmail.com', 'papapapa');