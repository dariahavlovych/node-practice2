import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UserCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js';
import { FIFTEEN_MIN, THIRTY_DAYS } from '../constants/index.js';

export const registereUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });

  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UserCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });

  if (!user) throw createHttpError(404, 'User not found');

  const passIsEqual = await bcrypt.compare(payload.password, user.password);

  if (!passIsEqual) throw createHttpError(401, 'Unauthorized');

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MIN),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  const isTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

  if (isTokenExpired) throw createHttpError(401, 'Token is expired');

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });
  const newAccessToken = randomBytes(30).toString('base64');
  const newRefreshToken = randomBytes(30).toString('base64');
  return await SessionCollection.create({
    userId: session.userId,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MIN),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};
