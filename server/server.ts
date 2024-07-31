/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg, { DatabaseError } from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';
import { Comment, Post } from './lib/data.js';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/posts', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "posts";
    `;

    const result = await db.query<Post[]>(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/posts/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(+id))
      throw new ClientError(400, `id: ${id} must be a number.`);
    const sql = `
      select "title",
             "calories",
             "body"
        from "posts"
        where "id" = $1;
    `;
    const params = [id];
    const result = await db.query<Post[]>(sql, params);
    if (!result.rows[0])
      throw new ClientError(404, `post with id: ${id} does not exist.`);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/posts', async (req, res, next) => {
  try {
    const { title, calories, body, userId, categoryId } = req.body;
    if (!title || !calories || !body || !userId || !categoryId) {
      throw new ClientError(
        400,
        'title, calories, body, userId, and categoryId is required.'
      );
    }
    const sql = `
      insert into "posts" ("title", "calories", "body", "userId", "categoryId")
        values ($1, $2, $3, $4, $5)
        returning *;
    `;
    const params = [title, calories, body, userId, categoryId];
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
    const { title, calories, body } = req.body;
    if (!title || !calories || !body) {
      throw new ClientError(400, 'title, calories, and body is required.');
    }
    const sql = `
      update "posts"
        set "title" = $1,
            "calories" = $2,
            "body" = $3
        where "id" = $4
        returning *;
    `;
    const params = [title, calories, body, postId];
    const result = await db.query<Post>(sql, params);
    if (!result.rows[0])
      throw new ClientError(404, `Cannot find post with postId: ${postId}`);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/posts/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!Number.isInteger(+postId))
      throw new Error(`postId: ${postId} must be a number.`);

    const sql = `
      delete from "posts"
        where "id" = $1;
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
      select "content",
             "userId"
        from "comments"
        where "postId" = $1;
    `;
    const params = [postId];
    const result = await db.query<Comment[]>(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/comments/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!Number.isInteger(+postId))
      throw new ClientError(400, `postId: ${postId} must be a number.`);
    const { content, userId } = req.body;
    if (!content) throw new ClientError(400, 'content and userId is required');
    const sql = `
      insert into "comments" ("content", "userId", "postId")
        values ($1, $2, $3)
        returning *;
    `;
    const params = [content, userId, postId];
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
