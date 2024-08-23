# Diet Hacks

A full stack React project for users who want to find and post diet hacks and tips.

## Why I Built This

My motivation for this project is my passion for healthy eating so I created a site in which users can post their tips or diet hacks to a community working on achieving their health goals.

## Technologies Used

- PostgreSQL
- Express
- React
- Node.js
- TypeScript
- AWS

## Live Demo

Try the application live at http://ec2-52-20-71-100.compute-1.amazonaws.com/

User: guest

Password: password

## Features

- Users can register and login
- Users can create posts
- Users can upvote or downvote posts
- Users can comment on posts
- Users can filter posts by categories

## Preview

![DietHacks](https://github.com/user-attachments/assets/03d66a6c-0cd1-42cb-8849-0c23e9d5cd1b)

# Challenges Encountered

1. When testing my POST route endpoint for comments with a postId, I purposely used a non-existent postId, which resulted in an error: "insert or update on table \"comments\" violates foreign key constraint \"comments_postId_fkey\"." I had to assert the error as a DatabaseError in my catch block and then pass a new ClientError using `next` to trigger the error middleware.

2. I needed to conditionally render the sidebar in desktop mode but not on mobile. I created a `useEffect` hook with a window resize event listener that sets the `setIsMobile` function to true if the window size is less than or equal to 768px. There was a bug where, if I refreshed the browser while in mobile view, React would still display the sidebar. The problem was that my `isMobile` state was set to `false` by default, so I needed to set it to true and add a conditional to check `window.innerWidth` before the event listener fired.

3. When retrieving categories from my API endpoint, I initially used the `useParams` hook to get the `categoryName` and looped through the categories to match the params name with the `categoryId` to get posts by category. However, this caused unnecessary logic to convert the `post.categoryId` to the post when I already had the name. Instead, I added a check in the `loadPosts` async function to see if `categoryName` was truthy, then loaded posts by category by fetching from the `api/categories/<categoryName>` endpoint. Update: I removed the `useParams` hook and instead used an event handler function to set `categoryName` to a state variable, which was then passed to the `getPostsByCategory` async function.

4. In my get posts by `categoryName` endpoint (`api/posts/:categoryName`), since my categories table didn't have a `categoryName` column, I had to join the categories table with my posts table, matching `posts.categoryId` to `categories.id`. I also added a `WHERE` clause to match `categories.name` with the `categoryName` from the endpoint. I encountered an issue where the primary key and foreign key were not named consistently, so I learned that I should have named the IDs based on the table name, as they usually become the foreign keys.

5. I encountered a bug where clicking on a category would load the posts from that category, but clicking on the Home link would only show posts from the previously navigated category. The issue was that my state never got reset, so it continued referencing the old category.

6. My authentication middleware had an issue where the user token was not being saved to `localStorage` even though the token was being returned from the API on the server side. The problem was that my React Router in the `App` component on the client side was not wrapped with the `UserProvider` function defined in the `UserContext` component.

7. I was making two different API calls in my `App` component to conditionally load posts by all or by category. I needed to load cards with the posts table but also join the users table to show the usernames with their respective posts. So I created a `UserPost` type and then used a union type for my state, which held the posts retrieved from the API calls.

8. I discovered an issue where all posts were being rendered in `App`, but since `App` mounts once and doesn't unmount, a create post action wouldn't automatically fetch new posts and update the `App` component. The post form would send the user to the home page, but the new post wasn't visible until refreshing the page. I refactored my code to use context and created a `PostsContext` provider, which held the fetch posts functions and state. In the components that needed posts, I destructured the posts object from `PostsContext`. This also broke my `NavBar` component since it was using an event handler function in `App`, which I moved to `PostsContext`.

9. There was an issue where creating a post would add it to the database, but the new post wouldn't get fetched on the client side. I had to redo my database schema so that the foreign keys on tables had the exact names of the primary keys on other tables. For example, `users.userId -> posts.userId`.

10. I ran into an issue where upvoting a post twice would remove the upvote from the database but not update the UI. The problem was in my `handleUpvote` function, which checked if the upvote existed. However, if it did exist, the two async calls (`removeUpvote` and `checkUpvote`) were not being awaited, so the handle function wasn't waiting for `removeUpvote` to finish. I also made a schema change to the `postVotes` table, removing `postVoteId` and `totalVotes` (as they weren't necessary), and changing `userId` and `postId` to primary keys to ensure a user can't both upvote and downvote a post.

11. Ran into a bug where if a different user was logged in and tried to upvote on a post with an existing upvote from a different user, my checkIfVoteExists function would always return true since it didn't verify the current user match the vote userId. This caused the Card component to not re-render with the updated state for votes. I fixed this by adding a userId check to the conditional when looping through the current votes. `if (vote.postId === postId && user?.userId === vote.userId)`.
