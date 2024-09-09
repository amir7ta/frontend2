import { createSlice } from '@reduxjs/toolkit';



const filterSlice = createSlice({
  name: 'filters',
  initialState:{
    params:{},
    resetFilters:null
    // categoryRoute: '',
    // inStock: false,
    // brands: [],
    // minPrice:null,
    // maxPrice:null,
    // page:null,
    // pageSize:null,
    // sort:1,
    // urlInit: true,
    // byUser:false
    // sort:null,
    // page:null
  },
  reducers: {
    setCategoryRoute(state, action) {
      state.params.Categoryroute = action.payload;
    },
    setPage(state, action) {
      state.params.page = action.payload;
    },
    setSort(state, action) {
      state.params.sort = action.payload;
    },
    setMinPrice(state, action) {
      state.params.minPrice = action.payload;
    },
    setMaxPrice(state, action) {
      state.params.maxPrice = action.payload;
    },
    setInStock(state, action) {
      state.params.inStock = action.payload;
    },
    setBrands(state, action) {
      state.params.brands = action.payload;
    },
    setFilters(state, action) {
      Object.assign(state.params, action.payload);
    },
    setResetFilters(state, action) {
      state.resetFilters = action.payload;
    },
  },
});

export const { setCategoryRoute, setMinPrice, setMaxPrice, setInStock, setBrands, setFilters, setPage, setSort, setResetFilters } = filterSlice.actions;
export const selectFilters = (state) => state.filters.params;
export const selectResetFilters = (state) => state.filters.resetFilters;

export default filterSlice.reducer;
