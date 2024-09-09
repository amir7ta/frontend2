import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider, Select, Switch, Collapse } from 'antd';
import Tree from '../shop/CategoryTreeGPT';
import { selectCategoriesHirearchyForFilter, fetchCategoriesHirearchyByRoute } from '../../store/reducers/categorySlice';
import { selectBrands, fetchBrands } from '../../store/reducers/brandSlice';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { formatPrice, persianToEnglishDigits, NumberInPersian } from '../../utils/hooks/useUtil';
import {  setFilters ,selectFilters, selectResetFilters} from '../../store/reducers/filterSlice';
import { debounce } from 'lodash';
import {  fetchCategoryBreadCrumb} from '../../store/reducers/categorySlice';

const { Option } = Select;
const { Panel } = Collapse;

const Filter = () => {
  const resetFilter = {
    categoryRoute: '',
    minPrice: '0',
    maxPrice: '100000000',
    inStock: false,
    brands: []
  };
  const filters = useSelector(selectFilters);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const fixRange = [0, 10000000];
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [page, setPage] = useState('');
  const [pageSize, setPageSize] = useState('');
  const [sort, setSort] = useState('');
  const [categoryRouteParam, setCategoryRouteParam] = useState('');


  const [selectedCategory, setSelectedCategory] = useState('');
  const [formattedPriceRange, setFormattedPriceRange] = useState([
    NumberInPersian(formatPrice(0)),
    NumberInPersian(formatPrice(10000000)),
  ]);
  const categoriesHirearchyForFilter = useSelector(selectCategoriesHirearchyForFilter);
  const resetFilters = useSelector(selectResetFilters);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryRoute } = useParams();
  const location = useLocation();
  const isInitialLoad = useRef(true);
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCategoriesHirearchyByRoute(categoryRoute));
    dispatch(fetchCategoryBreadCrumb(categoryRoute));
  }, [dispatch,categoryRoute,resetFilters]);


  useEffect(() => {
    if (brands.length > 0) {
      const params = new URLSearchParams(location.search);
      const initialParams = {
        minPrice: params.get('minprice'),
        maxPrice: params.get('maxprice'),
        inStock: params.get('instock') === 'true',
        brands: [],
        sort: params.get('sort'),
        page: params.get('page'),
        pageSize: params.get('pagesize'),
      };
  
      params.forEach((value, key) => {
        if (key.startsWith('brands[')) {
          if (initialParams.brands) {
            initialParams.brands.push(value); // استفاده از 'push' در صورتی که 'initialParams.brands' تعریف شده باشد
          } else {
            initialParams.brands = [value]; // اطمینان از این که 'initialParams.brands' همیشه یک آرایه است
          }
        }
      });
  
      if (initialParams.minPrice && initialParams.maxPrice) {
        setPriceRange([parseInt(initialParams.minPrice), parseInt(initialParams.maxPrice)]);
        DoFormattedPriceRange([parseInt(initialParams.minPrice), parseInt(initialParams.maxPrice)]);
      }
      setShowInStockOnly(initialParams.inStock);
      setPage(initialParams.page);
      setPageSize(initialParams.pageSize);
      setSort(initialParams.sort);
      setCategoryRouteParam(categoryRoute);
  
      // ست کردن برندهای انتخاب شده بعد از لود برندها
      const selectedBrandObjects = brands.filter((brand) =>
      initialParams.brands.includes(brand.brandId)
      );
      setSelectedBrands(selectedBrandObjects);
    }
  }, [brands, location.search,location.pathname, resetFilters]);

  
  const SyncUrl=()=>{
    
    const params = new URLSearchParams();

    if (filters.inStock) {
      params.set('instock', 'true');
    } else {
      params.delete('instock');
    }

    if (filters.page) {
      params.set('page', filters.page);
    } else {
      params.delete('page');
    }

    if (filters.pageSize) {
      params.set('pagesize', filters.pageSize);
    } else {
      params.delete('pagesize');
    }

    if (filters.sort) {
      params.set('sort',filters.sort);
    } else {
      params.delete('sort');
    }

    if (filters.brands && filters.brands.length > 0) {
      filters.brands.forEach((brand, index) => {
        params.append(`brands[${index}]`, brand.brandId);
      });
    } else {
      params.delete('brands');
    }

    if (filters.maxPrice && filters.maxPrice!== fixRange[1]) {
      params.set('maxprice', filters.maxPrice);
    } else {
      params.delete('maxprice');
    }

    if (filters.maxPrice && filters.minPrice !== fixRange[0] ) {
      params.set('minprice',filters.minPrice);
    } else {
      params.delete('minprice');
    }

    const newSearch = params.toString();
    let newUrl = '';

    if (filters) {
      if( filters.categoryRoute && filters.categoryRoute.trim() !== ''){
        newUrl = '/shop/'+ filters.categoryRoute+  (newSearch  !== ''?`?${newSearch}`:'');
        }
      else{
        newUrl = '/shop'+  (newSearch  !== ''?`?${newSearch}`:'');
        }
    }

    window.history.pushState(null, '', newUrl);
  };

  


  useEffect(() => {

    if(filters.changed){
        SyncUrl();
    }

  }, [dispatch,filters]);



  const handleCategoryRouteChange= (selectedCategoryRoute) => {
    setCategoryRouteParam(selectedCategoryRoute)
    dispatch(fetchCategoriesHirearchyByRoute(selectedCategoryRoute));
    dispatch(fetchCategoryBreadCrumb(selectedCategoryRoute));
    dispatch(setFilters({
      categoryRoute: selectedCategoryRoute,
      changed:true,
    }));
    
  };

 const handleBrandChange = (selectedTitles) => {
  // گرفتن brandId ها به جای title ها
  const tempSelectedBrands = brands
    .filter(brand => selectedTitles.includes(brand.title));
    

  setSelectedBrands(tempSelectedBrands);
  dispatch(setFilters({
    brands: tempSelectedBrands.map((brand)=> brand.brandId),
    changed: true,
  }));
};


const DoFormattedPriceRange=(value)=>{  
    setFormattedPriceRange([
    NumberInPersian(formatPrice(value[0])),
    NumberInPersian(formatPrice(value[1])),
  ]);
}
  const handlePriceChange = (value) => {
      setPriceRange(value);
      DoFormattedPriceRange(value);
      setPriceToFilterWithDelay(value);
  }



  const setPriceToFilterWithDelay = useMemo(() => debounce((value) => {
    dispatch(setFilters({
      minPrice: value[0],
      maxPrice: value[1],
      changed:true,
    }));
  }, 700), [dispatch]);

  const handleStockChange = (checked) => {
      setShowInStockOnly(checked);
      dispatch(setFilters({
        inStock: checked,
        changed:true,
      }));
  };

  
  const handleFromChange = (value) => {
    const engNumber = persianToEnglishDigits(value);
    let numericValue = Number(engNumber.replace(/[^\d]/g, ''));
    if (!isNaN(numericValue)) {
      if (numericValue > fixRange[1]) numericValue = fixRange[1] - 1;
      if (numericValue < fixRange[0]) numericValue = fixRange[0];
      const newRange = [...priceRange];
      newRange[0] = numericValue;
      handlePriceChange(newRange);
    }
  };

  const handleToChange = (value) => {
    const engNumber = persianToEnglishDigits(value);
    let numericValue = Number(engNumber.replace(/[^\d]/g, ''));
    if (!isNaN(numericValue)) {
      if (numericValue > fixRange[1]) numericValue = fixRange[1];
      if (numericValue < fixRange[0]) numericValue = fixRange[0] + 1;
      const newRange = [...priceRange];
      newRange[1] = numericValue;
      handlePriceChange(newRange);
    }
  };

  const handleInputBlur = (index) => {
    const newRange = [...priceRange];
    newRange[index] = Math.max(0, Math.min(10000000, newRange[index]));
    handlePriceChange(newRange)
  };

  const marks = {
    0: 'ارزان‌ترین',
    10000000: 'گران‌ترین',
  };

  return (
    <div>
      <label className="title-filter">فیلتر ها</label>
      {categoriesHirearchyForFilter &&
        categoriesHirearchyForFilter.length > 0 && (
          <div className="filter-categories">
            <Tree
              onChange={handleCategoryRouteChange}

            />
          </div>
        )}
      <div className="filter-brands">
        <label>برند:</label>
        {brands && brands.length>0 && <Select
          mode="multiple"
          placeholder="انتخاب برند"
          value={selectedBrands.map((brand)=>brand.title)}
          onChange={handleBrandChange}
          style={{ width: '100%' }}
        >
          {brands &&
            brands.map((brand) => (
              <Option key={brand.brandId} value={brand.title}>
                {brand.title}
              </Option>
            ))}
        </Select>
        }
      </div>
      <Collapse bordered={false} className="filter-price-collapse">
        <Panel header="محدوده قیمت:" key="1">
          <div className="price-range-labels">
            <div className="price-range-label-from">
              <label>از</label>
              <input
                type="text"
                value={formattedPriceRange[0]}
                onChange={(e) => handleFromChange(e.target.value)}
                onBlur={() => handleInputBlur(0)}
              />
              <svg className="toman-icon" style={{ color: '#a3a3a3' }}>
                <use xlinkHref="#toman"></use>
              </svg>
            </div>
            <div className="price-range-label-to">
              <label>تا</label>
              <input
                type="text"
                value={formattedPriceRange[1]}
                onChange={(e) => handleToChange(e.target.value)}
                onBlur={() => handleInputBlur(1)}
              />
              <svg className="toman-icon" style={{ color: '#a3a3a3' }}>
                <use xlinkHref="#toman"></use>
              </svg>
            </div>
          </div>
          <Slider
            range
            min={fixRange[0]}
            max={fixRange[1]}
            value={priceRange}
            onChange={handlePriceChange}
            marks={marks}
           tipFormatter={(value) => `${NumberInPersian(formatPrice(value))} تومان`}
            reverse
          />
        </Panel>
      </Collapse>
      <div className="filter-options">
        <label>فقط کالاهای موجود</label>
        <Switch checked={showInStockOnly} onChange={handleStockChange} />
      </div>
    </div>
  );
};

export default Filter;