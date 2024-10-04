import { findUserByEmail, createActiveSession } from '../services/auth.js';
import createHttpError from 'http-errors';
import { createUser } from '../services/auth.js';
import bcrypt from 'bcrypt';
import { THIRTY_DAYS } from '../constants/constants.js';

export const registerUsersController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { name: req.body.name, email: req.body.email },
  });
};

export const loginUsersController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (!user) {
    throw createHttpError(401, 'Email or password are wrong');
  }

  const isCorrect = await bcrypt.compare(req.body.password, user.password);

  if (!isCorrect) {
    throw createHttpError(401, 'Password are wrong');
  }
  const session = await createActiveSession(user._id);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshUsersController = async (req, res) => {};
