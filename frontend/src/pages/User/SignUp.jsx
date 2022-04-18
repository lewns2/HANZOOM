import { SignUpForm } from '../../components/User/SignUp/SignUpForm';

import './SignUp.scss';

export const SignUp = () => {
  return (
    <>
      <section className="signUpWrap d-flex justify-content-center">
        <div className="formWrap">
          <SignUpForm />
        </div>
      </section>
    </>
  );
};
