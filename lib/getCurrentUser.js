import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import { headers } from 'next/headers';
import { connectDB } from './db';
import User from '../models/User';

export async function getCurrentUser() {
  // const session = await getServerSession(authOptions);
  const session = await getServerSession({
    ...authOptions,
    headers: headers(),
  });

  console.log('Session data:', session);
  if (!session?.user?.email) return null;

  await connectDB();
  const user = await User.findOne({ email: session.user.email }).select(
    '-password'
  );
  console.log('Fetched user from database:', user);
  return user ? JSON.parse(JSON.stringify(user)) : null;
}
