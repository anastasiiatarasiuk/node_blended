import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/Session.js';
import { randomBytes } from 'crypto';
import { FIFTY_MINUTES, THIRTY_DAYS } from '../constants/constants.js';
import createHttpError from 'http-errors';

export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const createUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  return UsersCollection.create({ ...userData, password: encryptedPassword });
};

export const createActiveSession = async (userId) => {
  await SessionsCollection.deleteOne({ userId: userId });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return SessionsCollection.create({
    userId: userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + FIFTY_MINUTES,
    refreshTokenValidUntil: Date.now() + THIRTY_DAYS,
  });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isRefreshTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isRefreshTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionsCollection.deleteOne({ userId: session.userId });

  const accessToken = randomBytes(30).toString('base64');
  const newRefreshToken = randomBytes(30).toString('base64');

  return SessionsCollection.create({
    userId: session.userId,
    accessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: Date.now() + FIFTY_MINUTES,
    refreshTokenValidUntil: Date.now() + THIRTY_DAYS,
  });
};
