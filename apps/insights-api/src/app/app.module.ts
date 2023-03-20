import { Module } from '@nestjs/common';

import { ConfigurationModule } from './configuration/configuration.module';
import { MetricModule } from './metric/metric.module';
import { MetricValueModule } from './metric-value/metric-value.module';

@Module({
  imports: [ConfigurationModule, MetricModule, MetricValueModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
