import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    brand: { type: String, required: true },
    sku: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: String, required: true },
    sale: { type: String, required: true },
    publish: { type: Boolean, required: false },
    sellerName: { type: String, required: true },
    status: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
