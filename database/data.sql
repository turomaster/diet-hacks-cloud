insert into "users" ("username", "hashedPassword", "createdAt")
values ('markm', '$argon2id$v=19$m=65536,t=3,p=4$drFfrBXQox0Va1L2zmxD1w$SanvtYoY0Wr3y15EAsgI8qh++81a2/K3qA6Zm8DNDro', now());

insert into "users" ("username", "hashedPassword", "createdAt")
values ('dirtbiker78', '$argon2id$v=19$m=65536,t=3,p=4$drFfrBXQox0Va1L2zmxD1w$SanvtYoY0Wr3y15EAsgI8qh++81a2/K3qA6Zm8DNDro', now());

insert into "users" ("username", "hashedPassword", "createdAt")
values ('musicfan98', '$argon2id$v=19$m=65536,t=3,p=4$drFfrBXQox0Va1L2zmxD1w$SanvtYoY0Wr3y15EAsgI8qh++81a2/K3qA6Zm8DNDro', now());

INSERT INTO "categories" ("name") VALUES ('Breakfast');
INSERT INTO "categories" ("name") VALUES ('Dinner');
INSERT INTO "categories" ("name") VALUES ('Dessert');
INSERT INTO "categories" ("name") VALUES ('Snacks');
INSERT INTO "categories" ("name") VALUES ('Fast Food');
INSERT INTO "categories" ("name") VALUES ('Drinks');
INSERT INTO "categories" ("name") VALUES ('Ingredient Swaps');

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Tequila Soda', 100, 'Just tequila and soda water with lime.', 2, 6, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Michelob Ultra', 95, 'Only 95 calories for a 12 ounce beer.', 3, 6, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Zero Sugar Soda', 0, 'Same sweetness as regular sodas without the calories.', 3, 6, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Mustard or hot sauce on everything', null, 'Mustard or hot sauce is zero calories. Mayo and ketchup are both high calorie.', 3, 7, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Nuts', null, 'Generally, you want to avoid nuts as they are high in calories. Snap peas, carrots, or jicama sticks with low-fat ranch is a better alternative.', 3, 7, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Greek Yogurt Nonfat', null, 'High protein alternative to sour cream. Also versatile for making desserts with. Fage 0% is my favorite.', 2, 7, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Alfredo Chicken & Broccoli Bake', null, 'Low calorie alternative to chicken alfredo pasta. Substitute broccoli for pasta and cook in baking dish.', 3, 2, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Zero Sugar/Fat-Free Salad Dressings', null, 'Most salad dressings are high calorie and ruin a healthy salad. Opt for sugar free or low-fat dressings.', 1, 7, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Swerve sugar', null, 'Swerve is zero calories and measures just like sugar.', 3, 7, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Spray cooking oil', null, 'Cooking with spray cooking oil has less calories as opposed to butter or non-spray olive oil.', 3, 7, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Fruit ending with berry', null, 'Any fruit ending with berry will have less calories and sugar.', 3, 7, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Pickles', null, 'Low in calorie and gives you crunch.', 1, 4, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Magic Spoon Zero Sugar Cereal', 140, 'Only 140-170 calories. 4g net carbs and 13-14g protein.', 1, 1, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Orville Redenbacher''s Microwave Popcorn Smart Pop 94% Fat Free Butter', 240, 'This is the lowest calorie popcorn on the market.', 2, 4, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Yasso Greek Yogurt Bars', 100, 'Only 100 calories and 4g protein.', 3, 3, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Sugar Free Gum', 5, 'Only 5 calories and helps keep your mind off being hungry.', 1, 3, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Cucumber With Tajin', null, 'Slice cucumbers in half and then sprinkle Tajin spice to add flavor.', 1, 4, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Chick-fil-A Market Salad & Grilled Nuggets ', 730, 'Only salad with no chicken, no toppings, and fat-free honey mustard. Order 12 count of grilled nuggets on the side.', 1, 5, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Chomp''s Zero Sugar Beef Stick', 100, 'Only 100 calories, zero sugar and 10G of protein.', 1, 4, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Jersey Mike''s Turkey Provolone Bowl', 420, 'Order Mike''s Way, no olive oil. Red wine vinegar is ok. Add extra meat & cheese. If you need crunch you can order chips and add to salad (+240 calories)', 2, 5, 0, now());

INSERT INTO "posts" ("title", "calories", "body", "userId", "categoryId", "views", "createdAt")
VALUES ('Sugar Free Cheesecake Pudding', 300, 'Sugar Free Jell-O Cheesecake Instant Pudding. 1 cup Fairlife 0% fat milk, 2/3 cup nonfat Greek yogurt. Mix with blender for 2 minutes. Let rise in fridge for 5 minutes. Top with berries and Reddi-wip.', 3, 3, 0, now());
