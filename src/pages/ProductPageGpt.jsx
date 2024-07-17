import React, { useState, useEffect, useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
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
import LoadingModal from "../components/common/LoadingModal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail, selectProductDetail, selectLoading, selectError, selectBreadCrumbs} from '../store/reducers/productSlice';
import { variables } from '../utils/api/variables';
import { useCard } from '../components/common/CardContext';

const BaseWebUrl = variables.BASE_WEB_URL

function ProductPage() {
  const location = useLocation();
  const cardReference = useCard();
  const canonicalUrl = `${BaseWebUrl}${location.pathname}`;

  const [selectedSize, setSelectedSize] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  const { id } = useParams();
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const [mainImage, setMainImage] = useState("");

  const productDetail = useSelector(selectProductDetail);
  const breadCrumbs = useSelector(selectBreadCrumbs);
  const loading = useSelector(selectLoading);

  const error = useSelector(selectError);
  let addBtn, cart;
  const speed = 1200,
  curveDelay = 300,
  position = "fixed"; // or absolute
  const [isMobile, setIsMobile] = useState(false)
  const prevScrollPosition = useRef(window.scrollY);

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

  const addItem = (e)=> {
    const bigProductImage = document.getElementById('productDetailMainImage');

    let btnY = position === "fixed" ? e.target.getBoundingClientRect().top : e.target.offsetTop;
    let btnX = position === "fixed" ? e.target.getBoundingClientRect().left : e.target.offsetLeft;
    let flyingTumbnail = bigProductImage.cloneNode();
    cart = cardReference.current;
    let cartTop = cart.offsetTop - scrollPosition;
    cart.classList.remove("addedCount");

    flyingTumbnail.classList.add("flyingBtn");
    flyingTumbnail.style.position = position;
    flyingTumbnail.style.top = `${btnY}px`;
    flyingTumbnail.style.left = `${btnX}px`;
    flyingTumbnail.style.opacity = "1";
    flyingTumbnail.style.transition = `all ${speed / 500}s ease, top ${(speed + curveDelay) / 1000}s ease, left ${speed / 500}s ease, transform ${speed / 1200}s ease ${(speed - 10) / 500}s`;

    document.body.appendChild(flyingTumbnail);
    flyingTumbnail.style.top = `${cartTop + cart.offsetHeight - 35}px`;
    flyingTumbnail.style.left = `${cart.offsetLeft + cart.offsetWidth - 35}px`;
    flyingTumbnail.style.maxHeight  = "50px";
    flyingTumbnail.style.maxWidth = "50px";
    flyingTumbnail.style.width = "50px";
    flyingTumbnail.style.height = "50px";
    flyingTumbnail.style.transform = "scale(0)";
    flyingTumbnail.style
    setTimeout(() => {
      flyingTumbnail.remove();
      storeItems();
    }, speed * 1.5);

    addToCart({
      product: productDetail,
      size: selectedSize?.size || productDetail.sizes[0].size,
      price: selectedSize?.price || productDetail.defaultPrice,
      productSizeId: selectedSize?.productSizeId || productDetail.sizes[0].productSizeId,
    });
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
    setSelectedSize(newSelectedSize);
  };

  if (error) {
    return <div>خطا: {error}</div>;
  }

  return (
    <>
        <Helmet>
            <link rel="canonical" href={canonicalUrl} />
        </Helmet>
      <LoadingModal loading={loading} />
      {productDetail && productDetail.images &&(
        <div className="product-page-container">
            <div className="product-detail">
                <div>
                  {/* نمایش breadcrumb به عنوان لیست */}
                  <ul>
                      <li><NavLink to="/">صفحه اصلی</NavLink></li>
                      {breadCrumbs && breadCrumbs.map((item, index) => (
                          <li key={index}>
                              <NavLink to={item.route}>{item.title}</NavLink>
                          </li>
                      ))}
                  </ul>
              </div>
              
              <div className="product-detail-img">
                <img src={`${process.env.PUBLIC_URL}${mainImage}`} alt="Product" id="productDetailMainImage" />
                <div className="image-gallery">
                      {productDetail.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.path}
                          alt={`Thumbnail ${index}`}
                          onClick={() => setMainImage(image.path)}
                        />
                      ))}
                </div>
              </div>
              <div className="product-detail-other">
                <div className ="product-detail-product-title">
                    <h1>{productDetail.name}</h1>
                </div>
                <div className ="product-detail-Specification-buybox">
                  
                  <div className="product-detail-Specification">
                    <SpecificationPanel  onSelectedSizeChange={handleSelectedSizeChange}/>
                  </div>

                  {!isMobile &&
                  <div className="product-detail-BuyBoxSide">
                    <BuyBoxSide addItemCallBack={addItem} selectedSize={selectedSize}/>
                  </div>
                  }
                  </div>
              </div>
              {isMobile &&
              <div className="product-detail-BuyBoxBottom">
                <BuyBoxBottom addItemCallBack={addItem} selectedSize={selectedSize}/>
              </div>
              }
              
            </div>

            <div className="tabArea">
                <div className="tabs-container">
                    <Scrollspy 
                      className="ulTab" items={ ['introduction', 'specifications', 'comments'] } 
                      currentClassName="isCurrent" offset={-95}>
                        <li>
                          <a href="#introduction" onClick={(e) => handleTabClick(e, 'introduction')}>معرفی</a> 
                          <div className='li_Title_line_red'></div>
                        </li>   
                        <li>
                          <a href="#specifications" onClick={(e) => handleTabClick(e, 'specifications')}>مشخصات</a>
                          <div className='li_Title_line_red'></div>
                        </li>   
                        <li>
                          <a href="#comments" onClick={(e) => handleTabClick(e, 'comments')}>دیدگاه کاربران</a>
                          <div className='li_Title_line_red'></div>
                        </li>   
                    </Scrollspy>
                </div>

                <div  className="tab-top-bottom-border">
                    <IntroductionTab />
                </div>
                <div  className="tab-top-bottom-border">
                  <SpecificationTab />
                </div>
                <div  className="tab-top-bottom-border">
                  <CommentTab />
                </div>
            </div>
        </div>
      )}
    
    </>
  );
}

export default ProductPage;
