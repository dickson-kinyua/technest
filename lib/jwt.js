import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// Create a JWT token and optionally set it as HTTP-only cookie
export function createToken(user) {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Create cookie string
  const cookie = serialize('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    sameSite: 'lax',
  });

  return { token, cookie };
}

// Verify token
export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
}
