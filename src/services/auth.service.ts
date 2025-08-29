import { UserModel } from '../models/User.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { signAccessToken, signRefreshToken } from '../utils/tokens.js';

export async function register(name: string, email: string, password: string) {
  const exists = await UserModel.findOne({ email });
  if (exists) throw new Error('Email already registered');
  const hash = await hashPassword(password);
  const user = await UserModel.create({ name, email, password: hash });
  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
  const refreshToken = signRefreshToken({ sub: user._id.toString(), role: user.role });
  return { user, accessToken, refreshToken };
}
export async function login(email: string, password: string) {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  const ok = await comparePassword(password, user.password);
  if (!ok) throw new Error('Invalid credentials');
  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
  const refreshToken = signRefreshToken({ sub: user._id.toString(), role: user.role });
  return { user, accessToken, refreshToken };
}
