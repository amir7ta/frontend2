import React from 'react'
import { useUser} from "../../utils/hooks/useUser"
import Login from '../auth/LoginForm';

function Account() {
  const { currentUser } = useUser();

  return (
    <div>
      {currentUser ? (
      <div>
        <p>در حال حاضر شما بعنوان {currentUser.firstName} وارد شده اید.</p>
      </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}


export default Account