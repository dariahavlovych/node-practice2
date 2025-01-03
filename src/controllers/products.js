import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../services/products.js';
import createHttpError from 'http-errors';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getProductsController = async (req, res) => {
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;
  const products = await getAllProducts({ userId, filter });

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const product = await getProductById(productId, userId);

  if (product === null) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const userId = req.user._id;
  const product = await createProduct({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const updateProductController = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const product = await updateProduct(productId, userId, req.body);

  if (product === null) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a product!',
    data: product,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const product = await deleteProduct(userId, productId);
  if (product === null) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(204).send();
};
