import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';
import { DataSource } from 'typeorm';
import { MysqlDatabaseConfigurationService } from './mysql-database-configuration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      useClass: MysqlDatabaseConfigurationService,
      dataSourceFactory: (options) => new DataSource(options).initialize(),
      inject: [EnvironmentService],
    }),
  ],
})
export class DatabaseModule {}
