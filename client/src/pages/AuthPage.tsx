import { RegistrationForm } from '../components/RegistrationForm';
import { SignInForm } from '../components/SignInForm';

type Props = {
  mode: 'sign-up' | 'sign-in';
  isMobile: boolean;
};
export function AuthPage({ mode, isMobile }: Props) {
  return (
    <div
      className={
        isMobile
          ? 'flex justify-center rounded-md mx-10 mt-12 py-8 bg-accent-gray'
          : 'flex justify-center rounded-md mx-72 mt-12 py-8 bg-accent-gray'
      }>
      {mode === 'sign-up' && <RegistrationForm />}
      {mode === 'sign-in' && <SignInForm />}
    </div>
  );
}
