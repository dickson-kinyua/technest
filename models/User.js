import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
    },
  },
  { timestamps: true }
);

// Remove any existing model to avoid conflicts
delete mongoose.models.User;

export default mongoose.model('User', UserSchema);
