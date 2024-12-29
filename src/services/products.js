import { ProductsCollection } from '../db/models/products.js';

export const getAllProducts = async ({ userId, filter = {} }) => {
  const searchQuery = ProductsCollection.find({ userId });

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

export const getProductById = async (productId, userId) => {
  const product = await ProductsCollection.findOne({ _id: productId, userId });
  return product;
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};

export const updateProduct = async (productId, userId, payload) => {
  const product = await ProductsCollection.findOneAndUpdate(
    { _id: productId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );
  return product.value;
};

export const deleteProduct = async (userId, productId) => {
  const product = await ProductsCollection.findOneAndDelete({
    _id: productId,
    userId,
  });
  return product;
};
