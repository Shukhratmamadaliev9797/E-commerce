import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const category = req.query.category || "";
    const categoryFilter = category ? { category } : {};

    const count = await Product.count({ ...categoryFilter })
      .populate()
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const products = await Product.find({ ...categoryFilter })
      .populate()
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    if (products) {
      res.send({ products, page, pages: Math.ceil(count / pageSize) });
    } else {
      res.status(401).send({ message: "Products not found" });
    }
  })
);

productRouter.post(
  "/createProduct",
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      image: req.body.image,
      seller: req.body.sellerId,
      brand: req.body.brand,
      sku: req.body.sku,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.quantity,
      sale: req.body.sale,
      publish: true,
      sellerName: req.body.sellerName,
      status: "Selling",
    });
    const createdProduct = await product.save();
    res.send({
      message: "Product created successfully",
      product: createdProduct,
    });
  })
);

productRouter.put(
  "/publishUpdate",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.productId);
    if (product) {
      if (product.publish === true) {
        product.publish = false;
        const updatedPublish = await product.save();
        res.send({
          message: "Product unpublished successfully",
          product: updatedPublish,
        });
      } else {
        product.publish = true;
        const updatedPublish = await product.save();
        res.send({
          message: "Product published successfully",
          product: updatedPublish,
        });
      }
    }
  })
);

productRouter.put(
  "/editProduct",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.productId);
    if (product) {
      product.image = req.body.image || product.image;
      product.seller = req.body.sellerId || product.seller;
      product.brand = req.body.brand || product.brand;
      product.sku = req.body.sku || product.sku;
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.quantity = req.body.quantity || product.quantity;
      product.sale = req.body.sale || product.sale;
      product.sellerName = req.body.sellerName || product.sellerName;
      product.status = req.body.status || product.status;
      const updatedProduct = await product.save();
      res.send({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    }
    return res.status(401).send({ message: "Product not found" });
  })
);

productRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: "Product deleted successfully" });
    } else {
      res.status(401).send({ message: "Product not found" });
    }
  })
);

export default productRouter;
