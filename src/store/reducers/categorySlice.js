import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryApi from '../../utils/api/categoryApi';


export const fetchCategoryForMenu = createAsyncThunk('categories/fetchCategoryForMenu', async () => {
  const models = await categoryApi.getCategoriesForMenu();
  return models;
});

export const fetchAllCategory = createAsyncThunk('categories/fetchAllCategory', async () => {
  const models = await categoryApi.getCategories();
  return models;
});


export const fetchProductBreadCrumb = createAsyncThunk('categories/fetchProductBreadCrumb', async (productId) => {
  const breads = await categoryApi.getProductBreadCrumb(productId);
  return breads;
});


export const createCategory = createAsyncThunk('products/createCategory', async (product) => {
  const createdProduct = await categoryApi.addProduct(product);
  return createdProduct;
});

export const updateExistingCategory = createAsyncThunk('products/updateExistingCategory', async ({ productId, product }) => {
  const updated = await categoryApi.updateProduct(productId, product);
  return updated;
});

export const removeProduct = createAsyncThunk('products/removeProduct', async (productId) => {
  const deletedProduct = await productApi.deleteProduct(productId);
  return deletedProduct;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    categoriesForMenu: [],
    breadCrumbs:[],
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
    },
  });
  
export const {
  setLoad,
  setError,
} = categorySlice.actions;
export const selectCategoriesForMenu = (state) => state.category.categoriesForMenu;
export const selectCategoryLoading = (state) => state.category.loading;
export const selectCategoryError = (state) => state.category.error;
export const selectCategories = (state) => state.category.categories;
export const selectCategoryBreadCrumbs = (state) => state.category.breadCrumbs;

export default categorySlice.reducer;
