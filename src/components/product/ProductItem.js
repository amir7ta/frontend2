import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { icons } from '../../assets/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWishlist } from '../../utils/hooks/useWishlist';
import { formatPrice } from '../../utils/hooks/useUtil';

function ProductCard({product, index}) {
  const { wishlistItems, toggleWishlistItem } = useWishlist();
  const itemExists = wishlistItems.find((item) => item.productId === product.productId);
  
return (
  <>
  {/* {product.inStock && */}
        <div className='product-card' key={index}>   
            <FontAwesomeIcon
              icon={itemExists ? icons.heartFull : icons.heart}
              onClick={() => toggleWishlistItem(product)}
            />   
          <div className='product-img'>
              <Link to={`/${product.productId}`}>
                <img src={product.mainImage} alt="" />
              </Link>
          </div>
          <div className='product-info'>
            <Link to={`/${product.productId}`}>
              <p>{product.brand}</p>
              <h3>{product.name}</h3>
              <p> {formatPrice(product.defaultPrice)}</p>
            </Link>
          </div>
      </div>
  {/* } */}
  </>
);}

export default ProductCard;