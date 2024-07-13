import React from 'react';
import { Link } from 'react-router-dom';

const BottomMenu = () => {
  return (
    <div className="bottom-nav">
      <Link to="/">
        <div className="bottom-nav-item">
          <svg
            style={{
              width: "24px",
              height: "24px",
              fill: "var(--color-icon-low-emphasis)",
            }}
          >
            <use xlinkHref="#home1Fill"></use>
          </svg>
          <p>خانه</p>
        </div>
      </Link>
      <Link to="/categories">
        <div className="bottom-nav-item">
          <svg
            style={{
              width: "24px",
              height: "24px",
              fill: "var(--color-icon-low-emphasis)",
            }}
          >
            <use xlinkHref="#categoryOutline"></use>
          </svg>
          <p>دسته‌بندی</p>
        </div>
      </Link>

      <Link to="/checkout">
        <div className="bottom-nav-item">
          <svg
            style={{
              width: "24px",
              height: "24px",
              fill: "var(--color-icon-low-emphasis)",
            }}
          >
            <use xlinkHref="#cartOff"></use>
          </svg>
          <p>سبد خرید</p>
        </div>
      </Link>

      <Link to="/account">
        <div className="bottom-nav-item">
          <svg
            style={{
              width: "24px",
              height: "24px",
              fill: "var(--color-icon-low-emphasis)",
            }}
          >
            <use xlinkHref="#profileOff"></use>
          </svg>
          <p>حساب کاربری</p>
        </div>
      </Link>
    </div>
  );
};

export default BottomMenu;
