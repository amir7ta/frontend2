import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import brandApi from '../../utils/api/brandApi';


export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  const models = await brandApi.getBrands();
  return models;
});


const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [],
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
      .addCase(fetchBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    },
  });
  
export const {
  setLoad,
  setError,
} = brandSlice.actions;
export const selectBrands = (state) => state.brand.brands;
export const selectCategoryLoading = (state) => state.category.loading;
export const selectCategoryError = (state) => state.category.error;

export default brandSlice.reducer;
