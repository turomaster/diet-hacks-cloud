-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "users" ("username", "hashedPassword", "role", "createdAt")
values ('markm', 'password123', 'user', now());

insert into "users" ("username", "hashedPassword", "role", "createdAt")
values ('dirtbiker78', 'password123', 'user', now());

insert into "users" ("username", "hashedPassword", "role", "createdAt")
values ('musicfan98', 'password123', 'user', now());

INSERT INTO "categories" ("name") VALUES ('Breakfast');
INSERT INTO "categories" ("name") VALUES ('Dinner');
INSERT INTO "categories" ("name") VALUES ('Dessert');
INSERT INTO "categories" ("name") VALUES ('Snacks');
INSERT INTO "categories" ("name") VALUES ('Fast Food');
INSERT INTO "categories" ("name") VALUES ('Ingredient Swaps');

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "totalVotes", "views", "createdAt")
VALUES ('Chomp''s Zero Sugar Beef Stick', 100, 'Only 100 calories, zero sugar and 10G of protein.', 1, 1, 36, 24, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "totalVotes", "views", "createdAt")
VALUES ('Jersey Mike''s Turkey Provolone Tub', 550, 'Order Mike''s Way, no olive oil or mayo. Red wine vinegar is ok.', 2, 2, 12, 36, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "totalVotes", "views", "createdAt")
VALUES ('Sugar Free Cheesecake Pudding', 400, 'Sugar free jello cheesecake pudding. 1 cup Fairlife 0% fat milk, 2/3 cup nonfat Greek yogurt. Sugar free Reddi-wip.', 3, 3, 48, 52, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "totalVotes", "views", "createdAt")
VALUES ('Keto-Friendly Chicken Salad', 350, 'Grilled chicken breast, mixed greens, avocado, and a light vinaigrette.', 1, 4, 25, 40, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "totalVotes", "views", "createdAt")
VALUES ('Veggie Power Bowl', 420, 'Quinoa, black beans, roasted veggies, and a sprinkle of feta.', 2, 5, 32, 58, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "totalVotes", "views", "createdAt")
VALUES ('Protein-Packed Smoothie', 300, 'Almond milk, protein powder, spinach, and a handful of berries.', 3, 3, 40, 30, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "totalVotes", "views", "createdAt")
VALUES ('Low-Carb Egg Muffins', 250, 'Eggs, spinach, and cheese baked into a convenient muffin form.', 1, 1, 28, 20, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "totalVotes", "views", "createdAt")
VALUES ('Cauliflower Rice Stir-Fry', 200, 'Stir-fried cauliflower rice with veggies and tofu.', 2, 4, 35, 45, now());

INSERT INTO "comments" ("postId", "username", "content")
VALUES (1, 'musicfan98', 'Wow! Great tip!');

INSERT INTO "comments" ("postId", "username", "content")
VALUES (1, 'dirtbiker78', 'Never knew about this. Thanks.');

INSERT INTO "comments" ("postId", "username", "content")
VALUES (2, 'markm', 'Looks great!');
