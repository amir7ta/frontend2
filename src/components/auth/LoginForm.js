import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { icons } from '../../assets/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useToggle from '../../utils/hooks/useUtil';
import { useUser } from '../../utils/hooks/useUser';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (loginData) => {
    const user = await login(loginData);
    if (user && location.pathname === '/authentication') {
      navigate('/account');
    }
  };

  return (
    <div className='login'>
      <h1>ورود</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='input-label'>
          ایمیل
          <div className='input-wrapper'>
            <FontAwesomeIcon icon={icons.email}></FontAwesomeIcon>
            <input type="text" {...register("email", { required: true })} />
          </div>
        </label>
        {errors.email && <span>نام کاربری را وارد کنید</span>}
        <label className='input-label'>
          کلمه عبور
          <div className='input-wrapper'>
            <FontAwesomeIcon icon={icons.lock}></FontAwesomeIcon>
            <input type="password" {...register("password", { required: true })} />
          </div>
        </label>
        {errors.password && <span>کلمه عبور را وارد کنید</span>}
        <button type="submit">ورود</button>
      </form>
    </div>
  )
}

export default Login;
