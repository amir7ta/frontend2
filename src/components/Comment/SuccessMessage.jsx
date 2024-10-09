import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

function SuccessMessage() {
  return (
    <div className="comment-modal-overlay">
    <div className="comment-modal">
    <div className="comment-modal-header"></div>
      <div className="success-message">
        <span role="img" aria-label="success"></span> نظر شما با موفقیت ثبت شد
      </div>
</div>
</div>
  );
}

export default SuccessMessage;