import { ProductsCollection } from '../db/models/products.js';

export const getAllProducts = async ({ filter = {} }) => {
  const searchQuery = ProductsCollection.find();

  if (filter.category) {
    searchQuery.where('category').equals(filter.category);
  }

  if (filter.minPrice) {
    searchQuery.where('price').gte(filter.minPrice);
  }

  if (filter.maxPrice) {
    searchQuery.where('price').lte(filter.maxPrice);
  }

  const products = await searchQuery.exec();
  return products;
};

export const getProductById = async (productId) => {
  const product = await ProductsCollection.findById(productId);
  return product;
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};

export const updateProduct = async (productId, payload) => {
  const product = await ProductsCollection.findByIdAndUpdate(
    productId,
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );
  return product.value;
};

export const deleteProduct = async (productId) => {
  const product = await ProductsCollection.findByIdAndDelete(productId);
  return product;
};
