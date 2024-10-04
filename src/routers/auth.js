import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUsersSchema, loginUsersSchema } from '../validation/users.js';
import { validateBody } from '../utils/validateBody.js';
import {
  registerUsersController,
  loginUsersController,
  refreshUsersController,
} from '../controllers/users.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUsersSchema),
  ctrlWrapper(registerUsersController),
);

router.post(
  '/login',
  validateBody(loginUsersSchema),
  ctrlWrapper(loginUsersController),
);

router.post('/refresh', ctrlWrapper(refreshUsersController));
export default router;
