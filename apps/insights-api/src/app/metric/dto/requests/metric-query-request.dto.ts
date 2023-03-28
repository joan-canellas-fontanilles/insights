import { MetricQueryData, TimePeriod } from '@insights/insights-api-data';
import {
  IsDate,
  IsEnum,
  IsObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { AggregationType } from '@insights/insights-api-data';
import { ApiProperty } from '@nestjs/swagger';

class TimeFilterDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly from: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly to: Date;
}

export class MetricQueryRequestDto implements MetricQueryData {
  @ApiProperty({
    description: 'Base64 encoded query',
  })
  private readonly query: string;

  @IsUUID(null, { each: true })
  readonly metricIds: string[];

  @IsEnum(TimePeriod)
  readonly group: TimePeriod;

  @IsEnum(AggregationType)
  readonly aggregation: AggregationType;

  @IsObject()
  @ValidateNested()
  @Type(() => TimeFilterDto)
  readonly timeFilter: TimeFilterDto;
}
