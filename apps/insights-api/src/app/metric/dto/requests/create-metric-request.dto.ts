import { CreateMetricRequestBody } from '@insights/insights-api-data';
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMetricRequestDto implements CreateMetricRequestBody {
  @IsString()
  @Length(4, 20)
  @ApiProperty({
    description: 'Name for the new metric',
    minLength: 4,
    maxLength: 20,
  })
  readonly name: string;
}
