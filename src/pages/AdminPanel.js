import React, { useState } from 'react';
import Users from '../components/admin/UsersTable';
import Orders from '../components/admin/OrdersTable';
import Products from '../components/admin/ProductsTable';
import Categories from '../components/admin/CategoryTable';
import '../styles/admin.scss';

const tabs = ['Products', 'Orders', 'Users','Category'];

function AdminPanel() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="admin admin-container">
      <ul>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={index === activeTab ? 'active' : ''}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </li>
        ))}
      </ul>
      {activeTab === 0 && <Products />}
      {activeTab === 1 && <Orders />}
      {activeTab === 2 && <Users />}
      {activeTab === 3 && <Categories />}

    </div>
  );
}



export default AdminPanel