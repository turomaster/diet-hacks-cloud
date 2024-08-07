# full-stack-project

A full stack TypeScript solo project.

## Getting Started

---

### Use this template to create a new repo on your GitHub account

1. Click the green `Use this template` button, select `Create a new repository`
   1. Under `Owner` select your username
   1. Give your repository a name. Name it after your application. The name `full-stack-project` is _not_ a good name.
   1. (Optional) Add a description
   1. Leave repository as `Public`
   1. **DO NOT** Include all branches
   1. Click the green `Create repository from template` button

---

### Clone Newly created repo into `lfz-code`

1. From your newly created repo on GitHub, click the green `<> Code` button, then copy **SSH** URL
1. Open `lfz-code`, click on blue `><` button in bottom left of `lfz-code`
   1. Select `Clone Repository in Container Volume...`
   1. Paste **SSH** URL for your repo, click `Clone git repository from URL`

---

### Run and test project setup

#### Getting Started

1. Install all dependencies with `npm install`.

#### Create the database

If your project will be using a database, create it now.

1. Start PostgreSQL
   ```sh
   sudo service postgresql start
   ```
1. Create database (replace `name-of-database` with a name of your choosing, such as the name of your app)
   ```sh
   createdb name-of-database
   ```
1. In the `server/.env` file, in the `DATABASE_URL` value, replace `changeMe` with the name of your database, from the last step
1. While you are editing `server/.env`, also change the value of `TOKEN_SECRET` to a custom value, without spaces.
1. Make the same changes to `server/.env.example`.

If your project will _not_ be using a database, edit `package.json` to remove the `dev:db` script.

#### Start the development servers

1. Start all the development servers with the `"dev"` script:
   ```sh
   npm run dev
   ```
1. Later, when you wish to stop the development servers, type `Ctrl-C` in the terminal where the servers are running.

#### Verify the client

1. A React app has already been created for you.
1. Take a minute to look over the code in `client/src/App.tsx` to get an idea of what it is doing.
1. Go to the app in your browser. You should see the message from the server below the React logo, and in the browser console.
   ![](md.assets/client-server.png)
1. If you see the message from the server in your browser you are good to go, your client and server are communicating.

#### Set up the database

1. In your browser navigate to the site you used for your database design.
1. Export your database as PostgreSQL, this should generate the SQL code for creating your database tables.
   - Reach out to an instructor if you have any issues with this step
1. Copy the generated SQL code and paste it into `database/schema.sql` below the preexisting sql code in the file. The end result should look something like: _(You will likely have more tables)_

   ```SQL
   set client_min_messages to warning;

   -- DANGER: this is NOT how to do it in the real world.
   -- `drop schema` INSTANTLY ERASES EVERYTHING.
   drop schema "public" cascade;

   create schema "public";

   create table "todos" (
       "todoId"      serial PRIMARY KEY,
       "task"        text not null,
       "isCompleted" boolean not null,
       "createdAt"   timestamptz not null DEFAULT now(),
       "updatedAt"   timestamptz not null DEFAULT now()
   );
   ```

1. In a separate terminal, run `npm run db:import` to create your tables
1. Use `psql` to verify your tables were created successfully (see [LFZ Database Guide](https://lms.learningfuze.com/code-guides/Learning-Fuze/curriculum/database) for tips). Your database and tables should be listed; if not, stop here and reach out to an instructor for help
1. At this point your database is setup and you are good to start using it. However there is no data in your database, which isn't necessarily a bad thing, but if you want some starting data in your database you need to add insert statements into the `database/data.sql` file. You can add whatever starting data you need/want. Here is an example:
   ```SQL
   insert into "todos" ("task", "isCompleted")
   values
       ('Learn to code', false),
       ('Build projects', false),
       ('Get a job', false);
   ```
1. After any changes to `database/schema.sql` or `database/data.sql` re-run the `npm run db:import` command to update your database. Use `psql` to verify your changes were successfully applied.

## Deployment

Once your template is set up and functional, deploy it. This will get all the deployment issues ironed out early. During development, you should re-deploy frequently to make sure that your code works properly in your production environment. Deployment instructions can be found [HERE](https://github.com/Learning-Fuze/lfz-portfolios/tree/master/deploy-to-ec2)

---

### Available `npm` commands explained

Below is an explanation of all included `npm` commands in the root `package.json`. Several are only used for deployment purposes and should not be necessary for development.

1. `start`
   - The `start` script starts the Node server in `production` mode, without any file watchers.
1. `build`
   - The `build` script executes `npm run build` in the context of the `client` folder. This builds your React app for production. This is used during deployment, and not commonly needed during development.
1. `db:import`
   - The `db:import` script executes `database/import.sh`, which executes the `database/schema.sql` and `database/data.sql` files to build and populate your database.
1. `dev`
   - Starts all the development servers.
1. `lint`
   - Runs ESLint against all the client and server code.
1. Not directly used by developer
   1. `install:*`
   - These scripts install dependencies in the `client` and `server` folders, and copy `.env.example` to `.env` if it doesn't already exist.
   1. `dev:*`
   - These scripts start the individual development servers.
   1. `lint:*`
   - These scripts run lint in the client and server directories.
   1. `postinstall`
      - The `postinstall` script is automatically run when you run `npm install`. It is executed after the dependencies are installed. Specifically for this project the `postinstall` script is used to install the `client` and `server` dependencies.
   1. `prepare`
      - The `prepare` script is similar to `postinstall` — it is executed before `install`. Specifically for this project it is used to install `husky`.
   1. `deploy`
      - The `deploy` script is used to deploy the project by pushing the `main` branch to the `pub` branch, which triggers the GitHub Action that deploys the project.

# Challenges Encountered

1. When testing my Express route endpoint for comments with a postId, purposely using a postId that didn't exist resulted in an error: "insert or update on table \"comments\" violates foreign key constraint \"comments_postId_fkey\"" I ended up have to in my catch block for the POST route, I needed to assert in Typescript the error as a DatabaseError and then pass new ClientError using next to call the error middleware.
2. I needed to conditionally render the sidebar if in desktop mode but not on mobile. So I created a useEffect hook with a window resize event listener that sets the setter function `setIsMobile` to true if the window size is less than or equal to 768px. There was a bug where if I refreshed the browser and the screen was still in mobile, React would add the sidebar. The problem was my `isMobile` state was set to `false` by default, but I needed to set it to true and then add a conditional to check `window.innerWidth` before the event listener fired.
3. When I was getting categories from my API endpoint, I was trying to use a useParams hook to get the categoryName and also loop through through the categories to match the params name with the categoryId to get posts by category. However, it was causing unnecessary logic to convert the post.categoryId to the post when I already had the name. So I just added to the loadPosts async function to check if categoryName was truthy and then load posts by category by fetching from the `api/categories/<categoryName>` endpoint. Update: I ended up removing the useParams hook to get the categoryName and instead used a event handler function to set categoryName to a state variable which then the state was passed to getPostsByCategory async function.
4. In my get posts by categoryName endpoint, `api/posts/:categoryName`, since my categories table didn't have a categoryName column, I had to join the categories table with my posts table which matched posts.categoryId to categories.id. And finally a where clause which matched the categories.name to the categoryName from the endpoint. I was also running into an issue where the primary key and the foreign key were not exactly the same name. So I had to join the tables but then use posts.categoryId = categories.id. I learned that I should of named the id's based off the table name because they are usually the foreign keys.
5. I ran into a bug where I would click on a category and it would load the posts from that category, but then if I clicked on the Home link, it would only show the posts of the categories that I just navigated from. The problem was my state never got reset so it's still referencing the old category.
6. My middleware auth had an issue where my user token was not being saved to localstorage even though the token was being returned from the api on the server side. The issue was my React Router in my `App` component on the client side was not wrapped with my UserProvider function defined in the context, UserContext component.
