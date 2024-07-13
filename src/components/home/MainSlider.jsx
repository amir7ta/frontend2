import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from "../../components/common/LoadingModal";
import { selectSliders  , selectLoading, selectError, fetchSliders } from '../../store/reducers/SliderSlice';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';


const MainSlider = () => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(true);

  const handleResize = debounce(() => {
    const isCurrentlyMobile = window.innerWidth < 1023;
    setIsMobile(isCurrentlyMobile);
  }, 300);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const Sliders = useSelector(selectSliders);

  useEffect(() => {
    const filterRequest = {
      title: '',
      page: 1,
      sliderType: 'MainSlider',
    };
    dispatch(fetchSliders(filterRequest));
  }, [dispatch]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  const settings = {
    slidesPerView: 1,
    spaceBetween: 5,
    loop: true, // اسلایدر به صورت بی‌نهایت حرکت می‌کند
    autoplay: {
      delay: 3000, // تاخیر بین هر اسلاید (میلی‌ثانیه)
      disableOnInteraction: true, // غیرفعال کردن autoplay پس از تعامل کاربر (انتخاب اسلایدر)
    },
    navigation: {
      enabled: true,
      nextEl: '#span-main-slider-next',
      prevEl: '.main-slider-prev',
      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled'
    },
    breakpoints: {
      1: { slidesPerView: 1, spaceBetween: 5 },
    },
  };

  if (error) {
    return (
      <div>
        <p>خطا:</p>
        <p>Type: {error.type}</p>
        <p>Title: {error.title}</p>
        <p>Status: {error.status}</p>
        <p>TraceId: {error.traceId}</p>
        {error.errors && (
          <ul>
            {Object.keys(error.errors).map((key) => (
              <li key={key}>{key}: {error.errors[key]}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <>
        
      <div className="main-slider">
        <span id="span-main-slider-next" className="main-slider-next"><svg><use xlinkHref="#chevronLeft"></use></svg></span>
        <span id="span-main-slider-prev" className="main-slider-prev"><svg><use xlinkHref="#chevronRight"></use></svg></span>
      <LoadingModal loading={loading} />
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          {...settings}
          navigation= {{
            enabled: true,
            nextEl: '#span-main-slider-next',
            prevEl: '#span-main-slider-prev',
            hideOnClick: false,
            disabledClass: 'swiper-button-disabled',
            hiddenClass: 'swiper-button-hidden',
            lockClass: 'swiper-button-lock',
            navigationDisabledClass: 'swiper-navigation-disabled'
          }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("اسلاید تغییر کرد")}
        >
          {Sliders.filter((slider) => slider.sliderType === 1).map(
            (slider, sliderIndex) =>
              slider.sliderImages.map((image, imgIndex) => (
                <SwiperSlide key={`${sliderIndex}-${imgIndex}`}>
                  <div key={imgIndex}>
                    <Link to={image.link}>
                      <img src={image.imagePath} className='main-slider-image' alt={`Slide ${imgIndex}`} />
                    </Link>
                  </div>
                </SwiperSlide>
              ))
          )}
        </Swiper>
        {/* دکمه‌های ناوبری */}
      
      </div>
    </>
  );
};

export default MainSlider;
