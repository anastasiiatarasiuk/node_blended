import Joi from 'joi';

export const registerUsersSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginUsersSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
