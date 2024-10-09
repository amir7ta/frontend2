import React, { useEffect, useState } from 'react';
import ProductSizes from './SizesTable';
import { useStock } from '../../utils/hooks/useUtil';
import {
  selectProducts,
  selectMoreProducts,
  selectLoading,
  selectError,
  selectStatus,
  fetchMoreProducts,
  fetchProducts,
} from "../../store/reducers/productSlice";
import { useDispatch, useSelector } from 'react-redux';

function Products() {
  const products = useSelector(selectProducts);
  const moreProducts = useSelector(selectMoreProducts);
  const loading = useSelector(selectLoading);
  const apiStatus = useSelector(selectStatus);
  const error = useSelector(selectError);
  
  const [localProduct, setLocalProduct] = useState({});
  const getStock = useStock();
  const product = products.find((product) => product?.productId === localProduct?.productId);
  const filtersFromParams = {
    // minPrice: params.get("minprice"),
    // maxPrice: params.get("maxprice"),
    // inStock: params.get("instock") === "true",
    // brands: [],
    // categoryRoute,
    // sort: params.get("sort") ? parseInt(params.get("sort"), 10) : null,
    // page: params.get("page"),
    // pageSize: params.get("pagesize"),
  };
  const mapProduct=(prod)=>{
    console.log(prod)
    return ( 
            <tr key={index}  onClick={() => setLocalProduct(prod)}>         
              <td>{prod.productId}</td>
              <td>{prod.brand} {prod.name}</td>
              <td>{getStock(prod.inStock)}</td>
            </tr>
          )
  }
  useEffect(() => {
    fetchProducts();
  }, [products])
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalProduct(prevState => ({ ...prevState, [name]: value }));
  };  

  return (
    <div className="admin-product">
        <table className='product-table'>
            <thead>
                <tr>
                  <th>کد محصول</th>
                  <th>مدل</th>
                  <th>موجودی</th>
                </tr>
            </thead>
            <tbody>
                {products.map((pp, index) => (
                  mapProduct(pp)
               
                ))}
            </tbody>
        </table>
        <div className='product-panel'>
              <h2>{localProduct?.brand} {localProduct?.name}</h2>
              {product && (
                <div className='product-panel-img'>
                  <img src={localProduct?.imageURL} alt="" />
                </div>
              )
              }
              <div className="product-panel-info">
                { product && ( <label className='label-small'>
                  کد محصول
                  <input value={localProduct?.productId} readOnly/>
                </label>)}
                <label>
                    برند
                  <input id="productBrand" name="brand" maxLength="50" value={localProduct?.brand || ''} onChange={handleInputChange} />
                </label>
                <label>
                  مدل
                  <input id="productName" name="name" maxLength="100" value={localProduct?.name || ''} onChange={handleInputChange}/>
                </label>
              </div>
              <label htmlFor="">
                  توضیحات
                  <textarea id="productDescription" name="description" maxLength="500" rows="4" value={localProduct?.description || ''} onChange={handleInputChange}></textarea>
              </label>
            <label>
                تصویر
                <input id="productImageURL" name="imageURL" maxLength="100" value={localProduct?.imageURL || ''} onChange={handleInputChange}/>
            </label>
            <div className='divider'>
                <button className='second-button' onClick={() => setLocalProduct(null) }>CLEAR</button>
                { product && (<button className='second-button' onClick={() => removeProduct(product?.productId)}>DELETE</button>)}
                { product?.productId && (<button onClick={() => updateExistingProduct({ productId: product?.productId, product: localProduct })}>SAVE CHANGES</button>)}
                { !product?.productId && (<button onClick={() => createProduct(localProduct)}>Add Product</button>)}
            </div>
            {product && (<ProductSizes product={product} />)}
        </div> 
    </div>
  );
}

export default Products;
