import { RegistrationForm } from '../components/RegistrationForm';
import { SignInForm } from '../components/SignInForm';

type Props = {
  mode: 'sign-up' | 'sign-in';
};
export function AuthPage({ mode }: Props) {
  return (
    <div className="container my-24 mx-4 border-2">
      {mode === 'sign-up' && <RegistrationForm />}
      {mode === 'sign-in' && <SignInForm />}
    </div>
  );
}
