import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../../assets/icons/icons'
import { useUser} from "../../utils/hooks/useUser"
import { Link } from 'react-router-dom'
import userApi from '../../utils/api/userApi';

function Complete() {
  const { currentUser } = useUser();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const authority = params.get('authority');
  const status = params.get('status');
  useEffect(() => {
    const verify = async () => {
      const res = await userApi.getUsers();
      setData(users);
    };
    verify();
  }, [authority,status]);

  return (
    <div className='complete'>
        <FontAwesomeIcon icon={icons.check} alt="" />
        <h1>سفارش شما تایید شده است!</h1>
        <p> ممنون از خرید شما, {currentUser.firstName}.</p>
        <Link to="/"><button>خرید دوباره</button></Link>
    </div>
  )
}

export default Complete