set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" text UNIQUE,
  "email" text UNIQUE,
  "hashedPassword" text,
  "role" text,
  "createdAt" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "posts" (
  "postId" serial PRIMARY KEY,
  "title" text,
  "calories" text,
  "body" text,
  "userId" integer,
  "categoryId" integer,
  "views" integer,
  "createdAt" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "categories" (
  "categoryId" serial PRIMARY KEY,
  "name" text
);

CREATE TABLE "comments" (
  "commentId" serial PRIMARY KEY,
  "postId" integer,
  "userId" integer,
  "username" text,
  "content" text,
  "createdAt" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "commentVotes" (
  "commentVoteId" serial PRIMARY KEY,
  "userId" integer,
  "commentId" integer,
  "voteType" text
);

CREATE TABLE "postVotes" (
  "postVoteId" serial PRIMARY KEY,
  "userId" integer,
  "postId" integer,
  "totalVotes" integer,
  "voteType" text
);

COMMENT ON COLUMN "posts"."body" IS 'Content of the post';

COMMENT ON COLUMN "commentVotes"."voteType" IS 'Can be "like" or "dislike"';

COMMENT ON COLUMN "postVotes"."voteType" IS 'Can be "upvote" or "downvote"';

ALTER TABLE "posts" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "posts" ADD FOREIGN KEY ("categoryId") REFERENCES "categories" ("categoryId");

ALTER TABLE "comments" ADD FOREIGN KEY ("postId") REFERENCES "posts" ("postId") ON DELETE CASCADE;

ALTER TABLE "comments" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "comments" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "commentVotes" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "commentVotes" ADD FOREIGN KEY ("commentId") REFERENCES "comments" ("commentId");

ALTER TABLE "postVotes" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "postVotes" ADD FOREIGN KEY ("postId") REFERENCES "posts" ("postId");
