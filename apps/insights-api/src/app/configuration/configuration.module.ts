import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EnvironmentModule } from './environment/environment.module';

@Module({
  imports: [EnvironmentModule, DatabaseModule],
})
export class ConfigurationModule {}
