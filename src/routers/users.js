import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createUserSchema, loginUserSchema } from '../validation/users.js';
import {
  createUserController,
  loginUserController,
  logoutUserController,
} from '../controllers/users.js';

const router = new Router();

router.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(createUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
