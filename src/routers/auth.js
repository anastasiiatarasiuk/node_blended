import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUsersSchema, registerUsersSchema } from '../validation/users.js';
import { validateBody } from '../utils/validateBody.js';
import {
  loginUsersController,
  logoutUsersController,
  registerUsersController,
} from '../controllers/users.js';
import { checkToken } from '../middlewares/checkToken.js';

const router = Router();

router.post(
  '/signup',
  validateBody(registerUsersSchema),
  ctrlWrapper(registerUsersController),
);

router.post(
  '/login',
  validateBody(loginUsersSchema),
  ctrlWrapper(loginUsersController),
);

router.post('/logout', checkToken, ctrlWrapper(logoutUsersController));

// router.post('/current', ctrlWrapper(refreshUsersController));
export default router;
