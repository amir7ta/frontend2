import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import productApi from '../../utils/api/productApi';
import sizeApi from '../../utils/api/sizeApi';
import imageApi from '../../utils/api/imageApi';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await productApi.getProducts();
    const productSizes = await sizeApi.getProductSizes();
    const productSizesMap = productSizes.reduce((map, size) => {
      if (!map[size.productId]) {
        map[size.productId] = [];
      }
      map[size.productId].push(size);
      return map;
    }, {});

    const productsWithSizes = await Promise.all(products.map(async (product) => {
      const { productId } = product;
      const sizes = productSizesMap[productId] || [];
      const minPrice = Math.min(...sizes.map(({ price }) => price));
      const inStock = sizes.length > 0;
      return { ...product, sizes, defaultPrice: minPrice, inStock };
    }));

    return productsWithSizes;
  }
);

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId) => {
  debugger
  const productDetail = await productApi.getProduct(productId);
  const sizes = await sizeApi.getProductSizesByProductId(productId);
  const minPrice = Math.min(...sizes.map(({ price }) => price));
  const inStock = sizes.length > 0;
  const images = await imageApi.geImagesByProductId(productId);
  return { ...productDetail, sizes, defaultPrice: minPrice, inStock, images };
});

export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
  const createdProduct = await productApi.addProduct(product);
  return createdProduct;
});

export const updateExistingProduct = createAsyncThunk(
  'products/updateExistingProduct',
  async ({ productId, product }) => {
    const updatedProduct = await productApi.updateProduct(productId, product);
    return updatedProduct;
  }
);

export const removeProduct = createAsyncThunk('products/removeProduct', async (productId) => {
  const deletedProduct = await productApi.deleteProduct(productId);
  return deletedProduct;
});

export const fetchProductDetail = createAsyncThunk('products/fetchProductDetail', async (productId) => {
    debugger
    const response = await productApi.getProduct(productId);
    
    const sizes = await sizeApi.getProductSizesByProductId(productId);
    const minPrice = Math.min(...sizes.map(({ price }) => price));
    const inStock = sizes.length > 0;
    const images = await imageApi.geImagesByProductId(productId);
   debugger

    const productDetail = {
      ...response,
      sizes,
      defaultPrice: minPrice, // Use defaultPrice instead of minPrice
      inStock,
      images
    };
    return productDetail;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState:{
                products: [],
                loading: false,
                error: null,
                status: 'idle',
                productDetail:null,
                filter: {
                  minPrice: null,
                  maxPrice: null,
                  sizes: [],
                }
              },
  reducers: {
    filterProducts: (state, action) => {
      const { minPrice, maxPrice, sizes } = action.payload;
      state.products = state.products.filter(product => {
        const isInPriceRange = (minPrice === null || product.defaultPrice >= minPrice) && (maxPrice === null || product.defaultPrice <= maxPrice);
        const hasSize = sizes.length === 0 || product.sizes.some(size => sizes.includes(size));
        return isInPriceRange && hasSize;
      });
    },   
    searchProducts: (state, action) => {
      const query = action.payload.toLowerCase();
      const originalProducts = state.originalProducts || state.products;
      const filteredProducts = originalProducts.filter(product => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      });
      state.products = filteredProducts;
      state.originalProducts = originalProducts;
      if (query.length === 0) {
        state.products = originalProducts;
        state.originalProducts = null;
      }
    },    
  },
    setLoad: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        debugger
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      ;
  },
});

export const {
  loadProducts,
  filterProducts,
  searchProducts,
  setLoad,
  setError,
  
} = productSlice.actions;

export const productDetail = (state) => {debugger ; state.product.productDetail};
export const loading = (state) => state.product.loading;
export const error = (state) => state.product.error;

export default productSlice.reducer;