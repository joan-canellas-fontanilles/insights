import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateMetricRequestUrl,
  CreateMetricResponse,
  GetAllMetricsRequestUrl,
  GetAllMetricsResponse,
  GetMetricRequestUrl,
  MetricResponse,
} from '@insights/insights-api-data';
import { MetricService } from './services/metric.service';
import { CreateMetricRequestDto } from './dto/requests/create-metric-request.dto';
import { MetricIdPipe } from './pipes/metric-id.pipe';

@Controller()
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Get(GetMetricRequestUrl)
  @HttpCode(HttpStatus.OK)
  public async getMetric(
    @Param('metricId', MetricIdPipe) metricId: string
  ): Promise<MetricResponse> {
    return this.metricService.get(metricId);
  }

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
