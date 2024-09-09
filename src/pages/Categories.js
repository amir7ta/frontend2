import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/category.scss';

const categories = [
  {
    title: 'Category 1',
    imagePath: 'https://via.placeholder.com/50',
    route: '/category1',
    subcategories: [
      { title: 'Subcategory 1-1', imagePath: 'https://via.placeholder.com/50', route: '/category1/subcategory1-1' },
      { title: 'Subcategory 1-2', imagePath: 'https://via.placeholder.com/50', route: '/category1/subcategory1-2' },
      { title: 'Subcategory 1-3', imagePath: 'https://via.placeholder.com/50', route: '/category1/subcategory1-3' },
    ],
  },
  {
    title: 'Category 2',
    imagePath: 'https://via.placeholder.com/50',
    route: '/category2',
    subcategories: [
      { title: 'Subcategory 2-1', imagePath: 'https://via.placeholder.com/50', route: '/category2/subcategory2-1' },
      { title: 'Subcategory 2-2', imagePath: 'https://via.placeholder.com/50', route: '/category2/subcategory2-2' },
      { title: 'Subcategory 2-3', imagePath: 'https://via.placeholder.com/50', route: '/category2/subcategory2-3' },
    ],
  },
  {
    title: 'Category 3',
    imagePath: 'https://via.placeholder.com/50',
    route: '/category3',
    subcategories: [
      { title: 'Subcategory 3-1', imagePath: 'https://via.placeholder.com/50', route: '/category3/subcategory3-1' },
      { title: 'Subcategory 3-2', imagePath: 'https://via.placeholder.com/50', route: '/category3/subcategory3-2' },
      { title: 'Subcategory 3-3', imagePath: 'https://via.placeholder.com/50', route: '/category3/subcategory3-3' },
    ],
  },
];


const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 845) {
        navigate('/'); // ریدایرکت به صفحه اصلی
      }
    };

    window.addEventListener('resize', handleResize);

    // بررسی اولیه عرض صفحه هنگام بارگذاری کامپوننت
    handleResize();

    // پاک کردن رویداد هنگام تخریب کامپوننت
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);
  return (
    <div className="category-container">
      <div className="category-sidebar">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-tab ${selectedCategory === index ? 'active' : ''}`}
            onClick={() => setSelectedCategory(index)}
          >
            <img src={category.imagePath} alt={category.title} className="category-tab-icon" />
            {category.title}
          </div>
        ))}
      </div>
      <div className="category-content">
        {selectedCategory !== null && (
          <div className="category-subcategories">
            {categories[selectedCategory].subcategories.map((subcategory, index) => (
              <div key={index} className="category-subcategory-item">
                <img src={subcategory.imagePath} alt={subcategory.title} />
                <span>{subcategory.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
