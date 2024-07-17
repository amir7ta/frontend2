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
import { useInView } from 'react-intersection-observer';
import { Link,useParams } from 'react-router-dom';
import Filters from '../../components/shop/Filter';

function ProductList() {
  const { toggle, isToggled } = useToggle();
  const { minPrice: filterMinPrice, maxPrice: filterMaxPrice } = useSelector((state) => state.product.filter);
  const { Meta } = Card;
  const { categoryRoute } = useParams();
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [minPrice, setMinPrice] = useState(filterMinPrice || '');
  const [maxPrice, setMaxPrice] = useState(filterMaxPrice || '');
  const [sortOrder, setSortOrder] = useState('asc');
  const [size, setSize] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0); // متغیر جدید currentPage
  const [nextPage, setNextPage] = useState(0); // متغیر جدید currentPage

  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [hasMoreData, setHasMoreData] = useState(true); // New state to control fetching more data
  const [allProducts, setAllProducts] = useState([]);
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    selectedBrands: [],
    priceRange: [0, 1000],
    showInStockOnly: false,
    selectedCategory: '',
  });

  // const fetchFilteredProducts = () => {
  //   const filterRequest = {
  //     minPrice,
  //     maxPrice,
  //     sortOrder,
  //     size,
  //     // Add other filter options as needed
  //     page:  currentPage+1, // Assuming initial page
  //     pageSize, // Assuming page size
  //   };
  //   dispatch(fetchProducts({ filterRequest }));
  // };
  useEffect(() => {
    debugger
    if (inView && !loading) {
      const filterRequest = {
              minPrice,
              maxPrice,
              sortOrder,
              size,
              pageSize,
              categoryRoute,
              page: currentPage+1,
            };
            dispatch(fetchProducts({ filterRequest }))
    }
  }, [categoryRoute,loading,inView, filters]);

  const handleSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setAllProducts([]); // Clear current products to show loading state
    fetchFilteredProducts();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setAllProducts([]);
    setCurrentPage(0);
  };

  useEffect(() => {
    if(products.length > 0)
      {
        setCurrentPage((prev)=>prev+1)
        setAllProducts((prev) => [...prev, ...products]); // به روز رسانی allProducts
      }
  }, [products]);

  if (error) {
    return <div>خطا: {error}</div>;
  }


  return (
    <div className="shop">

      <LoadingModal loading={loading} />
      <>
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
      <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
        <Filters />
      </Col>
      <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>

        {allProducts.map((product, index) => (
            <Link
              target="_blank"
              to={`/product/${product.productId}/${encodeURIComponent(
                product.name.replace(/\s+/g, "-")
              )}`}
            >
              <Card
                hoverable
                cover={<img alt={product.name} src={`${process.env.PUBLIC_URL}${product.mainImage}`} />}
                style={{ height: "100%", fontFamily: "vazirmatn, sans-serif" }}
              >
                <Meta
                  style={{
                    fontSize: ".8rem",
                    fontWeight: "500",
                    color: "rgb(0 0 0 / 68%)",
                  }}
                  title={product.name}
                  description={truncateString(product.description, 60)}
                />
                <div className="product-rating">
                  {product.productRating > 0 && (
                    <>
                      <FontAwesomeIcon icon={icons.star} />
                      <span>
                        {truncateNumber(
                          NumberInPersian(product.productRating),
                          3
                        )}
                      </span>
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
                      height: "40px",
                      color: "rgb(0 0 0 / 50%)",
                      display: "flex",
                      alignItems: "bottom",
                      justifyContent: "left",
                      padding: "5px",
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}
                  >
                    نا موجود!
                  </div>
                )}
              </Card>
            </Link>
        ))}
                  </Col>

      </Row>
      <div ref={ref}></div>
      </>
      </div>
  );
}

export default ProductList;
