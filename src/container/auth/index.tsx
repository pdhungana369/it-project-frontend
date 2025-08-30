import React from 'react';
import Login from './components/login';
import Register from './components/register';
import { userLogout } from '@redux/action/auth.action';
import { useAppDispatch } from '@redux/store';

export default function Auth() {
  const [showStep, setShowStep] = React.useState<number>(0);
  const dispatch = useAppDispatch();

  const renderAuth = () => {
    switch (showStep) {
      case 0:
        return <Login />;
      case 1:
        return <Register setShowStep={setShowStep} />;
      default:
        return <div />;
    }
  };

  return (
    <div className="grid h-full grid-cols-1 gap-5 md:grid-cols-1 xl:grid-cols-2">
      <div className="p-5 md:p-10">
        <h4 className="text-xl font-bold text-secondary">
          {showStep === 1
            ? 'Sign up'
            : showStep === 0
              ? 'Login'
              : showStep === 2
                ? 'Forgot Password'
                : ''}
        </h4>
        <p className="my-2 pb-3 text-sm text-black">
          Use your email or another service to continue with AgroFresh Connect.
        </p>
        {renderAuth()}

        <div className="my-3 flex items-center gap-2">
          {showStep === 0 ? (
            <>
              <p className="text-sm">Are you new to Salon Hub? </p>
              <button
                className="text-text-color cursor-pointer text-sm font-semibold"
                type="button"
                aria-label="go to the login"
                onClick={() => setShowStep(1)}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <p className="text-sm">Already have an account</p>
              <button
                className="text-text-color cursor-pointer text-sm font-semibold"
                aria-label="navigate to register"
                onClick={() => {
                  dispatch(userLogout());
                  setShowStep(0);
                }}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
      <div className="hidden h-full sm:hidden md:hidden xl:block">
        <img
          src="/login.jpg"
          alt="login-banner"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
