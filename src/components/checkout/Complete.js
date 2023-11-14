import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../../assets/icons/icons'
import { useUser} from "../../utils/hooks/useUser"
import { Link, useSearchParams } from 'react-router-dom';
import { usePayment } from '../../utils/hooks/usePayment';

function Complete() {
  const { currentUser } = useUser();
  let [searchParams, setSearchParams] = useSearchParams();
  let [status, setStatus] = useState(
    searchParams.get("Status")
  );
  let [authority, setAuthority] = useState(
    searchParams.get("Authority")
  );
  const { verify} = usePayment();
  let [verificationResult, setVerificationResult] = useState(-1)
  let [refId, setRefId] = useState(null)
  useEffect(() => {
  if(status)  
  {
    if(status=="OK")
    {
      DoVerify();
    }
    else{
      setVerificationResult(0)
    }

  }
  }, [status]);

  const DoVerify = async () => {
    let userId = currentUser.userID;
    var res = await verify({status, authority})
    if (res && res.refId) {
      setRefId(res.refId)
      setVerificationResult(1);
    }
  };

  return (
    
    <>
    {verificationResult===-1 &&
        <div className='wating'>
            <FontAwesomeIcon icon={icons.question} className='fa-beat' alt="" />
            <h1>منتظر تایید سفارش شما از طریق بانک هستیم</h1>
            <p> از صبر شما متشکریم, {currentUser.firstName}.</p>
        </div>
    }
    {verificationResult===0 &&
         <div className='complete'>
             <FontAwesomeIcon icon={icons.notOk} alt="" />
             <h1>پرداخت ناموفق!</h1>
             <p>{currentUser.firstName} عزیز درصورت برداشت وجه از حساب شما، حداکثر تا 72 ساعت به وجه حساب شما باز می گردد.</p>
             <Link to="/"><button>خرید دوباره</button></Link>
         </div>
     }
    {verificationResult===1 &&
         <div className='complete'>
             <FontAwesomeIcon icon={icons.check} alt="" />
             <h1>پرداخت شما با موفقیت ثبت شد.</h1>
             <p>{refId} :شماره پیگیری تراکنش.</p>
             <p>کارشناسان ما براساس نوبت و زمان نهایی شدن پرداخت شما، اقدامات لازم برای ارسال و تحویل به موقع کالا را انجام خواهند داد.</p>
             <p>عزیز از خریدتان متشکریم {currentUser.firstName}</p>
             <Link to="/"><button>خرید دوباره</button></Link>
         </div>
     }
    </>
  )
}

export default Complete