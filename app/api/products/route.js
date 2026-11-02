import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Product from '../../../models/Product';
// import fs from 'fs';
// import path from 'path';
import { generateSlug } from '../../../utils/slugify';
import cloudinary from '@/lib/cloudinary';

export const runtime = 'nodejs';

//post a new product
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No image selected' }, { status: 400 });
    }

    // Convert image to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'technest/products',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    // Get Cloudinary image URL
    const imageUrl = uploadResult.secure_url;

    await connectDB();

    // Generate slug from title
    const title = formData.get('title');

    let slugBase = generateSlug(title);
    let slug = slugBase;
    let count = 1;

    // Ensure slug uniqueness
    while (await Product.findOne({ slug })) {
      slug = `${slugBase}-${count++}`;
    }

    // Create product
    const product = await Product.create({
      title,
      slug,
      description: formData.get('description'),
      price: Number(formData.get('price')),
      images: [imageUrl],
      stock: Number(formData.get('stock')),
      category: formData.get('category'),
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('PRODUCT UPLOAD ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

/* =========================
   GET PRODUCTS (GET)
========================= */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
