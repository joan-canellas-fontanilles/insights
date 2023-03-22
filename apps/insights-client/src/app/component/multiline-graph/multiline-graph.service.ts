import { Injectable } from '@angular/core';
import { GenerateTimeValuesService } from '../../services/generate-time-values.service';
import { MetricQueryResponse } from '@insights/insights-api-data';
import { EChartsOption } from 'echarts/types/dist/echarts';
import { MetricNameResolverService } from '../../services/metric-name-resolver.service';

@Injectable()
export class MultilineGraphService {
  constructor(
    private readonly generateTimeValuesService: GenerateTimeValuesService,
    private readonly metricNameResolverService: MetricNameResolverService
  ) {}

  private generateDateLabels(): string[] {
    return this.generateTimeValuesService.calculateDatesBetween();
  }

  private generateYAxis(response: MetricQueryResponse): EChartsOption['yAxis'] {
    return response.map((metric) => ({
      id: metric.metric,
      type: 'value',
      scale: true,
    }));
  }

  private generateSeries(
    response: MetricQueryResponse,
    dateLabels: string[]
  ): EChartsOption['series'] {
    return response.map(({ metric, data }) => ({
      id: metric,
      name: this.metricNameResolverService.getMetricName(metric),
      type: 'line',
      data: dateLabels.map(
        (date) =>
          data.find(
            (value) =>
              this.generateTimeValuesService.formatDate(value.time) === date
          )?.value || 0
      ),
    }));
  }

  public generateOptions(response: MetricQueryResponse): EChartsOption {
    if (response.length === 0) {
      return { backgroundColor: 'transparent' };
    }
    const generatedDateLabels = this.generateDateLabels();
    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: {},
      xAxis: {
        type: 'category',
        name: 'timestamp',
        data: generatedDateLabels,
      },
      yAxis: this.generateYAxis(response),
      series: this.generateSeries(response, generatedDateLabels),
      color: ['#00F2DE', '#008DF2', '#00F265'],
    };
  }
}
