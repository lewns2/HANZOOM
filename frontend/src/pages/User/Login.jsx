import { LoginForm } from '../../components/User/Login/LoginForm';

import './UserForm.scss';

export const Login = () => {
  return (
    <section className="userFormWrap d-flex justify-content-center">
      <div className="formWrap">
        <LoginForm />
      </div>
    </section>
  );
};
