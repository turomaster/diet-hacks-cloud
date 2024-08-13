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
values ('markm', '$argon2id$v=19$m=65536,t=3,p=4$drFfrBXQox0Va1L2zmxD1w$SanvtYoY0Wr3y15EAsgI8qh++81a2/K3qA6Zm8DNDro', 'user', now());

insert into "users" ("username", "hashedPassword", "role", "createdAt")
values ('dirtbiker78', '$argon2id$v=19$m=65536,t=3,p=4$drFfrBXQox0Va1L2zmxD1w$SanvtYoY0Wr3y15EAsgI8qh++81a2/K3qA6Zm8DNDro', 'user', now());

insert into "users" ("username", "hashedPassword", "role", "createdAt")
values ('musicfan98', '$argon2id$v=19$m=65536,t=3,p=4$drFfrBXQox0Va1L2zmxD1w$SanvtYoY0Wr3y15EAsgI8qh++81a2/K3qA6Zm8DNDro', 'user', now());

INSERT INTO "categories" ("name") VALUES ('Breakfast');
INSERT INTO "categories" ("name") VALUES ('Dinner');
INSERT INTO "categories" ("name") VALUES ('Dessert');
INSERT INTO "categories" ("name") VALUES ('Snacks');
INSERT INTO "categories" ("name") VALUES ('Fast Food');
INSERT INTO "categories" ("name") VALUES ('Ingredient Swaps');

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Chomp''s Zero Sugar Beef Stick', 100, 'Only 100 calories, zero sugar and 10G of protein.', 1, 4, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Magic Spoon Zero Sugar Cereal', 140, 'Only 140-170 calories. 4g net carbs and 13-14g protein.', 1, 1, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Orville Redenbacher''s Microwave Popcorn Smart Pop 94% Fat Free Butter', 240, 'This is the lowest calorie popcorn on the market.', 2, 4, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Chick-fil-A Market Salad & Grilled Nuggets ', 730, 'Only salad with no chicken, no toppings, and fat-free honey mustard. Order 12 count of grilled nuggets on the side.', 1, 5, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Jersey Mike''s Turkey Provolone Bowl', 420, 'Order Mike''s Way, no olive oil. Red wine vinegar is ok. Add extra meat & cheese. If you need crunch you can order chips and add to salad (+240 calories)', 2, 5, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Sugar Free Cheesecake Pudding', 300, 'Sugar Free Jell-O Cheesecake Instant Pudding. 1 cup Fairlife 0% fat milk, 2/3 cup nonfat Greek yogurt. Mix with blender for 2 minutes. Let rise in fridge for 5 minutes. Top with berries and Reddi-wip.', 3, 3, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Only use mustard for sauce', null, 'Mustard is zero calories. Mayo and ketchup are high calorie.', 3, 6, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Swerve sugar', null, 'Swerve is zero calories and measures just like sugar.', 3, 6, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Spray cooking oil', null, 'Cooking with spray cooking oil has less calories as opposed to butter or non-spray olive oil.', 3, 6, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Any fruit ending with berry', null, 'Any fruit ending with "berry" will have significantly less calories and sugar.', 3, 6, 0, now());

INSERT INTO "comments" ("postId", "username", "content")
VALUES (1, 'musicfan98', 'Wow! Great tip!');

INSERT INTO "comments" ("postId", "username", "content")
VALUES (1, 'dirtbiker78', 'Never knew about this. Thanks.');

INSERT INTO "comments" ("postId", "username", "content")
VALUES (2, 'markm', 'Looks great!');
