import {
  Environment,
  EnvironmentVariables,
} from '../app/configuration/environment/environment';

process.env[EnvironmentVariables.NODE_ENV] = Environment.Test;
process.env[EnvironmentVariables.PORT] = '3000';
process.env[EnvironmentVariables.MYSQL_HOST] = 'localhost';
process.env[EnvironmentVariables.MYSQL_PORT] = '3306';
process.env[EnvironmentVariables.MYSQL_USERNAME] = 'mysql-username';
process.env[EnvironmentVariables.MYSQL_PASSWORD] = 'secret';
process.env[EnvironmentVariables.MYSQL_DATABASE] = 'mysql-database';
