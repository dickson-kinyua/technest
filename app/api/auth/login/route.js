import { connectDB } from '../../../../lib/db';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import { createToken } from '../../../../lib/jwt';

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user)
    return new Response(JSON.stringify({ message: 'User not found' }), {
      status: 404,
    });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return new Response(JSON.stringify({ message: 'Invalid password' }), {
      status: 401,
    });

  const { token, cookie } = createToken(user);

  return new Response(JSON.stringify({ message: 'Logged in successfully' }), {
    status: 200,
    headers: { 'Set-Cookie': cookie },
  });
}
