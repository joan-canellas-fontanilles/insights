import Joi from 'joi';
import { Environment, EnvironmentVariables } from './environment';

export const validationSchema = Joi.object({
  [EnvironmentVariables.NODE_ENV]: Joi.string()
    .valid(Environment.Development, Environment.Production, Environment.Test)
    .default(Environment.Development),
  [EnvironmentVariables.MYSQL_URI]: Joi.string().uri().required(),
  [EnvironmentVariables.PORT]: Joi.number().default(3000),
});
