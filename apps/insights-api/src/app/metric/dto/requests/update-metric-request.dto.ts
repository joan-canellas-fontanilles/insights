import { IsString, Length } from 'class-validator';
import { UpdateMetricRequestBody } from '@insights/insights-api-data';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMetricRequestDto implements UpdateMetricRequestBody {
  @IsString()
  @Length(4, 20)
  @ApiProperty({
    description: 'New name for the updated metric',
    minLength: 4,
    maxLength: 20,
  })
  readonly name: string;
}
