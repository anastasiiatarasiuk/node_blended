import {
  clearToken,
  findUserByEmail,
  updateUserWithToken,
} from '../services/auth.js';
import createHttpError from 'http-errors';
import { createUser } from '../services/auth.js';
import bcrypt from 'bcrypt';
// import { THIRTY_DAYS } from '../constants/constants.js';

export const registerUsersController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const newUser = await createUser(req.body);
  console.log(newUser);

  res.status(201).json({
    user: { name: req.body.name, email: req.body.email },
    token: newUser.token,
  });
};

export const loginUsersController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (!user) {
    throw createHttpError(401, 'Email or password are wrong');
  }

  const isCorrect = await bcrypt.compare(req.body.password, user.password);

  if (!isCorrect) {
    throw createHttpError(401, 'Email or password are wrong');
  }

  const updatedUser = await updateUserWithToken(user._id);

  res.json({
    user: { name: updatedUser.name, email: req.body.email },
    token: updatedUser.token,
  });
};

export const logoutUsersController = async (req, res) => {
  const id = req.user._id;

  await clearToken(id);

  res.sendStatus(204);
};
