import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Product from '../../../models/Product';
import fs from 'fs';
import path from 'path';
import { generateSlug } from '../../../utils/slugify';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) return NextResponse.json({ error: 'No image' }, { status: 400 });

    // Convert to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save locally
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    await connectDB();

    // Generate slug from title
    const title = formData.get('title');
    let slugBase = generateSlug(title);
    let slug = slugBase;
    let count = 1;

    // Ensure uniqueness
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

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
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
