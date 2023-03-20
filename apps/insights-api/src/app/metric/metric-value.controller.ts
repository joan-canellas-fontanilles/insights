import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateMetricValueRequestUrl,
  CreateMetricValueResponse,
} from '@insights/insights-api-data';
import { MetricIdPipe } from './pipes/metric-id.pipe';
import { CreateMetricValueRequestDto } from './dto/requests/create-metric-value-request.dto';
import { MetricValueService } from './services/metric-value.service';

@Controller()
export class MetricValueController {
  constructor(private readonly metricValueService: MetricValueService) {}

  @Post(CreateMetricValueRequestUrl)
  @HttpCode(HttpStatus.CREATED)
  public async createMetricValue(
    @Param('metricId', MetricIdPipe) metricId: string,
    @Body(ValidationPipe) createMetricValue: CreateMetricValueRequestDto
  ): Promise<CreateMetricValueResponse> {
    return this.metricValueService.create(metricId, createMetricValue);
  }
}
