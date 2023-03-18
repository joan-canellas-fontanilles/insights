import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment, EnvironmentVariables } from './environment';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  get mysqlUri(): string {
    return this.configService.get<string>(EnvironmentVariables.MYSQL_URI);
  }

  get port(): number {
    return this.configService.get<number>(EnvironmentVariables.PORT);
  }

  private getEnvironment(): Environment {
    return this.configService.get<Environment>(EnvironmentVariables.NODE_ENV);
  }

  get isDevelopment(): boolean {
    return this.getEnvironment() === Environment.Development;
  }

  get isProduction(): boolean {
    return this.getEnvironment() === Environment.Production;
  }

  get isTest(): boolean {
    return this.getEnvironment() === Environment.Test;
  }
}
