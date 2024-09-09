import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../utils/api/productApi';
import sizeApi from '../../utils/api/sizeApi';

export const fetchMoreProducts = createAsyncThunk('products/fetchMoreProducts', async ({filterRequest}) => {
  const data = await productApi.getProducts(filterRequest);
  const totalPage = data.totalPage;
  const currentPage = data.page;
  const totalCount = data.totalCount;
  const productsWithSizes = await Promise.all(data.products.map(async (product) => {
    const minPrice =product.sizes.length>0 ? Math.min(...product.sizes.map(({ price }) => price)):0;
    const inStock = product.sizes.length > 0;
    const images = product.productImages;
    const mainImage = images && images.length > 0 
    ? (images.find(image => image.isMainImage)?.path || images[0].path)
    : 'images/products/noimage.png';
    return { ...product, defaultPrice: minPrice, inStock, images, mainImage };
  }));
  return {productsWithSizes , totalPage, currentPage, totalCount};
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({filterRequest}) => {
  const data = await productApi.getProducts(filterRequest);
  const totalPage = data.totalPage;
  const currentPage = data.page;
  const totalCount = data.totalCount;

  const productsWithSizes = await Promise.all(data.products.map(async (product) => {
    const minPrice =product.sizes.length>0 ? Math.min(...product.sizes.map(({ price }) => price)):0;
    const inStock = product.sizes.length > 0;
    const images = product.productImages;
    const mainImage = images && images.length > 0 
    ? (images.find(image => image.isMainImage)?.path || images[0].path)
    : 'images/products/noimage.png';
    return { ...product, defaultPrice: minPrice, inStock, images, mainImage };
  }));
  return {productsWithSizes , totalPage, currentPage, totalCount};
});

export const fetchSpecialProducts = createAsyncThunk('products/fetchSpecialProducts', async () => {
   const filterRequest = {
    isSpecialOffer: true,
  };
 // ترکیب پارامترهای پیش‌فرض با پارامترهای ورودی
  const data = await productApi.getProducts(filterRequest);
  if(data.products.length == 0) return false;
  const productIds = data.products.map(product =>  product.productId);
    const productSizes = await sizeApi.getProductSizesByProductId(productIds);
    const productSizesMap = productSizes.reduce((map, size) => {
      if (!map[size.productId]) {
        map[size.productId] = [];
      }
      map[size.productId].push(size);
      return map;
    }, {});
  const productsWithSizes = await Promise.all(data.products.map(async (product) => {
    const { productId } = product;
    const sizes = productSizesMap[productId] || [];
    const minPrice = Math.min(...sizes.map(({ price }) => price));
    const inStock = sizes.length > 0;
    const images = product.productImages;
    const mainImage = images && images.length > 0 
    ? (images.find(image => image.isMainImage)?.path || images[0].path)
    : 'images/products/noimage.png';
    return { ...product, sizes, defaultPrice: minPrice, inStock, images, mainImage };
  }));

  return productsWithSizes;
});


export const fetchProductBreadCrumb = createAsyncThunk('products/fetchProductBreadCrumb', async (productId) => {
  const breads = await productApi.getProductBreadCrumb(productId);
  return breads;
});


export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
  const createdProduct = await productApi.addProduct(product);
  return createdProduct;
});

export const updateExistingProduct = createAsyncThunk('products/updateExistingProduct', async ({ productId, product }) => {
  const updatedProduct = await productApi.updateProduct(productId, product);
  return updatedProduct;
});

export const removeProduct = createAsyncThunk('products/removeProduct', async (productId) => {
  const deletedProduct = await productApi.deleteProduct(productId);
  return deletedProduct;
});

export const fetchProductDetail = createAsyncThunk('products/fetchProductDetail', async (productId) => {
  const response = await productApi.getProduct(productId);
  const sizes = response.sizes;//await sizeApi.getProductSizesByProductId(productId);
  const minPrice = Math.min(...sizes.map(({ price }) => price));
  const defaultSize = sizes.find(s=>s.price == minPrice);
  const specifications = response.specifications;//await sizeApi.getProductSizesByProductId(productId);

  const inStock = sizes.length > 0;
  const images = response.productImages;
  const mainImage = images && images.length > 0 
  
  ? (images.find(image => image.isMainImage)?.path || images[0].path)
  : 'images/products/noimage.png';
    const productDetail = {
    ...response,
    sizes,
    specifications,
    defaultPrice: minPrice,
    inStock,
    mainImage,
    images,
    defaultSize
  };
  console.log("response : ", response);
  if (response && mainImage) {
    console.log("Product detail is fetched");
  } else {
    console.error("Product detail is missing main image");
  }

  return productDetail;
});


const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    moreProducts:[],
    loading: false,
    error: false,
    status: 'idle',
    productDetail: null,
    filter: {
      minPrice: null,
      maxPrice: null,
      sizes: [],
    },
  },
  reducers: {
    filterProducts: (state, action) => {
      const { minPrice, maxPrice, sizes } = action.payload;
      state.products = state.products.filter((product) => {
        const isInPriceRange = (minPrice === null || product.defaultPrice >= minPrice) && (maxPrice === null || product.defaultPrice <= maxPrice);
        const hasSize = sizes.length === 0 || product.sizes.some((size) => sizes.includes(size));
        return isInPriceRange && hasSize;
      });
    },
    searchProducts: (state, action) => {
      const query = action.payload.toLowerCase();
      const originalProducts = state.originalProducts || state.products;
      const filteredProducts = originalProducts.filter((product) => {
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
    setLoad: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.error ='';
       
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      
      })
      .addCase(fetchMoreProducts.pending, (state) => {
        state.status = 'loadingMore';
      })
      .addCase(fetchMoreProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.moreProducts = action.payload;
        state.error ='';
     
      })
      .addCase(fetchMoreProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
     
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetail = action.payload;
        state.error ='';
      
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductBreadCrumb.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductBreadCrumb.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.breadCrumbs = action.payload;
        state.error ='';
      })
      .addCase(fetchProductBreadCrumb.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSpecialProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpecialProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.specialProducts = action.payload;
      })
      .addCase(fetchSpecialProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  filterProducts,
  searchProducts,
  setLoad,
  setError,
} = productSlice.actions;
export const selectProductDetail = (state) => state.product.productDetail;
export const selectLoading = (state) => state.product.loading;
export const selectStatus = (state) => state.product.status;
export const selectError = (state) => state.product.error;
export const selectProducts = (state) => state.product.products;
export const selectMoreProducts = (state) => state.product.moreProducts;
export const selectBreadCrumbs = (state) => state.product.breadCrumbs;
export const selectSpecialProducts = (state) => state.product.specialProducts;

export default productSlice.reducer;
