import Joi from 'joi';
import { Environment, EnvironmentVariables } from './environment';

export const environmentVariablesValidationSchema = Joi.object({
  [EnvironmentVariables.NODE_ENV]: Joi.string()
    .valid(Environment.Development, Environment.Production, Environment.Test)
    .default(Environment.Development),
  [EnvironmentVariables.MYSQL_HOST]: Joi.string()
    .hostname()
    .default('localhost'),
  [EnvironmentVariables.MYSQL_PORT]: Joi.number().port().default(3306),
  [EnvironmentVariables.MYSQL_USERNAME]: Joi.string().required(),
  [EnvironmentVariables.MYSQL_PASSWORD]: Joi.string().required(),
  [EnvironmentVariables.MYSQL_DATABASE]: Joi.string().required(),
  [EnvironmentVariables.PORT]: Joi.number().port().default(3000),
});
