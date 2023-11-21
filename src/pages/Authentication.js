import React, { useState } from 'react';
import Register from "../components/auth/RegisterForm";
import Login from "../components/auth/LoginForm";
import SignUp from "../components/auth/SignUpForm";

function Authentication() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className='auth container'>
      <div className='auth-container'>
        {activeTab === 'login' && <Login />}
        {/* {activeTab === 'signup' && <Register />} */}
        {activeTab === 'signup' && <SignUp/>}

      </div>
      <div>
        <a
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}>
          عضو هستید؟
        </a>
        <a
          className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => setActiveTab('signup')}>
          هنوز عضو نیستید؟
        </a>
      </div>
    </div>
  );
}

export default Authentication;
