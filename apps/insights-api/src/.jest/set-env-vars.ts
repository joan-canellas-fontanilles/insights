import {
  Environment,
  EnvironmentVariables,
} from '../app/configuration/environment';

process.env[EnvironmentVariables.MYSQL_URI] = 'mysql://localhost:3306';
process.env[EnvironmentVariables.NODE_ENV] = Environment.Test;
process.env[EnvironmentVariables.PORT] = '3000';
