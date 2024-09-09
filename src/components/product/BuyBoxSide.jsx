import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectProductDetail } from '../../store/reducers/productSlice';
import { useWishlist } from "../../utils/hooks/useWishlist";
import { NumberInPersian, formatPrice } from "../../utils/hooks/useUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons/icons";
import FormatPrice from "../FormatPrice/FormatPrice";
import { useCart } from "../../utils/hooks/useCart"; // فرض بر این است که شما از این هوک استفاده می‌کنید

const BuyBoxSide = ({ addItemCallBack, selectedProductSizeId }) => {
  const productDetail = useSelector(selectProductDetail);
  const { wishlistItems, toggleWishlistItem } = useWishlist();
  const { items, addToCart, removeFromCart, isInCart, updateQuantity } = useCart(); // اضافه کردن هوک سبد خرید
  const itemExists = wishlistItems.find(
    (item) => item?.productId === productDetail?.productId
  );
  const [currentItem, setCurrentItem] = useState(null);

  const size = productDetail.sizes.find(size => size.productSizeId === selectedProductSizeId);
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    if (productDetail && size) {
      const itemInCartResult = isInCart(productDetail.productId, size.productSizeId); // استفاده از isInCart برای بررسی وضعیت محصول
      setIsProductInCart(itemInCartResult);
    }
  }, [productDetail, selectedProductSizeId, isInCart]);

  useEffect(() => {
    if (productDetail && size!=null) {
      const foundItem = items.find(item => item.productSizeId === size.productSizeId); // جستجو در items بر اساس productSizeId
      setCurrentItem(foundItem);
    }
  }, [productDetail, selectedProductSizeId, items]);
  

  useEffect(()=>{
    if(!size) return;
    setIsProductInCart(isInCart(productDetail.productId,size.productSizeId));
  },[productDetail,size])

  const handleAddToCart = () => {
    addItemCallBack();
    setIsProductInCart(true)
  };

  const handleRemoveFromCart = () => {
    removeFromCart(productDetail.productId, size.productSizeId); // حذف محصول از سبد خرید
    setIsProductInCart(false)
  };

  const handleQuantityChange = (delta) => {
    updateQuantity( productDetail.productId, size.productSizeId, currentItem?.quantity+delta); // تغییر مقدار محصول در سبد خرید
  };

  return (
    <div className="product-Detail-buyBoxSide-container">
      <h2>{productDetail.name}</h2>

      {productDetail.inStock && (
        <div className="product-price">
          {selectedProductSizeId!=null? (
            <FormatPrice
              defaultPrice={size.price}
              discountPercent={productDetail.discountedPercent}
            />
          ) : (
            <FormatPrice
              defaultPrice={productDetail.defaultPrice}
              discountPercent={productDetail.discountedPercent}
            />
          )}
        </div>
      )}

      <div className="divider">
        {isProductInCart ? (
          <div className="cart-controls">
            <button 
                className='cart-controls-button'
                onClick={() => handleQuantityChange(1)}>+</button>
            <button
               className='cart-controls-quantity'
              >{NumberInPersian(currentItem?.quantity || 0)}</button>
            {currentItem?.quantity > 1 ? (
              <button className='cart-controls-button'  onClick={() => handleQuantityChange(-1)}>-</button>
            ) : (
              <button
              className='cart-controls-button'
              onClick={handleRemoveFromCart}>
                <svg
                  style={{
                    width: "18px",
                    height: "18px",
                    fill: "var(--color-icon-primary)",
                  }}
                >
                  <use xlinkHref="#delete"></use>
                </svg>
              </button>
            )}
          </div>
        ) : (
          <button
            id="btn-add-to-card"
            className={`product-detail-BuyBoxSide-button ${
              !productDetail.inStock ? "disabled" : ""
            }`}
            onClick={() => {
              if (productDetail.inStock) {
                handleAddToCart();
              }
            }}
            disabled={!productDetail.inStock} // غیر فعال کردن دکمه
          >
            {productDetail.inStock ? "افزودن به سبد خرید" : "نا موجود"}
          </button>
        )}

        <button
          className="product-detail-BuyBoxSide-second-button"
          onClick={() => toggleWishlistItem(productDetail)}
        >
          <FontAwesomeIcon icon={itemExists ? icons.heartFull : icons.heart} />
        </button>
      </div>

      <p className="product-description">{productDetail.description}</p>
    </div>
  );
}

export default BuyBoxSide;
