import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
import { Helmet } from 'react-helmet-async';

import { useParams, NavLink  } from "react-router-dom";
import { useCart } from "../utils/hooks/useCart";

import "react-tabs/style/react-tabs.css";
import Scrollspy from 'react-scrollspy';

// Import components
import CommentTab from "../components/Comment/CommentTab";
import SpecificationTab from "../components/product/SpecificationTab";
import SpecificationPanel from "../components/product/SpecificationPanel";
import BuyBoxSide from "../components/product/BuyBoxSide";
import BuyBoxBottom from "../components/product/BuyBoxBottom";
import { useLocation } from 'react-router-dom';

import IntroductionTab from "../components/product/IntroductionTab";
import ImageGallerySlider from "../components/product/ImageGallerySlider";

import LoadingModal from "../components/common/LoadingModal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail, selectProductDetail, selectLoading, selectError, selectBreadCrumbs, selectStatus} from '../store/reducers/productSlice';
import { variables } from '../utils/api/variables';
import '../styles/product.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { fetchProductBreadCrumb, selectProductBreadCrumbs} from '../store/reducers/categorySlice';

const BaseWebUrl = variables.BASE_WEB_URL

function ProductPage() {
  const location = useLocation();
  const canonicalUrl = `${BaseWebUrl}${location.pathname}`;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const [selectedProductSizeId, setSelectedProductSizeId] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  const { id } = useParams();
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState(null);

  const productDetail = useSelector(selectProductDetail);
  const breadCrumbs = useSelector(selectBreadCrumbs);
  const loading = useSelector(selectLoading);
  const apiStatus = useSelector(selectStatus);

  const error = useSelector(selectError);
  let addBtn, cart;
  const [isMobile, setIsMobile] = useState(false)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  const [showViewMoreButton, setShowViewMoreButton] = useState(false);
  const [imagesToShow, setImagesToShow] = useState(5); // تعداد پیش‌فرض تصاویر برای نمایش
  const galleryContainerRef = useRef(null);

  // useEffect(() => {
  //   const galleryContainer = document.querySelector('.grid-image-container');
  //   setContainerWidth(galleryContainer ? galleryContainer.offsetWidth : 0);

  //   // تابع برای محاسبه تعداد تصاویر قابل مشاهده بر اساس عرض صفحه
  //   const updateVisibleImages = () => {
  //     const width = window.innerWidth;
  //     if (width < 600) {
  //       setVisibleImages(2);
  //     } else if (width < 800) {
  //       setVisibleImages(3);
  //     } else {
  //       setVisibleImages(5);
  //     }
  //   };

  //   // بروزرسانی تعداد تصاویر قابل مشاهده بر اساس تغییر اندازه صفحه
  //   updateVisibleImages();
  //   window.addEventListener('resize', updateVisibleImages);

  //   return () => {
  //     window.removeEventListener('resize', updateVisibleImages);
  //   };


  // }, []);

 
  useEffect(() => {
    if(!productDetail || !productDetail.images)
      return;

    const updateImagesToShow = () => {
      if (galleryContainerRef.current) {
        const containerWidth = galleryContainerRef.current.offsetWidth;
        const imageWidth = 110; // عرض هر تصویر
        const calculatedImagesToShow = Math.floor(containerWidth / imageWidth);
        setImagesToShow(calculatedImagesToShow);
        setShowViewMoreButton(productDetail.images.length > calculatedImagesToShow);
      }
    };

    const resizeObserver = new ResizeObserver(updateImagesToShow);
    if (galleryContainerRef.current) {
      resizeObserver.observe(galleryContainerRef.current);
    }

    updateImagesToShow(); // برای محاسبه تعداد تصاویر در بارگذاری اولیه

    return () => {
      if (galleryContainerRef.current) {
        resizeObserver.unobserve(galleryContainerRef.current);
      }
    };
  }, [productDetail]);

  const handleResize = () => {
    if (window.innerWidth < 1023) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }
  
  // create an event listener
  useEffect(() => {
    window.scrollTo(0, 0);

    window.addEventListener("resize", handleResize);
    handleResize(); // برای تنظیم مقدار اولیه
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [productDetail]);

  useEffect(() => {
   if(selectedProductSizeId)
      setSize(productDetail.sizes.find((s)=>s.productSizeId==selectedProductSizeId))
  }, [selectedProductSizeId]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [productDetail]);

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (productDetail) {
      if (productDetail.mainImage) {
        setMainImage(productDetail.mainImage);
      }
      if(productDetail.defaultSize)
          setSelectedProductSizeId(productDetail.defaultSize.productSizeId)
    
    }
    
  }, [productDetail]);


  function storeItems() {
    let itmsInCart = cart.getAttribute("data-count");
    cart.classList.add("addedCount");

    if (!itmsInCart) {
      cart.setAttribute("data-count", 1);
    } else {
      cart.setAttribute("data-count", parseInt(itmsInCart, 10) + 1);
    }
  }

  const handleAddToCart = () => {
    addToCart({
        product: productDetail,
        size: size.size || productDetail.defaultSize.size,
        price: size.price || productDetail.defaultSize.price,
        productSizeId: size.productSizeId || productDetail.defaultSize.productSizeId,
    });

    setModalContent({
        image: mainImage,
        name: productDetail.name,
        price: size.price || productDetail.defaultPrice,
        size: size
    });
    setIsModalVisible(true);
}

   const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const handleTabClick = (e, targetId) => {
    e.preventDefault();
    const offset = 180; // مقدار offset به پیکسل
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectedSizeChange = (newSelectedSize) => {
    setSelectedProductSizeId(newSelectedSize.productSizeId);
  };


  const handleGalleryModalOpen = () => {
    setIsGalleryModalOpen(true);
  };

  const handleGalleryModalClose = () => {
    setIsGalleryModalOpen(false);
  };
  const handleThumbnailClick = (imagePath) => {
    setMainImage(imagePath);
  };

  if (error) {
    return <div>خطا: {error}</div>;
  }

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <LoadingModal loading={apiStatus == "loading"} />
      {productDetail && productDetail.images && (
        <div className="product-page-container">
          <div style={{width:'100%'}}>
            <div className="product-detail">
              <div className="product-detail-image-section">
                <div className="product-detail-img">
                  {mainImage=='images/products/noimage.png' ?
                  <img
                    src={`/${process.env.PUBLIC_URL}${mainImage}`}
                    alt="Product"
                    id="productDetailMainImage"
                  /> :
                  <img
                    src={`${process.env.PUBLIC_URL}${mainImage}`}
                    alt="Product"
                    id="productDetailMainImage"
                  />
                  }
                </div>
               
                  <>
                    <div className="grid-image-container" ref={galleryContainerRef}>
                    {showViewMoreButton   && (
                            // <button
                            //   className="image-gallery-view-more-btn"
                            //   //src={`${process.env.PUBLIC_URL}${productDetail.images[5].path}`}
                            //   alt="View More"
                            // >تصاویر بیشتر
                            // </button>
                            <div className="grid-image-item">
                            <div className="size-feedback" onClick={handleGalleryModalOpen}> تصاویر بیشتر</div>
                            </div>

                      )}
                      {productDetail?.images
                        ?.slice(0, imagesToShow)
                        .map((image, index) => (
                          <div className="grid-image-item">
                          <img
                            className="image-gallery-thumbnails-img"
                            key={image.productImageId}
                            src={image.path}
                            alt={`Thumbnail ${index}`}
                            onClick={() => handleThumbnailClick(image.path)}
                          />
                          </div>
                        ))}
                    </div>
                      

                    
                     {/* <div class="grid-image-container">
                      <div class="grid-image-item"><img src="https://via.placeholder.com/100" alt="Image 1"/></div>
                      <div class="grid-image-item"><img src="https://via.placeholder.com/100" alt="Image 2"/></div>
                      <div class="grid-image-item"><img src="https://via.placeholder.com/100" alt="Image 3"/></div>
                      <div class="grid-image-item"><img src="https://via.placeholder.com/100" alt="Image 4"/></div>
                      <div class="grid-image-item"><img src="https://via.placeholder.com/100" alt="Image 5"/></div>
                  </div> */}
                  </>
                {isGalleryModalOpen && (
                  <ImageGallerySlider
                    callBackGalleryModalClose={handleGalleryModalClose}
                    callBackImageClick={setMainImage}
                  ></ImageGallerySlider>
                )}
              </div>
              <div className="product-detail-other">
                <div className="product-detail-product-title">
                  <h1>{productDetail.name}</h1>
                </div>
                <div className="product-detail-Specification-buybox">
                  <div className="product-detail-Specification">
                    <SpecificationPanel
                      onSelectedSizeChange={handleSelectedSizeChange}
                    />
                  </div>
                </div>
              </div>
              {isMobile && (
                <div className="product-detail-BuyBoxBottom">
                  <BuyBoxBottom
                    addItemCallBack={handleAddToCart}
                    selectedProductSizeId={selectedProductSizeId}
                  />
                </div>
              )}
            </div>

            <div className="tabArea">
              <div className="tabs-container">
                <Scrollspy
                  className="ulTab"
                  items={["introduction", "specifications", "comments"]}
                  currentClassName="isCurrent"
                  offset={-95}
                >
                  <li>
                    <a
                      href="#introduction"
                      onClick={(e) => handleTabClick(e, "introduction")}
                    >
                      معرفی
                    </a>
                    <div className="li_Title_line_red"></div>
                  </li>
                  <li>
                    <a
                      href="#specifications"
                      onClick={(e) => handleTabClick(e, "specifications")}
                    >
                      مشخصات
                    </a>
                    <div className="li_Title_line_red"></div>
                  </li>
                  <li>
                    <a
                      href="#comments"
                      onClick={(e) => handleTabClick(e, "comments")}
                    >
                      دیدگاه کاربران
                    </a>
                    <div className="li_Title_line_red"></div>
                  </li>
                </Scrollspy>
              </div>

              <div className="tab-top-bottom-border">
                <IntroductionTab introText={productDetail.description} />
              </div>
              <div className="tab-top-bottom-border">
                <SpecificationTab />
              </div>
              <div className="tab-top-bottom-border">
                <CommentTab selectedProductSizeId={selectedProductSizeId} />
              </div>
            </div>
          </div>
          <div>
            {!isMobile && (
              <div className="product-detail-BuyBoxSide">
                <BuyBoxSide
                  addItemCallBack={handleAddToCart}
                  selectedProductSizeId={selectedProductSizeId}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {isModalVisible && (
        <div className="buy-modal-overlay">
          <div className="buy-modal">
            <div className="buy-modal-header">
              <div className="buy-modal-checkmark-container">
                <svg className="buy-modal-checkmark-svg" viewBox="0 0 100 100">
                  <circle
                    className="buy-modal-checkmark-circle"
                    cx="50"
                    cy="50"
                    r="45"
                  ></circle>
                  <path
                    className="buy-modal-checkmark-tick"
                    d="M30 50l15 15 30-30"
                  ></path>
                </svg>
                <span className="buy-modal-checkmark-modal-message">
                  این کالا به سبد خرید اضافه شد!
                </span>
              </div>
              <div
                className="buy-modal-close"
                onClick={() => setIsModalVisible(false)}
              >
                <svg
                  style={{
                    width: "24px",
                    height: "24px",
                    fill: "var(--color-icon-high-emphasis)",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.293 6.707a1 1 0 00-1.414-1.414L12 10.586 6.121 4.707A1 1 0 004.707 6.12L10.586 12l-5.879 5.879a1 1 0 001.414 1.414L12 13.414l5.879 5.879a1 1 0 001.414-1.414L13.414 12l5.879-5.879z" />
                </svg>
              </div>
            </div>

            <div className="buy-modal-body-container">
              <img
                src={modalContent.image}
                alt="Product"
                className="buy-modal-product-image"
              />
              <div className="buy-modal-product-info">
                {modalContent.name}
                {modalContent.size && (
                  <span>{` سایز ${modalContent.size.size}`}</span>
                )}
              </div>
            </div>

            <button className="buy-modal-btn">برو به سبد خرید</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductPage;
