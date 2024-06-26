import React, { useState, useEffect } from "react";
import { selectProductDetail } from '../../store/reducers/productSlice';
import { useSelector } from 'react-redux';
import { useWishlist } from "../../utils/hooks/useWishlist";
import { formatPrice } from "../../utils/hooks/useUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons/icons";
const BuyBoxSide  = ({addItemCallBack , selectedSize}) => {
  const productDetail = useSelector(selectProductDetail);
  const { wishlistItems, toggleWishlistItem } = useWishlist();
  const itemExists = wishlistItems.find(
    (item) => item?.productId === productDetail?.productId
  );
  const [cart, setCart] = React.useState([]);

 
  return (
    <>
    <div className="product-Detail-buyBoxSide-container">
    <h2>{productDetail.brand}</h2>
              <h1>{productDetail.name}</h1>
              <p className="product-price">
              {selectedSize
                      ? formatPrice(selectedSize.price)
                      : formatPrice(productDetail.defaultPrice)}
              </p>
              <div className="divider">
                <button
                  id="btn-add-to-card"
                  className="product-detail-BuyBoxSide-button"
                  onClick={(e) => addItemCallBack(e)}
                >
                  افزودن به سبد خرید
                </button>
                <button
                      className="product-detail-BuyBoxSide-second-button"
                      onClick={() => toggleWishlistItem(productDetail)}
                    >
                      <FontAwesomeIcon
                        icon={itemExists ? icons.heartFull : icons.heart}
                      />
                </button>


              </div>
              <p className="product-description">{productDetail.description}</p>
      </div>
    </>
  );
}

export default BuyBoxSide;