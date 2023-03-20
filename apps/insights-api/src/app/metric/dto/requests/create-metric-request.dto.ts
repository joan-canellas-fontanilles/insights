import { CreateMetricRequestBody } from '@insights/insights-api-data';
import { IsString, Length } from 'class-validator';

export class CreateMetricRequestDto implements CreateMetricRequestBody {
  @IsString()
  @Length(4, 20)
  readonly name: string;
}
