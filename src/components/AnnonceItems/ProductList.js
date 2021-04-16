import React from "react";
import ProductConsumer  from './context';
import { Product } from "./Product";

 const ProductList = () => {
  return (
    <>
      <div className="py-5">
        <div className="container">
       <h1>Products</h1>
          <div className="row" />
          <ProductConsumer>
            {value => {
             return value.products.map(product => {
                return <Product key={product.id} product={product} />;
              });
            }}
          </ProductConsumer>
        </div>
      </div>
    </>
  );
};
export default ProductList