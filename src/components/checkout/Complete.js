import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../../assets/icons/icons'
import { useUser} from "../../utils/hooks/useUser"
import { Link, useSearchParams } from 'react-router-dom';
import { usePayment} from '../../utils/hooks/usePayment';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { formatPrice, NumberInPersian } from '../../utils/hooks/useUtil';

function Complete({doPaymentCallback, paymentFinishedEvent}) {
  const { currentUser } = useUser();
  let [searchParams, setSearchParams] = useSearchParams();
  let [status, setStatus] = useState(
    searchParams.get("Status")
  );
  let [zibalStatus, setZibalStatus] = useState(
    searchParams.get("status")
  );
  let [authority, setAuthority] = useState(
    searchParams.get("Authority")
  );
  let [trackId, setTrackId] = useState(
    searchParams.get("trackId")
  );
  let [success, setSuccess] = useState(
    searchParams.get("success")
  );

  const { verify, authorityCode, paymentId, bankName ,paymentNotSuccess} = usePayment();
  let [verificationResult, setVerificationResult] = useState(-1)
  let [refId, setRefId] = useState(null)
  useEffect(() => {
    if(trackId){
      DoZibalVerify()
    }
    else{
      if(status)  
        DoZarinPalVerify();
    }
  
  }, [status]);

  const DoZarinPalVerify = async () => {
    if(status == "OK")
    {
      let userId = currentUser.userID;
      var res = await verify({status, authority, bankName})
      if (res && res.refId) {
        setRefId(res.refId)
        setVerificationResult(1);
        paymentFinishedEvent();

      }
    }
    else{
      var res = await paymentNotSuccess({paymentId, bankName})
      setVerificationResult(0)
    }
  };
  const DoZibalVerify = async () => {
    if(success =="1")
    {
      let userId = currentUser.userID;
      var res = await verify({status, trackId, bankName})
      if (res && res.refId) {
        setRefId(res.refId)
        setVerificationResult(1);
        paymentFinishedEvent(true);

      }
    }
    else{
      var res = await paymentNotSuccess({paymentId,"status":zibalStatus, "resultCode":trackId, bankName})
      setVerificationResult(0);
      paymentFinishedEvent(false);

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
             <h1 className='not-success-pay'>متاسفانه پرداخت شما ناموفق بود!</h1>
             <p>شماره پیگیری: {NumberInPersian(trackId)} </p>
          {/* <LoadingButton
                size="large"
                style={{margin:'2rem'}}
                onClick={doPaymentCallback}
                // endIcon={<FontAwesomeIcon icon={icons.creditCard} />}
                startIcon={<FontAwesomeIcon icon={icons.creditCard} />}
                loadingPosition="end"
                variant="contained"
              >
            <span>پرداخت دوباره</span>
          </LoadingButton> */}
          <p style={{padding:'15px'}}>
          چنانچه مبلغی از حساب شما کسر شده است، تا ۷۲ ساعت آینده به حساب شما باز خواهد گشت.</p>

         </div>
     }
    {verificationResult===1 &&
         <div className='complete-success'>
             <FontAwesomeIcon icon={icons.check} alt="" />
             <h1>پرداخت شما با موفقیت ثبت شد.</h1>
             <p>شماره پیگیری تراکنش: {refId} </p>
             <p>کارشناسان ما براساس نوبت و زمان نهایی شدن پرداخت شما، اقدامات لازم برای ارسال و تحویل به موقع کالا را انجام خواهند داد.</p>
             <p>{currentUser.firstName} عزیز از خریدتان متشکریم</p>
             <Link to="/"><button>خرید دوباره</button></Link>
         </div>
     }
    </>
  )
}

export default Complete