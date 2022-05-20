import { LoginForm } from '../../components/User/Login/LoginForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBeforeLogin } from '../../Reducer/userSlice';
import './UserForm.scss';

export const Login = () => {
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
        <LoginForm />
      </div>
    </section>
  );
};
