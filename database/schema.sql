set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" text UNIQUE,
  "email" text UNIQUE,
  "password" text,
  "role" text,
  "createdAt" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "posts" (
  "id" serial PRIMARY KEY,
  "title" text,
  "calories" text,
  "body" text,
  "userId" integer,
  "categoryId" integer,
  "totalVotes" integer,
  "views" integer,
  "createdAt" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" serial PRIMARY KEY,
  "name" text
);

CREATE TABLE "comments" (
  "id" serial PRIMARY KEY,
  "postId" integer,
  "userId" integer,
  "content" text,
  "createdAt" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "commentVotes" (
  "id" serial PRIMARY KEY,
  "userId" integer,
  "commentId" integer,
  "voteType" text
);

CREATE TABLE "postVotes" (
  "id" serial PRIMARY KEY,
  "userId" integer,
  "postId" integer,
  "voteType" text
);

COMMENT ON COLUMN "posts"."body" IS 'Content of the post';

COMMENT ON COLUMN "commentVotes"."voteType" IS 'Can be "like" or "dislike"';

COMMENT ON COLUMN "postVotes"."voteType" IS 'Can be "upvote" or "downvote"';

ALTER TABLE "posts" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("categoryId") REFERENCES "categories" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("postId") REFERENCES "posts" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "commentVotes" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "commentVotes" ADD FOREIGN KEY ("commentId") REFERENCES "comments" ("id");

ALTER TABLE "postVotes" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "postVotes" ADD FOREIGN KEY ("postId") REFERENCES "posts" ("id");
