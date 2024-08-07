export type Posts = {
  id: number;
  title: string;
  calories: number;
  body: string;
  userId: number;
  categoryId: number;
  totalVotes: number;
  views: number;
  createdAt: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Comments = {
  id: number;
  postId: number;
  username: string;
  content: string;
};

export type User = {
  id: number;
  username: string;
};

export type UserPost = Posts & User;

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
  const response = await fetch(`/api/categories/${categoryName}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return (await response.json()) as Posts[];
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
