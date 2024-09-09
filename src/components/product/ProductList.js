import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';

import LoadingModal from "../common/LoadingModal";
import FormatPrice from "../FormatPrice/FormatPrice";
import { truncateString, truncateNumber } from "../../utils/hooks/useUtil";
import { NumberInPersian } from "../../utils/hooks/useUtil";
import {
  selectProducts,
  selectMoreProducts,
  selectLoading,
  selectError,
  selectStatus,
  fetchMoreProducts,
  fetchProducts,
} from "../../store/reducers/productSlice";
import { Link, useParams } from "react-router-dom";
import Filter from "../../components/shop/FilterGPT";
import { selectFilters, setFilters, setPage, setSort } from "../../store/reducers/filterSlice";

function ProductList() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const { categoryRoute } = useParams();

  const [allProducts, setAllProducts] = useState([]);
  const products = useSelector(selectProducts);
  const moreProducts = useSelector(selectMoreProducts);
  const loading = useSelector(selectLoading);
  const apiStatus = useSelector(selectStatus);
  const error = useSelector(selectError);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loadedPage, setLoadedPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [initialFilters, setInitialFilters] = useState({});
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const SortOption = {
    Relevant: 1,
    MostViewed: 2,
    Newest: 3,
    BestSelling: 4,
    LowestPrice: 5,
    HighestPrice: 6,
    FastestShipping: 7,
    CustomerRecommended: 8,
    Selected: 9
};
// آرایه‌ای از گزینه‌های مرتب‌سازی
const sortOptions = [
  { value: SortOption.Relevant, label: 'مرتبط‌ترین' },
  { value: SortOption.MostViewed, label: 'پربازدیدترین' },
  { value: SortOption.Newest, label: 'جدیدترین' },
  { value: SortOption.BestSelling, label: 'پرفروش‌ترین‌' },
  { value: SortOption.LowestPrice, label: 'ارزان‌ترین' },
  { value: SortOption.HighestPrice, label: 'گران‌ترین' },
  { value: SortOption.FastestShipping, label: 'سریع‌ترین ارسال' },
  { value: SortOption.CustomerRecommended, label: 'پیشنهاد خریداران' },
  { value: SortOption.Selected, label: 'منتخب' },
];
const [sort, setSelectedSort] = useState(SortOption.Relevant);

const handleSortChange = useCallback((option) => {
  setSelectedSort(option);
  dispatch(setFilters({
      sort: option,
      changed: true
  }));
  // اینجا می‌توانید درخواست‌های API یا منطق دیگری را بر اساس گزینه انتخاب شده انجام دهید
}, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filtersFromParams = {
      minPrice: params.get("minprice"),
      maxPrice: params.get("maxprice"),
      inStock: params.get("instock") === "true",
      brands: [],
      categoryRoute,
      sort: params.get("sort") ? parseInt(params.get("sort"), 10) : null,
      page: params.get("page"),
      pageSize: params.get("pagesize"),
    };

    params.forEach((value, key) => {
      if (key.startsWith("brands[")) {
        filtersFromParams.brands.push(value);
      }
    });

    dispatch(setFilters({...filtersFromParams}))
    setInitialFilters({ ...filtersFromParams, isInitialLoad: true });
  }, [categoryRoute,dispatch]);

  useEffect(() => {
    if (initialFilters.isInitialLoad) {
      dispatch(fetchProducts({ filterRequest: initialFilters }));
    }
  }, [initialFilters, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.scrollHeight &&
        !isLoadingMore &&
        loadedPage < totalPage
      ) {
        setIsLoadingMore(true);
        setPage(loadedPage + 1);
        const  combinedFilter = {
          ...initialFilters,
          ...filters,
          page: loadedPage + 1,
        };
        dispatch(fetchMoreProducts({ filterRequest: combinedFilter })).finally(
          () => {
            setIsLoadingMore(false);
          }
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialFilters, filters, loadedPage, totalPage, isLoadingMore, dispatch]);

  useEffect(() => {
    if (filters.changed) {
      let combinedFilter = { ...initialFilters, ...filters };
      setAllProducts([]);
      dispatch(fetchProducts({ filterRequest: combinedFilter }));
    }
  }, [filters]);

  useEffect(() => {
    if (moreProducts){
      setLoadedPage(moreProducts.currentPage);
      if(moreProducts.productsWithSizes && moreProducts.productsWithSizes.length > 0) {
      setAllProducts([...allProducts, ...moreProducts.productsWithSizes]);
     
    }
  }
  }, [moreProducts]);

  useEffect(() => {
    if (products){
      setTotalPage(products.totalPage);
      setLoadedPage(products.currentPage);
      setTotalCount(products.totalCount)
      if(products.productsWithSizes && products.productsWithSizes.length > 0) {
      setAllProducts([...products.productsWithSizes]);
     
    }
  }
  }, [products]);

  return (
    <div className="productList-container">
      <div className="filters-section">
        <Filter />
      </div>

      <div className="products-section">
      {apiStatus === "loading" && (
          <div className="loading-overlay">
            <LoadingModal loading={true} />
          </div>
        )}
                {error && <div>خطا: {error}</div>}
        <div className="sort-container">
      <div className="sort-header">
        <div className="sort-icon">
          <svg style={{ width: '24px', height: '24px' }}>
            <use xlinkHref="#sort" />
          </svg>
        </div>
        <p className="sort-label">
          <span className="relative">مرتب سازی:</span>
        </p>
      </div>

      <div className="sort-options">
        {sortOptions.map(option => (
          <span
            key={option.value}
            className={`sort-option ${sort === option.value ? 'selected' : ''}`}
            onClick={() => handleSortChange(option.value)}
          >
            {option.label}
          </span>
        ))}
      </div>

      <div className="product-count">
        { totalCount>0 && (<span>{NumberInPersian(totalCount)} کالا</span>) }
      </div>
    </div>
    {
                products && products.totalCount===0 && (
                  <div className="not-found-container">
                  <div className="not-found-image-container">
                    <img src={`${process.env.PUBLIC_URL}/images/site/not-found.svg`} alt="نتیجه‌ای یافت نشد" title="" />
                  </div>
                  <div className="not-found-message-container">
                    <div className="not-found-warning-message">
                      <svg style={{ width: '20px', height: '20px', fill: 'var(--color-icon-warning)' }}>
                        <use xlinkHref="#infoFill"></use>
                      </svg>
                      کالایی با این مشخصات پیدا نکردیم
                    </div>
                    <div>پیشنهاد می‌کنیم فیلترها را تغییر دهید</div>
                  </div>
                </div>
                )              
            }
        <div className="product-grid">
           
          { allProducts.map((product) => (
            <div className="product-card" key={product.productId}>
              <Link
                target="_blank"
                to={`/product/${product.productId}/${encodeURIComponent(
                  product.name.replace(/\s+/g, "-")
                )}`}
              >
                <div className="product-img">
                  <img
                    alt={product.name}
                    src={`${process.env.PUBLIC_URL}${product.mainImage}`}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{truncateString(product.description, 60)}</p>
                  <div className="product-rating">
                    {product.productRating > 0 ? (
                      <>
                        <FontAwesomeIcon icon={faStar} />
                        <span>
                          {truncateNumber(
                            NumberInPersian(product.productRating),
                            3
                          )}
                        </span>
                      </>
                    ) : (
                      <span style={{ height: "40px", width: "50px" }}></span>
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
                </div>
              </Link>
            </div>
          ))}
        </div>

        {apiStatus == "loadingMore" && (
          <div className="spinner">
            <div className="dot-flashing"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
