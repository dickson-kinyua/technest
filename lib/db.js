import mongoose from 'mongoose';

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectDB() {
  // Don't try to connect if MONGODB_URI is not set (happens during build)
  if (!process.env.MONGODB_URI) {
    console.log('MONGODB_URI not set, skipping connection');
    return null;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI)
      .then((mongoose) => {
        console.log('MongoDB connected');
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
