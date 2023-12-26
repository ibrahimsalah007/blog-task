import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().required(),
  MONGODB_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_DURATION: Joi.string().required(),
});
