// Filters.js
import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider, Checkbox, Select } from 'antd';
import { Tree } from 'antd';
import {selectCategoriesHirearchyForFilter, fetchCategoriesHirearchyByRoute  } from '../../store/reducers/categorySlice';
import {selectBrands, fetchBrands  } from '../../store/reducers/brandSlice';

import { Category } from '@mui/icons-material';

const { Option } = Select;

const Filter = ({ onFilterChange }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const categoriesHirearchyForFilter = useSelector(selectCategoriesHirearchyForFilter);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();

  useEffect(() => {
    if(categoriesHirearchyForFilter)
    {
        console.log("categoriesHirearchyForFilter =>", categoriesHirearchyForFilter)
    }
  }, [categoriesHirearchyForFilter]);
  
  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch]);

  const handleBrandChange = (value) => {
    setSelectedBrands(value);
    onFilterChange({ selectedBrands: value, priceRange, showInStockOnly, selectedCategory });
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange({ selectedBrands, priceRange: value, showInStockOnly, selectedCategory });
  };

  const handleStockChange = (e) => {
    setShowInStockOnly(e.target.checked);
    onFilterChange({ selectedBrands, priceRange, showInStockOnly: e.target.checked, selectedCategory });
  };

  const handleCategoryChange = (value) => {
      setSelectedCategory(value);
      onFilterChange({ selectedBrands, priceRange, showInStockOnly, selectedCategory: value });
  };

  return (
    <div className="filters">
        <div className="categories">
            <Tree
                showLine
                onSelect={handleCategoryChange}
                treeData={categoriesHirearchyForFilter }
            />
        </div>
      <div className="filter-section">
        <label>برند:</label>
        <Select
          mode="multiple"
          placeholder="انتخاب برند"
          value={selectedBrands}
          onChange={handleBrandChange}
          style={{ width: '100%' }}
        >
          {brands && brands.map((brand) => (
            <Option key={brand} value={brand}>
              {brand}
            </Option>
          ))}
        </Select>
      </div>
      <div className="filter-section">
        <label>محدوده قیمت:</label>
        <Slider
          range
          min={0}
          max={1000}
          value={priceRange}
          onChange={handlePriceChange}
        />
      </div>
      <div className="filter-section">
        <Checkbox checked={showInStockOnly} onChange={handleStockChange}>
          فقط کالاهای موجود
        </Checkbox>
      </div>
    </div>
  );
};

export default Filter;
