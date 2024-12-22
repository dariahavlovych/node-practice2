import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from '../controllers/products.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/products.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();
router.get('/', ctrlWrapper(getProductsController));

router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));

router.post(
  '/',
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);

router.patch(
  '/:productId',
  isValidId,
  validateBody(updateProductSchema),
  ctrlWrapper(updateProductController),
);

router.delete('/:productId', isValidId, ctrlWrapper(deleteProductController));

export default router;
