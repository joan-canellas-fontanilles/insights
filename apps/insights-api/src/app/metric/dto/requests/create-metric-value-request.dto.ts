import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { CreateMetricValueRequestBody } from '@insights/insights-api-data';
import { Transform } from 'class-transformer';

export class CreateMetricValueRequestDto
  implements CreateMetricValueRequestBody
{
  @IsNumber()
  readonly value: number;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly timestamp: Date | null;
}
