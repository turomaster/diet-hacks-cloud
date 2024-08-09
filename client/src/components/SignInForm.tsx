import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, useUser } from './useUser';

type AuthData = {
  user: User;
  token: string;
};

type Props = {
  isMobile: boolean | null;
};

/**
 * Form that signs in a user.
 */
export function SignInForm({ isMobile }: Props) {
  const { handleSignIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = (await res.json()) as AuthData;
      handleSignIn(user, token);
      navigate('/');
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={
        isMobile
          ? 'flex flex-col items-center mt-12 py-8 px-32 rounded-md bg-accent-gray'
          : 'flex flex-col items-center mt-12 py-8 px-32 rounded-md bg-accent-gray'
      }>
      <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-1">
          <div>
            <label className="mb-1 block">
              Username
              <input
                required
                name="username"
                type="text"
                className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
              />
            </label>
            <label className="mb-1 block">
              Password
              <input
                required
                name="password"
                type="password"
                className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            className="align-middle text-center border rounded py-2.5 px-6 text-xs font-medium bg-lime-green text-white hover:bg-green-700">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
