// src/components/AdminPanel.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllCategory,
  createCategory,
  updateExistingCategory,
  deleteCategory,
} from '../../store/reducers/categorySlice';
import DynamicGridComponent  from '../common/Grid'
const AdminPanel = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);

  const [categoryName, setCategoryName] = useState('');
  const [route, setRoute] = useState('');
  const [parentId, setParentId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategoryId) {
      dispatch(updateExistingCategory({ categoryId: selectedCategoryId, category: { title: categoryName, ParentCategoryId: parentId } }));
    } else {
      dispatch(createCategory({ title: categoryName, ParentCategoryId: parentId }));
    }
    closeModal();
  };

  const handleEdit = (category) => {
    setRoute(category.route);
    setCategoryName(category.title);
    setParentId(category.parentCategoryId);
    setSelectedCategoryId(category.categoryId);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('آیا از حذف این دسته‌بندی مطمئن هستید؟')) {
      dispatch(deleteCategory(id));
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCategoryName('');
    setRoute('');
    setParentId(null);
    setSelectedCategoryId(null);
    setIsModalOpen(false);
  };
  const columns = [
    { label: 'کد', key: 'categoryId' },
    { label: 'نام', key: 'title' },
    { label: 'کد پدر', key: 'parentCategoryId' }
  ];
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>پنل مدیریت دسته‌بندی‌ها</h1>
      <DynamicGridComponent initialData={categories} columns={columns} rowsPerPage={20} />

    </div>
  );
};

export default AdminPanel;
