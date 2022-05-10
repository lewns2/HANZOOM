import { FindPasswordForm } from '../../components/User/FindPassword/FindPasswordForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBeforeLogin } from '../../Reducer/userSlice';
import './UserForm.scss';

export const FindPassword = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBeforeLogin(true));
    return () => {
      dispatch(setBeforeLogin(false));
    };
  }, []);

  return (
    <section className="userFormWrap d-flex justify-content-center">
      <div className="formWrap">
        <FindPasswordForm />
      </div>
    </section>
  );
};
