import { FindPasswordForm } from '../../components/User/FindPassword/FindPasswordForm';

import './UserForm.scss';

export const FindPassword = () => {
  return (
    <section className="userFormWrap d-flex justify-content-center">
      <div className="formWrap">
        <FindPasswordForm />
      </div>
    </section>
  );
};
