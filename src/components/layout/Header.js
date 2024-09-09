import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../../assets/icons/icons';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../utils/hooks/useCart';
import { useWishlist } from '../../utils/hooks/useWishlist';
import { searchProducts} from '../../store/reducers/productSlice';
import { useCard } from '../common/CardContext';

import MegaMenu from './MegaMenu';

function Header() {



  const location = useLocation();
  const { quantity } = useCart();
  const { wishlistCount } = useWishlist();
  const dispatch = useDispatch();
  const cardRef = useCard();

  const isHome = location.pathname === '/';
  const isShop = location.pathname === '/shop';
  const isProduct = location.pathname.substring(0,8) === '/product';

  const handleSearchChange = (e) =>  {
    dispatch(searchProducts(e.target.value))
  }

  return (
    <nav className="nav-container">
      <div className="header-first-container">
      
          <div className="header-first">
            <img className='header-first-logo'
              src="/images/site/logo.svg"
              width="115"
              height="30"
              alt="لوگوی دیجیکالا"
              title=""
            ></img>

            <div className={`header-first-search active`}>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="search"
                  placeholder="جستجو"
                  name="search"
                  onChange={handleSearchChange}
                />
                <FontAwesomeIcon icon={icons.search} style={{position: "absolute", transform: "translateX(-10%)"}}></FontAwesomeIcon>
              </div>
              
            
            </div>
            
          </div>
          <div className="product-first-header-tools">
                                    <Link  to="/cart">
                                      <div className="svg-icon">
                                          <svg style={{width: '24px', height: '24px', fill: 'var(--color-icon-high-emphasis)'}}>
                                            <use xlinkHref="#cartOff"></use>
                                          </svg>
                                          {quantity > 0 && <span>{quantity > 9 ? "9+" : quantity} </span>}
                                      </div>
                                    </Link>
                                    <Link  to="/wishlist">
                                          <div className="svg-icon">
                                          <svg style={{width: '24px', height: '24px', fill: 'var(--color-icon-high-emphasis)'}}>
                                                <use xlinkHref="#favoriteOff"></use>
                                            </svg>
                                            {wishlistCount > 0 && (
                                                <span>{wishlistCount > 9 ? "9+" : wishlistCount} </span>
                                              )}
                                          </div>
                                    </Link>
                                    <Link to="/account">
                                    <div className="svg-icon">
                                    <svg style={{width: '24px', height: '24px', fill: 'var(--color-icon-high-emphasis)'}}>
                                          <use xlinkHref="#profileOff"></use>
                                      </svg>
                                    </div>
                                    </Link>

                                    <div className="header-second-tools header">
            
          </div>
          </div>
      </div>
      <div className={`header-second-container`}>
        <div className={`header-second `}>
          {/* <Link className="header-main header-section" to="/"><h1>داروخانه وکیلی</h1></Link> */}
          <div className="header-second-menu">
              <MegaMenu />
          </div>
        </div>
      </div>
      {/* <div className={`header-line ${isHome || isShop ? "active" : ""}`}></div> */}
    </nav>
  );
}

export default Header