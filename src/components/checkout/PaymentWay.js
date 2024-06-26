import React, { useState } from 'react';
import { usePayment} from '../../utils/hooks/usePayment';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

function Payment() {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('لطفا درگاه پرداخت را انتخاب نمایید.');
  const { setBankName} = usePayment();
  const [bankState, setBankState] = React.useState('');


  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setBankName(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleChange = e => {
    const { value } = e.target;
    setBankState(value);
    setBankName(value);
  };

  return (
    <div className='checkout-payment'>
      <h1>نحوه پرداخت</h1>
      <div className="line-divider"></div>
      
      <div className="payment-option">
        
        <label>
          <input name="bankName" type="radio" value="ZIBAL" onChange={e=>handleChange(e)} checked={bankState === "ZIBAL"} />
          درگاه پرداخت &#40; زیبال&#41;
        </label>  
      </div>

      <div className="payment-option">
        <label>
          <input name="bankName" type="radio" value="ZARINPAL" onChange={handleChange} checked={bankState === "ZARINPAL"}/>
          درگاه پرداخت &#40; زرین پال&#41;
        </label>  
      </div>
   
      {/* <p>شما به درگاه بانکی هدایت می شوید.</p> */}



        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="ZIBAL" control={<Radio />} label="درگاه پرداخت زیبال" />
          <FormControlLabel value="ZARINPAL" control={<Radio />} label="درگاه پرداخت زرین پال" />

        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>

    </div>
  )
}

export default Payment;
