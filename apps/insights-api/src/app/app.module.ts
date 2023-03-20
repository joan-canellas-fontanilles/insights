import { Module } from '@nestjs/common';

import { ConfigurationModule } from './configuration/configuration.module';
import { MetricModule } from './metric/metric.module';

@Module({
  imports: [ConfigurationModule, MetricModule],
})
export class AppModule {}
