import { SignUpForm } from '../../components/User/SignUp/SignUpForm';

import './UserForm.scss';

export const SignUp = () => {
  return (
    <>
      <section className="userFormWrap d-flex justify-content-center">
        <div className="formWrap">
          <SignUpForm />
        </div>
      </section>
    </>
  );
};
