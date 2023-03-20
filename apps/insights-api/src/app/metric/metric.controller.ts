import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  CreateMetricRequestUrl,
  CreateMetricResponse,
} from '@insights/insights-api-data';
import { MetricService } from './services/metric.service';
import { CreateMetricRequestDto } from './dto/requests/create-metric-request.dto';

@Controller()
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Post(CreateMetricRequestUrl)
  @HttpCode(HttpStatus.CREATED)
  public async createMetric(
    @Body() body: CreateMetricRequestDto
  ): Promise<CreateMetricResponse> {
    return this.metricService.create(body);
  }
}
