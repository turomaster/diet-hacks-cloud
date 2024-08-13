/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express, { application } from 'express';
import pg, { Client, DatabaseError } from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { authMiddleware, ClientError, errorMiddleware } from './lib/index.js';
import { Category, Comment, Post, PostVotes, UserPost } from './lib/data.js';

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};
type Auth = {
  username: string;
  password: string;
};

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);

    const sql = `
      insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt";
    `;

    const params = [username, hashedPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `
      select "userId",
             "hashedPassword"
        from "users"
        where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    if (!result) throw new ClientError(401, `User ${username} was not found`);

    const { userId, hashedPassword } = result.rows[0];

    if (await argon2.verify(hashedPassword, password)) {
      const payload = {
        userId,
        username,
      };
      const token = jwt.sign(payload, hashKey);
      res.status(200).json({ user: payload, token });
    } else {
      throw new ClientError(401, 'Invalid login');
    }
  } catch (err) {
    next(err);
  }
});

app.get('/api/posts', async (req, res, next) => {
  try {
    const sql = `
      select "body",
             "calories",
             "categoryId",
             "postId",
             "role",
             "title",
             "userId",
             "username",
             "views"
        from "posts"
        join "users" using ("userId")
        order by "postId" desc;
    `;

    const result = await db.query<UserPost[]>(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/posts/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!Number.isInteger(+postId))
      throw new ClientError(400, `id: ${postId} must be a number.`);
    const sql = `
      select *
        from "posts"
        where "postId" = $1;
    `;
    const params = [postId];
    const result = await db.query<Post[]>(sql, params);
    if (!result.rows[0])
      throw new ClientError(404, `post with id: ${postId} does not exist.`);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/posts', authMiddleware, async (req, res, next) => {
  try {
    const { title, categoryId, calories, body, userId } = req.body;
    if (!title || !body || !categoryId) {
      throw new ClientError(400, 'title, body and categoryId is required.');
    }
    const sql = `
      insert into "posts" ("title", "categoryId", "calories", "body", "userId")
        values ($1, $2, $3, $4, $5)
        returning *;
    `;
    const caloriesValue = calories || null;
    const params = [title, categoryId, caloriesValue, body, userId];
    const result = await db.query<Post>(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.put('/api/posts/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!Number.isInteger(+postId))
      throw new ClientError(400, `postId ${postId} must be a number.`);
    const { views } = req.body;
    const sql = `
      update "posts"
        set "views" = $1
        where "postId" = $2
        returning *;
    `;
    const params = [views, postId];
    const result = await db.query<Post>(sql, params);
    if (!result.rows[0])
      throw new ClientError(404, `Cannot find post with postId: ${postId}`);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/posts/:postId', authMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!Number.isInteger(+postId))
      throw new Error(`postId: ${postId} must be a number.`);

    const sql = `
      delete from "posts"
        where "postId" = $1;
    `;
    const params = [postId];
    await db.query(sql, params);
    res.json({ success: 'post deleted' });
  } catch (err) {
    next(err);
  }
});

app.get('/api/comments/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!Number.isInteger(+postId))
      throw new ClientError(400, `postId: ${postId} must be a number.`);
    const sql = `
      select *
        from "comments"
        where "postId" = $1
        order by "createdAt" desc
    `;
    const params = [postId];
    const result = await db.query<Comment[]>(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/comments/:postId', authMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!Number.isInteger(+postId))
      throw new ClientError(400, `postId: ${postId} must be a number.`);
    const { content, userId, username } = req.body;
    if (!content || !userId || !username)
      throw new ClientError(400, 'content and userId is required');
    const sql = `
      insert into "comments" ("content", "userId", "postId", "username")
        values ($1, $2, $3, $4)
        returning *;
    `;
    const params = [content, userId, postId, username];
    const result = await db.query<Comment>(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    const error = err as DatabaseError;
    if (error.constraint === 'comments_postId_fkey') {
      next(
        new ClientError(
          404,
          `Post with id: ${req.params.postId} does not exist`
        )
      );
    } else {
      next(err);
    }
  }
});

app.get('/api/categories', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "categories"
    `;
    const result = await db.query<Category>(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/categories/:categoryName', async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    if (!(typeof categoryName === 'string'))
      throw new ClientError(
        400,
        `categoryName: ${categoryName} must be a string`
      );
    const sql = `
      select *
        from "posts"
        join "categories" using ("categoryId")
        join "users" using ("userId")
        where "categories"."name" = $1;
    `;
    const params = [categoryName];
    const result = await db.query<Post[]>(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/categories/trending', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "posts"
        order by "posts"."views" desc;
    `;
    const result = await db.query<Post[]>(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/postVotes', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "postVotes"
      `;
    const result = await db.query<PostVotes[]>(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/postVotes/:postId', authMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!Number.isInteger(+postId))
      throw new ClientError(400, `postId: ${postId} must be a number.`);
    const { userId, voteType } = req.body;
    if (!userId || !voteType)
      throw new ClientError(400, 'userId and voteType are required.');
    const sql = `
      insert into "postVotes" ("postId", "userId", "voteType")
        values ($1, $2, $3)
        returning *;
    `;
    const params = [postId, userId, voteType];
    const result = await db.query(sql, params);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.get('/api/postVotes/:postId', authMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!Number.isInteger(+postId))
      throw new ClientError(400, `postId must be a number`);
    if (!req.user?.userId)
      throw new ClientError(400, 'userId and voteType are required.');
    const sql = `
      select *
        from "postVotes"
        where "userId" = $1
        and "postId" = $2;
    `;

    const params = [req.user.userId, postId];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/postVotes/:postId', authMiddleware, async (req, res, next) => {
  const { postId } = req.params;
  try {
    if (!Number.isInteger(+postId))
      throw new ClientError(400, `postId: ${postId} must be a number.`);
    if (!postId)
      throw new ClientError(400, 'userId and voteType are required.');
    const sql = `
      delete from "postVotes"
        where "postId" = $1
        and "userId" = $2;
    `;
    const params = [postId, req.user?.userId];
    const result = await db.query(sql, params);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/*
 * Handles paths that aren't handled by any other route handler.
 * It responds with `index.html` to support page refreshes with React Router.
 * This must be the _last_ route, just before errorMiddleware.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
