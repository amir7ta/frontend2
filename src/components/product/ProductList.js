import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '../../assets/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useToggle from "../../utils/hooks/useUtil";
import LoadingModal from "../common/LoadingModal";
import { Card, Row, Col } from 'antd';
import FormatPrice from '../FormatPrice/FormatPrice';
import { useMediaQuery } from 'react-responsive';
import { truncateString, truncateNumber } from '../../utils/hooks/useUtil';
import { NumberInPersian } from '../../utils/hooks/useUtil';
import { selectProducts, fetchProducts, selectLoading, selectError } from '../../store/reducers/productSlice';

function ProductList() {
  const { toggle, isToggled } = useToggle();
  const { minPrice: filterMinPrice, maxPrice: filterMaxPrice } = useSelector((state) => state.product.filter);
  const { Meta } = Card;

  const [minPrice, setMinPrice] = useState(filterMinPrice || '');
  const [maxPrice, setMaxPrice] = useState(filterMaxPrice || '');
  const [sortOrder, setSortOrder] = useState('asc');
  const [size, setSize] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1); // متغیر جدید currentPage
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true); // New state to control fetching more data
  const [allProducts, setAllProducts] = useState([]);
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

    setScrollPosition(scrollTop);

    if (windowHeight + scrollTop >= scrollHeight - 500 && !loading && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  }, [loading, isFetchingMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetchingMore && !loading && hasMoreData) {
      const filterRequest = {
        pageSize,
        page: currentPage,
      };
      dispatch(fetchProducts({ filterRequest }))
        .then(() => {
          setAllProducts((prev) => [...prev, ...products]); // به روز رسانی allProducts
          setIsFetchingMore(false);
        })
        .catch(() => {
          setHasMoreData(false); // غیرفعال کردن دریافت اطلاعات بیشتر در صورت خطا
        });
    }
  }, [isFetchingMore, loading, dispatch, pageSize, hasMoreData]);
  
  useEffect(() => {
    const handleScrollEnd = () => {
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

      if (hasMoreData && !isFetchingMore && windowHeight + scrollTop >= scrollHeight - 500) {
        setCurrentPage((currentPagePrev) => currentPagePrev + 1);
        setIsFetchingMore(true);
      }
    };

    const debouncedHandleScrollEnd = debounce(handleScrollEnd, 300);

    window.addEventListener('scroll', handleScrollEnd);

    return () => window.removeEventListener('scroll', handleScrollEnd);
  }, [hasMoreData, isFetchingMore]);

  useEffect(() => {
    const handleWindowResize = () => {
      setPageSize(getPageSize());
    };

    const debouncedHandleWindowResize = debounce(handleWindowResize, 300);

    window.addEventListener('resize', debouncedHandleWindowResize);
    return () => window.removeEventListener('resize', debouncedHandleWindowResize);
  }, []);

  const debounce = (func, delay) => {
    let timer;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, arguments), delay);
    };
  };

  const getPageSize = () => {
    const isExtraSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    const isSmallScreen = window.matchMedia('(min-width: 769px) and (max-width: 1200px)').matches;
    const isMediumScreen = window.matchMedia('(min-width: 1201px) and (max-width: 1500px)').matches;
    const isLargeScreen = window.matchMedia('(min-width: 1501px)').matches;

    if (isExtraSmallScreen) {
      return 5;
    } else if (isSmallScreen) {
      return 10;
    } else if (isMediumScreen) {
      return 16;
    } else if (isLargeScreen) {
      return 24;
    } else {
      return 20; // Default fallback
    }
  };

  if (error) {
    return <div>خطا: {error}</div>;
  }

  // Concatenate current products with new products

  return (
    <div className="shop">
      <LoadingModal loading={loading} />
      <div className="filter-control">
        <div className="filter-div toggle">
          <a onClick={() => toggle()}>
            <FontAwesomeIcon icon={icons.filter} />
          </a>
        </div>
        {isToggled() && (
          <div className="filter-option">
            <div className="filter-div">
              <label htmlFor="size">Size:</label>
              <select
                id="size"
                name="size"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              >
                <option value="">همه</option>
                {Array.from({ length: 16 }, (_, i) => i + 35).map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-div filter-spec">
              <label htmlFor="size">پاریس:</label>
              <input
                type="number"
                id="minPrice"
                placeholder="min. kr"
                name="minPrice"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
              />
              <p>-</p>
              <input
                type="number"
                id="maxPrice"
                placeholder="max. kr"
                name="maxPrice"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </div>
            <div className="filter-div">
              <label>ترتیب:</label>
              <select
                id="sort"
                name="sort"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option value="">جدیدترین</option>
                <option value="lowToHigh">از کمترین به بیشترین</option>
                <option value="highToLow">از بیشترین به کمترین</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <Row gutter={[16, 16]}>
        {allProducts.map((product, index) => (
          <Col key={index} xs={24} sm={12} md={6} lg={4}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.mainImage} />}
              style={{ height: '100%', fontFamily: 'vazirmatn, sans-serif' }}
            >
              <Meta style={{ fontSize: '.8rem', fontWeight: '500', color: 'rgb(0 0 0 / 68%)' }} title={product.name} description={truncateString(product.description, 60)} />
              <div className="product-rating">
                {product.productRating > 0 && (
                  <>
                    <FontAwesomeIcon icon={icons.star} />
                    <span>{truncateNumber(NumberInPersian(product.productRating), 3)}</span>
                  </>
                )}
              </div>
              {product.inStock ? (
                <FormatPrice
                  defaultPrice={product.defaultPrice}
                  discountPercent={product.discountedPercent}
                />
              ) : (
                <div
                  style={{
                    height: '40px',
                    color: 'rgb(0 0 0 / 50%)',
                    display: 'flex',
                    alignItems: 'bottom',
                    justifyContent: 'left',
                    padding: '5px',
                    fontSize: '1rem',
                    fontWeight: '700',
                  }}
                >
                  نا موجود!
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
      {isFetchingMore && <LoadingModal loading={loading} />}
    </div>
  );
}

export default ProductList;
