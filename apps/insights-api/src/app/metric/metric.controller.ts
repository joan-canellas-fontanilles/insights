import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  CreateMetricRequestUrl,
  CreateMetricResponse,
  GetAllMetricsRequestUrl,
  GetAllMetricsResponse,
} from '@insights/insights-api-data';
import { MetricService } from './services/metric.service';
import { CreateMetricRequestDto } from './dto/requests/create-metric-request.dto';

@Controller()
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Get(GetAllMetricsRequestUrl)
  @HttpCode(HttpStatus.OK)
  public async getAll(): Promise<GetAllMetricsResponse> {
    return this.metricService.getAll();
  }

  @Post(CreateMetricRequestUrl)
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() body: CreateMetricRequestDto
  ): Promise<CreateMetricResponse> {
    return this.metricService.create(body);
  }
}
