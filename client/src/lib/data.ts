export type Posts = {
  title: string;
  calories: number;
  body: string;
  userId: number;
  categoryId: number;
  totalVotes: number;
  views: number;
  createdAt: string;
};

export async function getPosts(): Promise<Posts[]> {
  const response = await fetch('/api/posts', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return (await response.json()) as Posts[];
}
