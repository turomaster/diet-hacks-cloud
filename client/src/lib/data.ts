import { Posts, UserPost } from '../components/PostsContext';

export type Category = {
  categoryId: number;
  name: string;
};

export type Comments = {
  commentId: number;
  postId: number;
  username: string;
  content: string;
};

export type User = {
  userId: number;
  username: string;
};

const authKey = 'um.auth';

type Auth = {
  user: User;
  token: string;
};

export function saveAuth(user: User, token: string): void {
  const auth: Auth = { user, token };
  localStorage.setItem(authKey, JSON.stringify(auth));
}

export function removeAuth(): void {
  localStorage.removeItem(authKey);
}

export function readUser(): User | undefined {
  const auth = localStorage.getItem(authKey);
  if (!auth) return undefined;
  return (JSON.parse(auth) as Auth).user;
}

export function readToken(): string | undefined {
  const auth = localStorage.getItem(authKey);
  if (!auth) return undefined;
  return (JSON.parse(auth) as Auth).token;
}

export async function getPosts(): Promise<UserPost[]> {
  const response = await fetch('/api/posts', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return (await response.json()) as UserPost[];
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch('/api/categories', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return (await response.json()) as Category[];
}

export async function getPostsByCategory(
  categoryName: string
): Promise<Posts[]> {
  if (categoryName === 'trending') {
    const response = await fetch('/api/posts', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const data = (await response.json()) as Posts[];
    const sortedData = data.sort((a, b) => b.views - a.views); // sort posts based on views in descending order
    return sortedData;
  }
  const response = await fetch(`/api/categories/${categoryName}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  const data = (await response.json()) as Posts[];
  return data;
}

export async function getComments(postId: number): Promise<Comments[]> {
  const response = await fetch(`/api/comments/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return (await response.json()) as Comments[];
}
