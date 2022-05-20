import { model, Schema, Document } from 'mongoose';
import { Product } from '@interfaces/products.interface';

const productSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

const productModel = model<Product & Document>('Product', productSchema);

export default productModel;
