import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SpecificationsTab = () => {
  const { productId } = useParams();
  const [specifications, setSpecifications] = useState([]);

  useEffect(() => {
    fetch(`/api/products/specifications/${productId}`)
      .then((response) => response.json())
      .then((data) => setSpecifications(data));
  }, [productId]);

  return (
    <div className="specifications-tab">
      <h2>مشخصات</h2>
      <ul>
        {specifications.map((spec) => (
          <li key={spec.id}>
            <span className="spec-title">{spec.title}</span>
            <span className="spec-value">{spec.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecificationsTab;