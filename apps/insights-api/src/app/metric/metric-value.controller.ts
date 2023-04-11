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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MetricValueDto } from './dto/responses/metric-value.dto';
import { HttpExceptionDto } from './dto/responses/http-exception.dto';

@ApiTags('metric-value')
@Controller()
export class MetricValueController {
  constructor(private readonly metricValueService: MetricValueService) {}

  @Post(CreateMetricValueRequestUrl)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Query retrieved successfully',
    type: MetricValueDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The supplied metric id is not a valid uuid',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid body provided.',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No metric was found with that uuid.',
    type: HttpExceptionDto,
  })
  public async createMetricValue(
    @Param('metricId', MetricIdPipe) metricId: string,
    @Body(ValidationPipe) createMetricValue: CreateMetricValueRequestDto
  ): Promise<CreateMetricValueResponse> {
    return this.metricValueService.create(metricId, createMetricValue);
  }
}
