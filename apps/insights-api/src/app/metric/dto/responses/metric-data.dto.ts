import { ApiProperty } from '@nestjs/swagger';

export class MetricDataDto {
  @ApiProperty({
    description: 'Time group when the measurements were performed',
  })
  public readonly time: Date;

  @ApiProperty({
    description: 'Calculated value of the grouped query measurements',
  })
  public readonly value: number;

  constructor(time: Date, value: number) {
    this.time = time;
    this.value = value;
  }
}
