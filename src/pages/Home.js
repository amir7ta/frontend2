import React, { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '../assets/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useToggle from '../utils/hooks/useUtil';
import LoadingModal from "../components/common/LoadingModal";
import { selectSpecialProducts, selectProducts, fetchProducts, selectLoading, selectError, fetchSpecialProducts } from '../store/reducers/productSlice';

import CategorySection from '../components/home/CategorySection';
import AmazingOffersSlider from '../components/home/AmazingOffersSlider';

function Home() {
  const { toggle, isToggled } = useToggle();
  const { minPrice: filterMinPrice, maxPrice: filterMaxPrice } = useSelector((state) => state.product.filter);

  const [minPrice, setMinPrice] = useState(filterMinPrice || '');
  const [maxPrice, setMaxPrice] = useState(filterMaxPrice || '');
  const [sortOrder, setSortOrder] = useState('asc');
  const [size, setSize] = useState('');

 
  // const products = useSelector(selectProducts);
  const specialProducts = useSelector(selectSpecialProducts);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    const filterRequest = {
      name: '',
      page: 1,
      minPrice: '',
      maxPrice: '',
      brand: ''
  };
    dispatch(fetchSpecialProducts(filterRequest));
  }, [dispatch]);

  if (error) {
    return <div>خطا: {error}</div>;
  }


  const filteredSpecialProducts = specialProducts ? specialProducts.filter((product) => {
    const minPriceFilter = minPrice === '' || product.defaultPrice >= parseFloat(minPrice);
    const maxPriceFilter = maxPrice === '' || product.defaultPrice <= parseFloat(maxPrice);
    const sizeFilter = size === '' || product.sizes.map(ps => ps.size).includes(parseInt(size));
    return minPriceFilter && maxPriceFilter && sizeFilter;
  }).sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.defaultPrice - b.defaultPrice;
    } else if (sortOrder === 'highToLow') {
      return b.defaultPrice - a.defaultPrice;
    } else {
      return 0;
    }
  }) : [];

  return (
    <div className='shop'>
      <LoadingModal loading={loading} />
      <AmazingOffersSlider products={filteredSpecialProducts.slice(0, 10)} />

      <CategorySection />
    </div>
  );
}

export default Home;
