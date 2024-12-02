import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from '../controllers/products.js';

const router = Router();
router.get('/', ctrlWrapper(getProductsController));

router.get('/:productId', ctrlWrapper(getProductByIdController));

router.post('/', ctrlWrapper(createProductController));

router.patch('/:productId', ctrlWrapper(updateProductController));

router.delete('/:productId', ctrlWrapper(deleteProductController));

export default router;
