export class MetricQueryDto {
  constructor(readonly metric: string, readonly data: MetricDataDto[]) {}
}

export class MetricDataDto {
  constructor(readonly time: Date, readonly value: number) {}
}
