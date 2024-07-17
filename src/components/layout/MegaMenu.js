import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { selectCategoriesForMenu, fetchCategoryForMenu, selectCategoryLoading, selectCategoryError } from '../../store/reducers/categorySlice';
import LoadingModal from "../common/LoadingModal";

// const categories = [
//   {
//     title: 'Category 1',
//     imagePath: 'https://via.placeholder.com/50',
//     route: '/category1',
//     subcategories: [
//       { title: 'Subcategory 1-1', imagePath: 'https://via.placeholder.com/50', route: '/category1/subcategory1-1' },
//       { title: 'Subcategory 1-2', imagePath: 'https://via.placeholder.com/50', route: '/category1/subcategory1-2' },
//       { title: 'Subcategory 1-3', imagePath: 'https://via.placeholder.com/50', route: '/category1/subcategory1-3' },
//     ],
//   },
//   {
//     title: 'Category 2',
//     imagePath: 'https://via.placeholder.com/50',
//     route: '/category2',
//     subcategories: [
//       { title: 'Subcategory 2-1', imagePath: 'https://via.placeholder.com/50', route: '/category2/subcategory2-1' },
//       { title: 'Subcategory 2-2', imagePath: 'https://via.placeholder.com/50', route: '/category2/subcategory2-2' },
//       { title: 'Subcategory 2-3', imagePath: 'https://via.placeholder.com/50', route: '/category2/subcategory2-3' },
//     ],
//   },
//   {
//     title: 'Category 3',
//     imagePath: 'https://via.placeholder.com/50',
//     route: '/category3',
//     subcategories: [
//       { title: 'Subcategory 3-1', imagePath: 'https://via.placeholder.com/50', route: '/category3/subcategory3-1' },
//       { title: 'Subcategory 3-2', imagePath: 'https://via.placeholder.com/50', route: '/category3/subcategory3-2' },
//       { title: 'Subcategory 3-3', imagePath: 'https://via.placeholder.com/50', route: '/category3/subcategory3-3' },
//     ],
//   },
// ];

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
                          <a href={child.route} className="subcategory-link" key={child.title}>
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
