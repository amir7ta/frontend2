import React, { useState, useEffect ,useRef } from "react";
import { selectProductDetail } from '../../store/reducers/productSlice';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ImageGallerySlider = ({ callBackGalleryModalClose, callBackImageClick }) => {
  const [mainImage, setMainImage] = useState("");
  const productDetail = useSelector(selectProductDetail);
  const thumbnailsRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (productDetail?.mainImage) {
      let img = productDetail.images.filter((img)=>img.path ==productDetail.mainImage)
      setMainImage(img[0]);
    }
  }, [productDetail]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
    callBackImageClick(image.path);
  };

  useEffect(() => {
    const thumbnailsElement = thumbnailsRef.current;

    if (thumbnailsElement) {
      const onWheel = (e) => {
        e.preventDefault();
        thumbnailsElement.scrollLeft += e.deltaY;
      };

      thumbnailsElement.addEventListener('wheel', onWheel);

      return () => {
        thumbnailsElement.removeEventListener('wheel', onWheel);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.slideTo(direction === "left" ? swiper.activeIndex - 1 : swiper.activeIndex + 1);
    }
  };
  return (
    <div className="image-gallery-modal-overlay">
      <button className="image-gallery-close-modal-btn" onClick={callBackGalleryModalClose}>×</button>
      <div className="image-gallery-modal-content">
        <div className="image-gallery-modal-image">
         {mainImage&&(<img src={`${process.env.PUBLIC_URL}${mainImage.path}`} alt="Product" />)} 
        </div>
        <div className="image-gallery-modal-thumbnails-container">

       
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          slidesPerView={'auto'}
          className="image-gallery-modal-thumbnails"
          freeMode={true}
          grabCursor={true}
        >
                <div ref={thumbnailsRef} className="modal-image-gallery-thumbnails-img ">
            
          {productDetail.images.map((image, index) => (
            <SwiperSlide key={index} style={{ width: '100px', height: '100px' }}>
              <div className={`modal-image-item  ${
                  mainImage.productImageId === image.productImageId ? "selected" : ""
                }`}>
             <img
                key={index}
                className={`modal-image-gallery-thumbnails-img`}
                src={image.path}
                alt={`Modal Thumbnail ${index}`}
                onClick={() => handleThumbnailClick(image)}
              />
              </div>
            </SwiperSlide>
          ))}
                </div>

        </Swiper>
       
          </div>
      </div>
    </div>
  );
};

export default ImageGallerySlider;
