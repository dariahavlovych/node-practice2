import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createUserSchema } from '../validation/users.js';
import { createUserController } from '../controllers/users.js';

const router = new Router();

router.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(createUserController),
);

export default router;
