import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true }, // Added slug field
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    category: { type: String },
  },
  { timestamps: true }
);

export default models.Product || model('Product', ProductSchema);
