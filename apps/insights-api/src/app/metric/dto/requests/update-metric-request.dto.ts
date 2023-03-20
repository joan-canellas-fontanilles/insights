import { IsString, Length } from 'class-validator';
import { UpdateMetricRequestBody } from '@insights/insights-api-data';

export class UpdateMetricRequestDto implements UpdateMetricRequestBody {
  @IsString()
  @Length(4, 20)
  readonly name: string;
}
