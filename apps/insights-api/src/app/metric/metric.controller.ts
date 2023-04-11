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
  GetMetricResponse,
  UpdateMetricRequestUrl,
  UpdateMetricResponse,
} from '@insights/insights-api-data';
import { MetricService } from './services/metric.service';
import { CreateMetricRequestDto } from './dto/requests/create-metric-request.dto';
import { MetricIdPipe } from './pipes/metric-id.pipe';
import { UpdateMetricRequestDto } from './dto/requests/update-metric-request.dto';
import { MetricDto } from './dto/responses/metric.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionDto } from './dto/responses/http-exception.dto';

@ApiTags('metric')
@Controller()
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Get(GetMetricRequestUrl)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The metric has been successfully retrieved.',
    type: MetricDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The supplied metric id is not a valid uuid',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No metric was found with that uuid.',
    type: HttpExceptionDto,
  })
  public async get(
    @Param('metricId', MetricIdPipe) metricId: string
  ): Promise<GetMetricResponse> {
    return this.metricService.get(metricId);
  }

  @Get(GetAllMetricsRequestUrl)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The metrics have been successfully retrieved.',
    type: MetricDto,
  })
  public async getAll(): Promise<GetAllMetricsResponse> {
    return this.metricService.getAll();
  }

  @Post(CreateMetricRequestUrl)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The metric has been successfully created.',
    type: MetricDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Already exists a metric with the same name.',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid body provided.',
    type: HttpExceptionDto,
  })
  public async create(
    @Body(ValidationPipe) metric: CreateMetricRequestDto
  ): Promise<CreateMetricResponse> {
    return this.metricService.create(metric);
  }

  @Put(UpdateMetricRequestUrl)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The metrics have been successfully updated.',
    type: MetricDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No metric was found with that uuid.',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The supplied metric id is not a valid uuid',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Already exists a metric with the same name.',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid body provided.',
    type: HttpExceptionDto,
  })
  public async update(
    @Param('metricId') metricId: string,
    @Body(ValidationPipe) metric: UpdateMetricRequestDto
  ): Promise<UpdateMetricResponse> {
    return this.metricService.update(metricId, metric);
  }
}
