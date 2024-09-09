import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectProductDetail } from '../../store/reducers/productSlice';
import { useSelector } from 'react-redux';

const SpecificationsTab = () => {
  const { id } = useParams();
  const [specifications, setSpecifications] = useState([]);
  const productDetail = useSelector(selectProductDetail);

  // useEffect(() => {
  //   fetch(`/api/products/${productDetail.productId}/specifications`)
  //     .then((response) => response.json())
  //     .then((data) => setSpecifications(data));
  // }, [productDetail]);

  return (
    <section id="specifications">
    <span className="relative">مشخصات</span>
<div className='styles_Title_line_red'></div>
      {productDetail.specifications && (
        <div className="specifications-grid">
          {productDetail.specifications.map((spec, index) => (
            <React.Fragment key={index}>
              <div className="feature-title">{spec.name.trim()}:</div>
              <div className="feature-value">{spec.amount.trim()}</div>
            </React.Fragment>
          ))}
        </div>
      )}
     
    </section>
  );
};

export default SpecificationsTab;