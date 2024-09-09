import React, { useState, useEffect, useMemo } from "react";
import { selectProductDetail } from '../../store/reducers/productSlice';
import { formatPrice } from "../../utils/hooks/useUtil";
import { selectComments } from '../../store/reducers/commentSlice';
import { useDispatch, useSelector } from 'react-redux';

const getRandomSpecifications = (specifications, count) => {

  // استفاده از تابع برای تولید عدد رندوم بین 3 و 6
  const shuffled = [...specifications].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const SpecificationPanel  = ({product, onSelectedSizeChange}) => {
  const productDetail = useSelector(selectProductDetail);
  const specificationsCount = productDetail.specifications.length>6 ?6:productDetail.specifications.length;

  const randomSpecs = useMemo(() => getRandomSpecifications(productDetail.specifications, specificationsCount), [productDetail.specifications]);

  const [selectedSize, setSelectedSize] = useState(null);
  const comments = useSelector(selectComments);
  const [rating, setRating] = useState(5);
  const [userCount, setUserCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if(comments && comments.productRating && comments.productRating>0) 
     { setRating(comments.productRating)
      setUserCount(comments.comments.length)
    }
     else
     {   setRating(-1)}
  }, [comments,dispatch]);

  const handleSelectedSizeChange = (selectedSize) => {
    setSelectedSize(selectedSize);
    onSelectedSizeChange(selectedSize)
  };



  return (

    <div className="product-Detail-Specification-container">
                        <div className="product-detail-title-line"></div>

       <div className="product-Detail-Specification-rating-section">
        { rating>0 &&(<> <span className="product-Detail-Specification-rating">{rating}</span>
                    <span className="review-count">({userCount} امتیاز از خریداران)</span> </>
        )}
                    {/* <div className="recommendation">86% (10 نفر) از خریداران، این کالا را پیشنهاد کرده‌اند</div> */}

        </div>
      <div className="size-section">
        <div className="size-select-container">
                <label htmlFor="size-select">سایز :</label>
                <select
                  id="size-select"
                  value={
                    selectedSize
                      ? JSON.stringify(selectedSize)
                      : JSON.stringify(productDetail.defaultSize)
                  }
                  onChange={(e) => handleSelectedSizeChange(JSON.parse(e.target.value))}
                >
                  {productDetail.sizes
                    .slice()
                    .sort((a, b) => a.size - b.size)
                    .map((size, index) => (
                      <option key={size.productSizeId} value={JSON.stringify(size)}>
                        {size.size} - قیمت {formatPrice(size.price)}{" "}
                        {size.quantity <= 3 ? `(فقط ${size.quantity} عدد موجود در انبار)` : ""}
                      </option>
                    ))}
                </select>
              </div>
      </div>
      <div className="horizontal-specs">
        {randomSpecs && randomSpecs.map((spec, index) => (
          <div key={index} className="spec-box">
            <div className="spec-box-feature-title">{spec.name.trim()}</div>
            <div className="spec-box-feature-value">{spec.amount.trim()}</div>
          </div>
        ))}
      </div>

      <div className="size-feedback">خریداران درباره این محصول چه گفته‌اند؟</div>
    </div>
  );
}

export default SpecificationPanel;