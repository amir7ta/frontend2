import React, { useState, useEffect } from "react";
import { selectProductDetail } from '../../store/reducers/productSlice';
import { useSelector } from 'react-redux';
import { formatPrice } from "../../utils/hooks/useUtil";

const SpecificationPanel  = ({product, onSelectedSizeChange}) => {
  const productDetail = useSelector(selectProductDetail);
  const [selectedSize, setSelectedSize] = useState(null);
  const [defaultSize, setDefaultSize] = useState(null);

  const [cart, setCart] = React.useState([]);

  const addToCart = () => {
    setCart([...cart, product]);
  };

  const handleSelectedSizeChange = (selectedSize) => {
    setSelectedSize(selectedSize);
    onSelectedSizeChange(selectedSize)
  };

  useEffect(() => {
    if (productDetail) {
      setDefaultSize(
        productDetail.sizes.findIndex((size) => size.price === productDetail.defaultPrice)
      );
    }
  }, [productDetail]);

  return (

    <div className="product-Detail-Specification-container">
                        <div className="product-detail-title-line"></div>

       <div className="product-Detail-Specification-rating-section">
                    <span className="product-Detail-Specification-rating">4.3</span>
                    <span className="review-count">(25 امتیاز از خریداران)</span>
                    <div className="recommendation">86% (10 نفر) از خریداران، این کالا را پیشنهاد کرده‌اند</div>

        </div>
      <div className="size-section">
        <div className="size-select-container">
                <label htmlFor="size-select">سایز :</label>
                <select
                  id="size-select"
                  value={
                    selectedSize
                      ? JSON.stringify(selectedSize)
                      : JSON.stringify(productDetail.sizes[defaultSize])
                  }
                  onChange={(e) => handleSelectedSizeChange(JSON.parse(e.target.value))}
                >
                  {productDetail.sizes
                    .slice()
                    .sort((a, b) => a.size - b.size)
                    .map((size, index) => (
                      <option key={index} value={JSON.stringify(size)}>
                        {size.size} - قیمت {formatPrice(size.price)}{" "}
                        {size.quantity <= 3 ? `(فقط ${size.quantity} عدد موجود در انبار)` : ""}
                      </option>
                    ))}
                </select>
              </div>
      </div>
      <div className="features">
        <div className="feature-item">
          <span className="feature-title">طرح:</span>
          <span className="feature-value">ساده</span>
        </div>
        <div className="feature-item">
          <span className="feature-title">الیاف نخ</span>
        </div>
        <div className="feature-item">
          <span className="feature-title">فرم شورت و لباس پایین‌تنه:</span>
          <span className="feature-value">اسلیپ</span>
        </div>
      </div>
      <div className="size-feedback">خریداران درباره این محصول چه گفته‌اند؟</div>
    </div>
  );
}

export default SpecificationPanel;