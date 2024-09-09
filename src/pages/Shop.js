import React,{useEffect} from 'react'
import ProductGrid from '../components/product/ProductList'
import { useParams, NavLink ,useNavigate } from "react-router-dom";
import {  selectCategoryBreadCrumbs} from '../store/reducers/categorySlice';
import {  setResetFilters} from '../store/reducers/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryRounded } from '@mui/icons-material';
import '../styles/product.scss';

// import Time from 'react-time';

function Shop() {
  const breadCrumbs = useSelector(selectCategoryBreadCrumbs);
  // const { categoryRoute } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   // useEffect(() => {
  //   if(categoryRoute)
  //   {
  //     dispatch(fetchCategoryBreadCrumb(categoryRoute))
  //   }
  // }, [categoryRoute]);
  // useEffect(() => {
  //   if(breadCrumbs)
  //   {
  //     console.log(breadCrumbs)
  //   }
  // }, [filters]);

  const ResetFilter= () => {
    //dispatch(fetchCategoryBreadCrumb(selectedBread.route));
    navigate("/shop")
    dispatch(setResetFilters(new Date()));
    
  };
  return (
    <div className='shop-container'>
     <div className="breadCrums-container">
        {/* نمایش breadcrumb به عنوان لیست */}
        <ul>
            <li><NavLink to="/">صفحه اصلی</NavLink></li>
            <li><a onClick={ResetFilter} >تمام محصولات</a></li>

            {breadCrumbs && breadCrumbs.map((item, index) => (
                <li key={index}>
                    {/* <a onClick={()=>handleBreadCrumbChange(item)}>{item.title}</a> */}
                    {/* <NavLink to={`/shop/${item.route}`}>{item.title}</NavLink> */}
                    <a href={`/shop/${item.route}`} >
                              {item.title}
                            </a>
                </li>
                ))}
            </ul>
      </div>
    <ProductGrid />
    </div>
    )
}

export default Shop