import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from "../../components/common/LoadingModal";
import { selectCategoriesForMenu  , selectCategoryLoading, selectCategoryError, fetchCategoryForMenu } from '../../store/reducers/categorySlice';

const CategorySection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryForMenu());
  }, [dispatch]);

  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);
  const categoriesForMenu =  useSelector(selectCategoriesForMenu);

  // useEffect(() => {
  //   if(categoriesForMenu)
  //   categoriesForMenu.map((category, index) => (console.log(category)))
  // }, [categoriesForMenu]);
  if (error) {
    return <div>خطا: {error}</div>;
  }

  return (
    <>
    <LoadingModal loading={loading} />
    <div className="category-section">
      <span className='category-section-title'>خرید بر اساس دسته‌بندی</span>
      <div className="categories">
        {categoriesForMenu.map((category, index) => ( 
          <div className="category-card" key={index}>
            <img src={category.imagePath} alt={category.title} />
            <span className='category-title'>{category.title}</span>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default CategorySection;
