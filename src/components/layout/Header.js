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
        {/* <div className="header-second-msg">
          <p>پرداخت <span>امن</span> از طریق درگاه بانکی</p>
          <p><span>پیک رایگان</span> برای خرید های بیشتر از 500 هزار تومان</p>
          <p><span>100%</span> معتبر</p>
        </div> */}
       { !isProduct &&
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
       }
       { isProduct &&
          
                <div className='product-first-header'>
                                  
                                <div className="product-first-header-back">
                                  <Link  to="/">
                                    <svg>
                                          <use xlinkHref="#arrowRight"></use>
                                    </svg>
                                    <img 
                                            src="../../images/site/logo.svg"
                                            width="100"
                                            height="25"
                                            alt="لوگوی داروخانه دکتر وکیلی"
                                            title=""
                                          ></img>
                                    </Link>
                                </div>
                                <div className="product-first-header-tools">
                                    <Link  to="/checkout">
                                      <div className="flex cursor-pointer ml-6">
                                          <svg style={{width: '24px', height: '24px', fill: 'var(--color-icon-high-emphasis)'}}>
                                            <use xlinkHref="#cartOff"></use>
                                          </svg>
                                      </div>
                                    </Link>
                                    <Link  to="/wishlist">
                                      <div className="z-1 whitespace-nowrap ml-6 lg:ml-4" data-cro-id="pdp-favorite">
                                          <div className="flex cursor-pointer cursor-pointer">
                                          <svg style={{width: '24px', height: '24px', fill: 'var(--color-icon-high-emphasis)'}}>
                                                <use xlinkHref="#favoriteOff"></use>
                                            </svg>
                                          </div>
                                      </div>
                                    </Link>
                                    <Link>
                                    <div className="flex cursor-pointer">
                                    <svg style={{width: '24px', height: '24px', fill: 'var(--color-icon-high-emphasis)'}}>
                                          <use xlinkHref="#moreVert"></use>
                                      </svg>
                                    </div>
                                    </Link>
                                </div>


          </div>
        }
      </div>
      <div className={`header-second-container`}>
        <div className={`header-second `}>
          {/* <Link className="header-main header-section" to="/"><h1>داروخانه وکیلی</h1></Link> */}
          <div className="header-second-menu">
              <MegaMenu />
          </div>
          <div className="header-second-tools header">
            <Link to="/account">
              <div className="svg-icon">
                <FontAwesomeIcon icon={icons.user} />
              </div>
            </Link>
            <Link to="/wishlist">
              <div className="svg-icon">
                <FontAwesomeIcon icon={icons.heart} />
                {wishlistCount > 0 && (
                  <span>{wishlistCount > 9 ? "9+" : wishlistCount} </span>
                )}
              </div>
            </Link>
            <Link to="/cart">
              <div id="cart" className="svg-icon" ref={cardRef}>
                <FontAwesomeIcon icon={icons.cart} />
                {quantity > 0 && <span>{quantity > 9 ? "9+" : quantity} </span>}
              </div>
            </Link>
           
          </div>
        </div>
      </div>
      {/* <div className={`header-line ${isHome || isShop ? "active" : ""}`}></div> */}
    </nav>
  );
}

export default Header