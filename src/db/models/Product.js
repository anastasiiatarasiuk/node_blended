import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['books', 'electronics', 'clothing', 'other'],
      required: true,
      default: 'other',
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
export const Product = model('product', productSchema);
