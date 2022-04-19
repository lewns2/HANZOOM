import { LoginForm } from '../../components/User/Login/LoginForm';

import './Login.scss';

export const Login = () => {
  return (
    <>
      <section className="loginWrap d-flex justify-content-center">
        <div className="formWrap">
          <LoginForm />
        </div>
      </section>
    </>
  );
};
