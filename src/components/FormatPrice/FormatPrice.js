import React, { useEffect, useState } from 'react'
import { formatPrice,NumberInPersian } from '../../utils/hooks/useUtil';


function FormatPrice(params) {
const {defaultPrice, discountPercent } = params
const [price, setPrice] = useState(0)
// useEffect(()=>{
//   if(discountPercent && discountPercent>0)
//       setPrice(defaultPrice - ((defaultPrice /100) * discountPercent))
//     else
//       setPrice(defaultPrice)
// },[discountPercent])
  return (
    <>
      <div className="price-container">
        <div className="price-info">
          {(discountPercent &&
            discountPercent > 0) ?
            (
                <p className="percent">{NumberInPersian(discountPercent)}%</p>
              ):<p className=""></p>
           }
          <span className="original-price">
          {NumberInPersian(formatPrice(Math.round(defaultPrice - (defaultPrice/100 *discountPercent ))))}

            <svg className="toman-icon">
              <use xlinkHref="#toman"></use>
            </svg>
          </span>
        </div>
      </div>
      {(discountPercent &&
        discountPercent > 0) ?
        (
            <div className="discount-price-info">
              <span className="discount-price">
              {NumberInPersian(formatPrice(defaultPrice))}
                <svg className="toman-icon" style={{ color: "#a3a3a3" }}>
                  <use xlinkHref="#toman"></use>
                </svg>
              </span>
            </div>
          ):''}
    </>
  );
}

export default FormatPrice