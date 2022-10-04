import React from "react";

export default function ProductDetails({ product, open, close }) {
  return (
    <div
      className={`productDetails ${
        open ? "productDetails__active" : "productDetails__inactive"
      }`}
    >
      <div
        className={`productDetails__modal ${
          open
            ? "productDetails__modal-active"
            : "productDetails__modal-inactive"
        }`}
      >
        <div className="productDetails__modal-left">
          {<img src={product?.image} alt="" />}
        </div>
        <div className="productDetails__modal-right">
          <div className="productDetails__modal-close">
            <i onClick={close} class="fa-solid fa-xmark"></i>
          </div>
          <div className="productDetails__modal-status">
            <span>Status: </span>
            {product?.status}
          </div>
          <div className="productDetails__modal-name">{product?.name}</div>
          <div className="productDetails__modal-sku">
            <span> SKU: </span>
            {product?.sku}
          </div>
          <div className="productDetails__modal-price">£{product?.price}</div>
          <div className="productDetails__modal-quantity">
            {Number(product?.quantity) <= 0 ? (
              <span className="productDetails__modal-quantity-outofstuck">
                Out of stuck
              </span>
            ) : (
              <span className="productDetails__modal-quantity-inStock">
                In stock
              </span>
            )}

            <span>Quantity: {product?.quantity}</span>
          </div>
          <div className="productDetails__modal-description">
            {product?.description}
          </div>
          <div className="productDetails__modal-category">
            <span>Category: </span>
            {product?.category}
          </div>
          <div className="productDetails__modal-edit">
            <button>Edit Product</button>
          </div>
        </div>
      </div>
    </div>
  );
}
