import React from 'react';
import { Link } from 'react-router-dom';
import { icons } from '../../assets/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWishlist } from '../../utils/hooks/useWishlist';
import  FormatPrice  from '../FormatPrice/FormatPrice';
import { truncateString } from '../../utils/hooks/useUtil';

function ProductCard({ product, index }) {
  const { wishlistItems, toggleWishlistItem } = useWishlist();
  const itemExists = wishlistItems.find((item) => item.productId === product.productId);
  const productSlug = product.name;
  const encodedSlug = encodeURIComponent(productSlug.replace(/\s+/g, "-"));
  

  return (
    <Link to={`/product/${product.productId}/${encodedSlug}`}>
      <div className="product-card" key={index}>
        <FontAwesomeIcon
          icon={itemExists ? icons.heartFull : icons.heart}
          onClick={() => toggleWishlistItem(product)}
        />
        <div className="product-img">
          <img src={product.mainImage} alt={product.description } />
        </div>
        <div className="product-info">
          <p style={{fontSize:'13px'}}>{truncateString(product.description,60)}</p>

          {product.inStock ? (
                <div>
                  <FormatPrice
                    defaultPrice={product.defaultPrice}
                    discountPercent={product.discountedPercent}
                  ></FormatPrice>
                </div>
          ) : (
            <p style={{ color: "#ff0000" }}>موجود نیست</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
