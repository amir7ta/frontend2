import React, { useEffect, useState } from 'react';
import ProductCard from '../product/ProductItem';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// استفاده از ماژول‌های Swiper
const AmazingOffersSlider = ({ products }) => {
  const [isMobile, setIsMobile] = useState(true)
  const handleResize = debounce(() => {     // 200 میلی‌ثانیه زمان debounce

    const isCurrentlyMobile = window.innerWidth < 1023;
    setIsMobile(isCurrentlyMobile);
  }, 300);
  useEffect(() => {
    handleResize();
    // اضافه کردن رویداد resize به window
    window.addEventListener("resize", handleResize);
    // حذف رویداد resize و لغو debounce در هنگام unmount شدن کامپوننت
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel(); // لغو زمانبندی debounce
    };
  }, []);
  const settings = {
    slidesPerView: 6,
    spaceBetween: 5,
    breakpoints: {
      1301: {
        slidesPerView: 6,
        spaceBetween: 5,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      1100: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      1: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
    },
  };

  return (
    <div className="amazing-offers-slider">
      {isMobile && (
        <div className="amazing-link-container">
          <div style={{ display: "flex" }}>
              <img style={{width:'180px'}} src="/images/site/incredible-word.svg" alt="Discount" />
          </div>
          <div>
          <Link className="link-text" to="/amazing-offers"> مشاهده همه &gt;
           </Link>
          </div>
        </div>
      )}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        {...settings}
        //pagination={{ type: "bullets" }}
        //navigation={{ prevEl: ".swiper-prev", nextEl: ".swiper-next" }}
        navigation={true} // فعالسازی دکمه‌های ناوبری
        //pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        //autoplay={{ delay: 3000 }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("اسلاید تغییر کرد")}
      >
        {!isMobile && (
          <SwiperSlide>
            <div className="fixed-slide">
              <img src="/images/site/amazings.svg" alt="Discount" />
              <div className="slide-text">
                {/* <h2>تخفیف ویژه!</h2> */}
                <p>از تخفیف‌های ویژه ما استفاده کنید!</p>
                <Link className="link-text" to="/amazing-offers">
                  مشاهده همه &gt;
                </Link>
              </div>
            </div>
          </SwiperSlide>
        )}

        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
         {isMobile && (
          <SwiperSlide>
            <div className="fixed-last-slide">
                <Link className="centered-link" to="/amazing-offers">
                        <p>از تخفیف‌های ویژه ما استفاده کنید!</p>
                        در اینجا!
                </Link>

            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default AmazingOffersSlider;
