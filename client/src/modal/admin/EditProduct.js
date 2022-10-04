import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { editProduct } from "../../actions/productActions";

export default function EditProduct({ open, close, product }) {
  const [productId, setProductId] = useState("");
  const [image, setImage] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [status, setStatus] = useState("");
  const [imageLoad, setImageLoad] = useState(false);
  const [imageError, setImageError] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setSellerId(userInfo._id);
      setSellerName(userInfo.firstName + " " + userInfo.lastName);
    }
    if (product) {
      setProductId(product._id);
      setImage(product.image);
      setSku(product.sku);
      setBrand(product.brand);
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setQuantity(product.quantity);
      setPrice(product.price);
      setSale(product.sale);
      setStatus(product.status);
    }
  }, [userInfo, product]);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setImageLoad(true);
    try {
      const { data } = await axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setImageLoad(false);
    } catch (error) {
      setImageError(error.message);
      setImageLoad(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProduct({
        productId,
        image,
        sku,
        brand,
        name,
        description,
        category,
        quantity,
        price,
        sale,
        sellerId,
        sellerName,
        status,
      })
    );
  };

  return (
    <div
      className={`createProducts ${
        open ? "createProducts__active" : "createProducts__inactive"
      }`}
    >
      <form
        className={`createProducts__modal ${
          open
            ? "createProducts__modal-active"
            : "createProducts__modal-inactive"
        }`}
        onSubmit={submitHandler}
      >
        <div className="createProducts__modal-title">
          <h2>Update Products</h2>
          <span onClick={close}>
            <i class="fa-solid fa-xmark"></i>
          </span>
        </div>
        {imageLoad ? "loading" : ""}
        {imageError ? imageError : ""}
        <div className="createProducts__modal-inputBox">
          <label>Product Image</label>
          <input
            type="file"
            placeholder="Choose image file"
            onChange={uploadImageHandler}
          />
        </div>
        <div>
          {image ? <img src={image} alt="" width={100} height={100} /> : ""}
        </div>
        <div className="createProducts__modal-inputBox">
          <label>Product SKU</label>
          <input
            type="text"
            placeholder="Product SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div className="createProducts__modal-inputBox">
          <label>Brand</label>
          <input
            type="text"
            placeholder="Product brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="createProducts__modal-inputBox">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="createProducts__modal-inputBox">
          <label>Product Description</label>
          <textarea
            type="text"
            placeholder="Product details"
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="createProducts__modal-inputBox">
          <label>Product Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option selected hidden disabled>
              Select category
            </option>
            <option value="watch">Watch</option>
            <option value="phone">Phone</option>
          </select>
        </div>
        <div className="createProducts__modal-inputBox">
          <label>Product Quantity</label>
          <input
            type="text"
            placeholder="Product quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="createProducts__modal-inputBox">
          <label>Product Price</label>
          <input
            type="text"
            placeholder="Product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="createProducts__modal-inputBox">
          <label>Sale Price</label>
          <input
            type="text"
            placeholder="Sale price"
            value={sale}
            onChange={(e) => setSale(e.target.value)}
          />
        </div>
        <div className="createProducts__modal-inputBox">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Selling">Selling</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Hot Selling">Hot Selling</option>
          </select>
        </div>
        <div className="createProducts__modal-inputBox">
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
}
