import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../assets/icons/icons";
import { useParams } from "react-router-dom";
import { useCart } from "../utils/hooks/useCart";
//import { useProduct } from "../utils/hooks/useProduct";
import { useWishlist } from "../utils/hooks/useWishlist";
import { formatPrice } from "../utils/hooks/useUtil";
import "react-tabs/style/react-tabs.css";


// Import components
import CommentTab from "../components/Comment/CommentTab";
import SpecificationTab from "../components/product/SpecificationTab";
import IntroductionTab from "../components/product/IntroductionTab";
import LoadingModal from "../components/common/LoadingModal";


import { useDispatch, useSelector } from 'react-redux';
import { productDetail, fetchProductDetail ,error,loading} from '../store/reducers/productSlice';

function ProductPage({ cardReference }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [defaultSize, setDefaultSize] = useState(null);
  const [product, setProduct] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  const { id } = useParams();
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const { wishlistItems, toggleWishlistItem } = useWishlist();
  const [mainImage, setMainImage] = useState("");
  const { prodDetail } = useSelector(productDetail);
  const { ploading } = useSelector(loading);
  const { perror } = useSelector(error);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    debugger
    dispatch(fetchProductDetail(id));
  }, [id,fetchProductDetail]);


  // useEffect(()=>{
  //   debugger
  //   if (productDetail) {
  //     debugger
  //     setMainImage(productDetail.imageURL);
  //     setLoading(false);
  //     setDefaultSize(
  //       productDetail.sizes.findIndex((size) => size.price === productDetail.defaultPrice)
  //     );
  //   }
  // },[productDetail])

  const itemExists = wishlistItems.find(
    (item) => item?.productId === product?.productId
  );

  function storeItems() {
    let itmsInCart = cart.getAttribute("data-count");
    cart.classList.add("addedCount");

    if (!itmsInCart) {
      cart.setAttribute("data-count", 1);
    } else {
      cart.setAttribute("data-count", parseInt(itmsInCart, 10) + 1);
    }
  }

  function addItem(e) {
    let btnY =
        position === "fixed"
          ? e.currentTarget.getBoundingClientRect().top
          : e.currentTarget.offsetTop,
      btnX =
        position === "fixed"
          ? e.currentTarget.getBoundingClientRect().left
          : e.currentTarget.offsetLeft,
      flyingBtn = e.currentTarget.cloneNode();
    cart = cardReference.current;
    let cartTop = cart.offsetTop - scrollPosition;
    cart.classList.remove("addedCount");

    flyingBtn.classList.add("flyingBtn");
    flyingBtn.style.position = position;
    flyingBtn.style.top = `${btnY}px`;
    flyingBtn.style.left = `${btnX}px`;
    flyingBtn.style.opacity = "1";
    flyingBtn.style.transition = `all ${speed / 1000}s ease, top ${
      (speed + curveDelay) / 1000
    }s ease, left ${speed / 1000}s ease, transform ${speed / 1000}s ease ${
      (speed - 10) / 1000
    }s`;

    document.body.appendChild(flyingBtn);
    flyingBtn.style.top = `${cartTop + cart.offsetHeight - 35}px`;
    flyingBtn.style.left = `${cart.offsetLeft + cart.offsetWidth - 35}px`;
    flyingBtn.style.height = "1rem";
    flyingBtn.style.width = "1rem";
    flyingBtn.style.transform = "scale(0)";

    setTimeout(() => {
      flyingBtn.remove();
      storeItems();
    }, speed * 1.5);

    addToCart({
      product: product,
      size: selectedSize?.size || product.sizes[0].size,
      price: selectedSize?.price || product.defaultPrice,
      productSizeId:
        selectedSize?.productSizeId || product.sizes[0].productSizeId,
    });
  }

  const handleSubmitComment = () => {
    axios
      .post("آدرس_API/ثبت_کامنت", {
        productId: product.productId,
        content: commentContent,
      })
      .then((response) => {
        console.log("Comment submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  if (error) {
    return <div>خطا: {error}</div>;
  }
  return (
    <>
      <LoadingModal loading={loading} />
      {productDetail && (
        <div className="product-page-container">
           <div className="product-detail">
            <div className="product-detail-img">
                <img src={mainImage} alt="Product" />
                <div className="image-gallery">
                    {product.images.map((image, index) => (
                        <img
                            key={index}
                            src={image.path}
                            alt={`Thumbnail ${index}`}
                            onClick={() => setMainImage(image.path)}
                        />
                    ))}
                </div>
            </div>
            <div className="product-detail-about">
              <h2>{productDetail.brand}</h2>
              <h1>{productDetail.name}</h1>
              <p className="product-price">
                {selectedSize
                  ? formatPrice(selectedSize.price)
                  : formatPrice(productDetail.defaultPrice)}
              </p>
              <div className="size-select-container">
                <label htmlFor="size-select">اندازه‌های موجود</label>
                <select
                  id="size-select"
                  value={
                    selectedSize
                      ? JSON.stringify(selectedSize)
                      : JSON.stringify(productDetail.sizes[defaultSize])
                  }
                  onChange={(e) => setSelectedSize(JSON.parse(e.target.value))}
                >
                  {productDetail.sizes
                    .slice()
                    .sort((a, b) => a.size - b.size)
                    .map((size, index) => (
                      <option key={index} value={JSON.stringify(size)}>
                        {size.size} - قیمت {formatPrice(size.price)}{" "}
                        {size.quantity <= 3
                          ? `(فقط ${size.quantity} عدد موجود در انبار)`
                          : ""}
                      </option>
                    ))}
                </select>
              </div>
              <div className="divider">
                <button
                  id="btn-add-to-card"
                  className="button"
                  onClick={(e) => addItem(e)}
                >
                  افزودن به سبد خرید
                </button>
                <button
                  className="second-button"
                  onClick={() => toggleWishlistItem(productDetail)}
                >
                  <span>لیست علاقمندی‌ها</span>
                  <FontAwesomeIcon
                    icon={itemExists ? icons.heartFull : icons.heart}
                  />
                </button>
              </div>
              <p className="product-description">{productDetail.description}</p>
            </div>
          </div>

          <div className="tabs-container">
            <Tabs>
              <TabList>
                <Tab>معرفی</Tab>
                <Tab>مشخصات</Tab>
                <Tab>نظرات کاربران</Tab>
              </TabList>
              <TabPanel>
                <IntroductionTab />
              </TabPanel>
              <TabPanel>
                <SpecificationTab />
              </TabPanel>
              <TabPanel>
                <CommentTab />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductPage;
