import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

function SuccessMessage() {
  const [show, setShow] = useState(true);
  const animation = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(-100%)',
  });

  return (
      <div className="success-message">
        <span role="img" aria-label="success"></span> نظر شما با موفقیت ثبت شد
      </div>

  );
}

export default SuccessMessage;