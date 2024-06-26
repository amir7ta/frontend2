import React, { useState, useEffect } from "react";
import { selectProductDetail } from '../../store/reducers/productSlice';
import { useSelector } from 'react-redux';
import { useWishlist } from "../../utils/hooks/useWishlist";
import { formatPrice } from "../../utils/hooks/useUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons/icons";
const BuyBoxBottom  =  ({addItemCallBack, selectedSize})  => {
  const productDetail = useSelector(selectProductDetail);
  const { wishlistItems, toggleWishlistItem } = useWishlist();
  const itemExists = wishlistItems.find(
    (item) => item?.productId === productDetail?.productId
  );


  return (
    <>
      <div className="product-Detail-buyBoxBottom-container">
        <div style={{display:"flex"}}>
                    <button
                      id="btn-add-to-card"
                      className="product-Detail-buyBoxBottom-button"
                      onClick={(e) => addItemCallBack(e)}
                    >
                      افزودن به سبد خرید
                    </button>
                    <button
                      className="product-Detail-buyBoxBottom-second-button"
                      onClick={() => toggleWishlistItem(productDetail)}
                    >
                      <FontAwesomeIcon
                        icon={itemExists ? icons.heartFull : icons.heart}
                      />
                    </button>
          </div>
                    <div>
                      <p className="product-price">
                        {selectedSize
                          ? formatPrice(selectedSize.price)
                          : formatPrice(productDetail.defaultPrice)}
                      </p>
                    </div>
      </div>
    </>
  )};

export default BuyBoxBottom;