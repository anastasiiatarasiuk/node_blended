import { Product } from '../db/models/Product.js';

export const getAllProducts = () => Product.find();

export const createProduct = (productData) => Product.create(productData);

// export const getProductById = (productId) => Product.findOne({
//     _id: productId
// });

export const getProductById = (productId) => Product.findById(productId);

// export const patchProduct = (productId, productData) => Product.findOneAndUpdate({ _id: productId }, productData, {
//     new:true
// })

export const patchProduct = (productId, productData) =>
  Product.findByIdAndUpdate(productId, productData, {
    new: true,
  });

// export const deleteProductById = (productId) =>
//     Product.findOneAndDelete({
//       _id: productId,
//   });

export const deleteProductById = (productId) =>
  Product.findByIdAndDelete(productId);
