import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../../assets/icons/icons';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../utils/hooks/useCart';
import { useWishlist } from '../../utils/hooks/useWishlist';
import { searchProducts} from '../../store/reducers/productSlice';

function Header({cardRef}) {
  const location = useLocation();
  const { quantity } = useCart();
  const { wishlistCount } = useWishlist();
  const dispatch = useDispatch();
  
  const isHome = location.pathname === '/';
  const isShop = location.pathname === '/shop';

  const handleSearchChange = (e) =>  {
    dispatch(searchProducts(e.target.value))
  }

  return (
    <nav>
      <div className='header-second'>
        <div className="header-second-msg">
          <p>پرداخت <span>امن</span> از طریق درگاه بانکی</p>
          <p><span>پیک رایگان</span> برای خرید های بیشتر از 500 هزار تومان</p>
          <p><span>100%</span> معتبر</p>
        </div>
      </div>
      <div className="header-container">
        {/* <Link className="header-main header-section" to="/"><h1>داروخانه وکیلی</h1></Link> */}
        <ul className='header-section'>
        <li><Link to="/shop">محصولات</Link></li>
          <li><Link to="/">تماس با ما</Link></li>
          <li><Link to="/">درباره ما</Link></li>
        </ul>
        <div className='header-tools header-section'>
          <Link to="/account">
            <div className="svg-icon">
              <FontAwesomeIcon icon={icons.user}/>
            </div>
          </Link>   
          <Link to="/wishlist">
            <div className="svg-icon">
              <FontAwesomeIcon icon={icons.heart} />
              {wishlistCount > 0 && <span>{wishlistCount > 9 ? "9+": wishlistCount } </span>}
            </div>
          </Link>    
          <Link to="/cart">
              <div id="cart" className='svg-icon' ref={cardRef}>
                <FontAwesomeIcon icon={icons.cart}/>
                {quantity > 0 && <span>{quantity > 9 ? "9+": quantity } </span>}
              </div>
            
          </Link>
          <div className='burger'><FontAwesomeIcon icon={icons.hamburger} /></div>
        </div>
      </div>
      <div className={`header-search ${isShop ? 'active' : ''}`}>
        <div className='input-wrapper'>
          <FontAwesomeIcon icon={icons.search}></FontAwesomeIcon>
          <input type="text" id="search" placeholder="Search..." name="search" onChange={handleSearchChange} />
        </div>
      </div>
      <div className={`header-line ${isHome || isShop? 'active' : ''}`}
></div>
    </nav>
  );
}

export default Header