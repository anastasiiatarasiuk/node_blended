import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  patchProductController,
} from '../controllers/products.js';

const router = Router();

router.get('/', ctrlWrapper(getProductsController));

router.post('/', ctrlWrapper(createProductController));

router.get('/:productId', ctrlWrapper(getProductByIdController));

router.delete('/:productId', ctrlWrapper(deleteProductController));

router.patch('/:productId', ctrlWrapper(patchProductController));

export default router;
