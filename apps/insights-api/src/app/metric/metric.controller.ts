import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateMetricRequestUrl,
  CreateMetricResponse,
  GetAllMetricsRequestUrl,
  GetAllMetricsResponse,
  GetMetricRequestUrl,
  MetricResponse,
  UpdateMetricRequestUrl,
  UpdateMetricResponse,
} from '@insights/insights-api-data';
import { MetricService } from './services/metric.service';
import { CreateMetricRequestDto } from './dto/requests/create-metric-request.dto';
import { MetricIdPipe } from './pipes/metric-id.pipe';
import { UpdateMetricRequestDto } from './dto/requests/update-metric-request.dto';

@Controller()
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Get(GetMetricRequestUrl)
  @HttpCode(HttpStatus.OK)
  public async get(
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
    @Body(ValidationPipe) metric: CreateMetricRequestDto
  ): Promise<CreateMetricResponse> {
    return this.metricService.create(metric);
  }

  @Put(UpdateMetricRequestUrl)
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('metricId') metricId: string,
    @Body(ValidationPipe) metric: UpdateMetricRequestDto
  ): Promise<UpdateMetricResponse> {
    return this.metricService.update(metricId, metric);
  }
}
