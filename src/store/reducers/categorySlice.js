import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryApi from '../../utils/api/categoryApi';


export const fetchCategoryForMenu = createAsyncThunk('categories/fetchCategoryForMenu', async () => {
  const models = await categoryApi.getCategoriesForMenu();
  return models;
});

export const fetchCategoriesHirearchyByRoute = createAsyncThunk('categories/fetchCategoriesHirearchyByRoute', async (categoryRoute) => {
  
  const models = await categoryApi.getCategoriesHirearchyByRoute(categoryRoute);
  return models;
});

export const fetchAllCategory = createAsyncThunk('categories/fetchAllCategory', async () => {
  const models = await categoryApi.getCategories();
  return models;
});


export const fetchCategoryBreadCrumb = createAsyncThunk('categories/fetchCategoryBreadCrumb', async (route) => {
  const breads = await categoryApi.getCategoryBreadCrumb(route);
  return breads;
});

export const fetchProductBreadCrumb = createAsyncThunk('categories/fetchProductBreadCrumb', async (productId) => {
  const breads = await categoryApi.getProductBreadCrumb(productId);
  return breads;
});


export const createCategory = createAsyncThunk('categories/createCategory', async (category) => {
  const formData = new FormData();  // تعریف formData در اینجا
  formData.append('categoryId', '');
  formData.append('title', category.title);
  formData.append('parentCategoryId', category.parentCategoryId ?? '');
  formData.append('route', category.route);
  formData.append('image', category.image);  // اضافه کردن فایل تصویر به FormData
  formData.append('imagePath', category.imagePath);  // اضافه کردن فایل تصویر به FormData
  const created = await categoryApi.addCategory(formData);
  return created;
});

export const activeCategory = createAsyncThunk('categories/activeCategory', async (categoryId) => {
  
  const result = await categoryApi.activeCategory(categoryId);
  return result;
});

export const deactiveCategory = createAsyncThunk('categories/deactiveCategory', async (categoryId) => {
  
  const result = await categoryApi.deactiveCategory(categoryId);
  return result;
});

export const updateExistingCategory = createAsyncThunk('categories/updateExistingCategory', async ({ categoryId, category }) => {
  const formData = new FormData();
  
  // اضافه کردن فیلدهای دسته بندی به FormData
  formData.append('categoryId', category.categoryId);
  formData.append('title', category.title);
  formData.append('parentCategoryId', category.parentCategoryId ?? '');
  formData.append('route', category.route);
  formData.append('image', category.image);  // اضافه کردن فایل تصویر به FormData
  formData.append('imagePath', category.imagePath);  // اضافه کردن فایل تصویر به FormData
  const updated = await categoryApi.updateCategory(categoryId, formData);
  return updated;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
  const deleted = await categoryApi.deleteCategory(categoryId);
  return deleted;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    categoriesForMenu: [],
    categoriesHirearchyForFilter:[],
    breadCrumbs:[],
    categoryBreadCrumbs:[],
    loading: false,
    error: false,
    status: 'idle'
  },
  reducers: {
    setLoad(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryForMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryForMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categoriesForMenu = action.payload;
      })
      .addCase(fetchCategoryForMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategoriesHirearchyByRoute.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesHirearchyByRoute.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categoriesHirearchyForFilter = action.payload;
      })
      .addCase(fetchCategoriesHirearchyByRoute.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductBreadCrumb.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductBreadCrumb.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.breadCrumbs = action.payload;
      })
      .addCase(fetchProductBreadCrumb.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(fetchCategoryBreadCrumb.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryBreadCrumb.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categoryBreadCrumbs = action.payload;
      })
      .addCase(fetchCategoryBreadCrumb.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateExistingCategory.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(updateExistingCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(updateExistingCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(activeCategory.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(activeCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(activeCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deactiveCategory.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(deactiveCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(deactiveCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      })
    },
  });
  
export const {
  setLoad,
  setError,
} = categorySlice.actions;
export const selectCategoriesHirearchyForFilter = (state) => state.category.categoriesHirearchyForFilter;
export const selectCategoriesForMenu = (state) => state.category.categoriesForMenu;
export const selectCategoryLoading = (state) => state.category.loading;
export const selectCategoryError = (state) => state.category.error;
export const selectCategories = (state) => state.category.categories;
export const selectProductBreadCrumbs = (state) => state.category.breadCrumbs;
export const selectCategoryBreadCrumbs = (state) => state.category.categoryBreadCrumbs;

export default categorySlice.reducer;
