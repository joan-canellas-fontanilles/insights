import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvironmentService } from '../environment/environment.service';
import { MetricEntity } from '../../metric/db/metric.entity';

@Injectable()
export class MysqlDatabaseConfigurationService
  implements TypeOrmOptionsFactory
{
  constructor(private readonly environmentService: EnvironmentService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.environmentService.mysqlHost,
      port: this.environmentService.mysqlPort,
      username: this.environmentService.mysqlUsername,
      password: this.environmentService.mysqlPassword,
      database: this.environmentService.mysqlDatabase,
      entities: [MetricEntity],
      synchronize: true,
    };
  }
}
