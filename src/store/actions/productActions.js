
import { createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../utils/api/productApi';
import sizeApi from '../../utils/api/sizeApi';

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
    const productsWithSizes = products.map(product => {
      const { productId } = product;
      const sizes = productSizesMap[productId] || [];
      const minPrice = Math.min(...sizes.map(({ price }) => price));
      const inStock = sizes.length > 0;
      return { ...product, sizes, defaultPrice: minPrice, inStock };
    });
    return productsWithSizes;
  }
);


  export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId) => {
    const product = await productApi.getProduct(productId);
    return product;
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