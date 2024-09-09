import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { selectCategoriesForMenu, fetchCategoryForMenu, selectCategoryLoading, selectCategoryError } from '../../store/reducers/categorySlice';
import LoadingModal from "../common/LoadingModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesForMenu);
  const error = useSelector(selectCategoryError);
  const loading = useSelector(selectCategoryLoading);

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
      setIsMegaMenuOpen(false);
    }
  };

  useEffect(() => {
      dispatch(fetchCategoryForMenu())
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (error) {
    return <div>خطا: {error}</div>;
  }

  return (
    <>
    <LoadingModal loading={loading} />

    <nav className="navbar">
      <ul className="navbar-links">
        <li className="navbar-item">
          <button className="mega-menu-button" onClick={toggleMegaMenu}>
            <svg className="hamburger-icon">
              <use xlinkHref="#hamburgerMenu"></use>
            </svg>
            دسته بندی کالاها
          </button>
          {isMegaMenuOpen && (
            <>
              <div className={`overlay ${isMegaMenuOpen ? 'show' : ''}`} onClick={toggleMegaMenu}></div>
              <div ref={megaMenuRef} className={`mega-menu ${isMegaMenuOpen ? 'show' : ''}`}>
                <div className="mega-menu-content">
                  <div className="mega-menu-grid">
                    {categories.map((category) => (
                      <div className="mega-menu-section" key={category.title}>
                        <a href={`/shop/${category.route}`} className="category-title">
                          {category.title}
                          <svg width="20" height="20"><use xlinkHref="#chevronLeft"></use></svg>
                        </a>
                        {category.childCategories && category.childCategories.map((child) => (
                          <a href={`/shop/${child.route}`} className="subcategory-link" key={child.title}>
                            {child.title}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </li>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
    </>
  );
};

export default Navbar;
