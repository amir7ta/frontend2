import React from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../utils/hooks/useCart';
import { NumberInPersian, formatPrice } from '../../utils/hooks/useUtil';


function CartItem() {
  const { removeFromCart, updateQuantity, addToCart, items } = useCart();
 
  const handleRemoveFromCart = (productId, productSizeId) => {
    removeFromCart(productId, productSizeId); // حذف محصول از سبد خرید
  };

  const handleQuantityChange = (productId, productSizeId,delta) => {
    updateQuantity( productId, productSizeId, delta); // تغییر مقدار محصول در سبد خرید
  };


  return (
    <>
      {items.map((item) => (
        <div
          className="cart-item"
          key={`${item.product.productId}-${item.size}`}
        >
          <Link
            target="_blank"
            to={`/product/${item.product.productId}/${encodeURIComponent(
              item.product.name.replace(/\s+/g, "-")
            )}`}
          >
            <div className="cart-item-img">
              <img src={item.product.mainImage} alt={item.product.brandName} />
            </div>
          </Link>

          <div className="cart-item-about">
            <div className="cart-item-left">
              <Link
                target="_blank"
                to={`/product/${item.product.productId}/${encodeURIComponent(
                  item.product.name.replace(/\s+/g, "-")
                )}`}
              >
                <p>
                  {item.product.brandName} {item.product.name}
                </p>
              </Link>
              <p>سایز {item.size}</p>
            </div>
            <div className="cart-item-right">
              <span className="cart-product-price">
                {NumberInPersian(formatPrice(item.price))}
                <svg className="toman-icon" style={{ color: "#a3a3a3" }}>
                  <use xlinkHref="#toman"></use>
                </svg>
              </span>

              <div className="cart-controls">
                <button
                  className="cart-controls-button"
                  onClick={() =>
                    handleQuantityChange(
                      item.product.productId,
                      item.productSizeId,
                      item.quantity + 1
                    )
                  }
                >
                  +
                </button>
                <button className="cart-controls-quantity">
                  {NumberInPersian(item?.quantity || 0)}
                </button>
                {item?.quantity > 1 ? (
                  <button
                    className="cart-controls-button"
                    onClick={() =>
                      handleQuantityChange(
                        item.product.productId,
                        item.productSizeId,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                ) : (
                  <button
                    className="cart-controls-button"
                    onClick={() =>
                      handleRemoveFromCart(
                        item.product.productId,
                        item.productSizeId
                      )
                    }
                  >
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
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CartItem;
