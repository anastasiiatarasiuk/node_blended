import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { findUserById } from '../services/auth.js';

export const checkToken = async (req, res, next) => {
  const authorization = req.get('Authorization');

  if (!authorization) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  const { id } = jwt.verify(token, env('JWT_SECRET'));

  const user = await findUserById(id);

  if (!user || !user.token || user.token !== token) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  req.user = user;

  next();
};
