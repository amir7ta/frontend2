import React from 'react';

const categories = [
  { name: 'دسته‌بندی ۱', imageUrl: 'path/to/image1.jpg' },
  { name: 'دسته‌بندی ۲', imageUrl: 'path/to/image2.jpg' },
  { name: 'دسته‌بندی ۳', imageUrl: 'path/to/image3.jpg' },
  // Add more categories as needed
];

const CategorySection = () => {
  return (
    <div className="category-section">
      <h2>خرید بر اساس دسته‌بندی</h2>
      <div className="categories">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <img src={category.imageUrl} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
