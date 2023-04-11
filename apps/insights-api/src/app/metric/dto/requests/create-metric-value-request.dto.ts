import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { CreateMetricValueRequestBody } from '@insights/insights-api-data';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMetricValueRequestDto
  implements CreateMetricValueRequestBody
{
  @IsNumber()
  @ApiProperty({
    description:
      'Measurement that represents the value or quantity of a particular metric at a specific point in time',
  })
  readonly value: number;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty({
    description: 'Time when the measurement was performed',
  })
  readonly timestamp: Date | null;
}
