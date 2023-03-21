import { AfterViewInit, Component, Input } from '@angular/core';
import { MetricQueryResponse } from '@insights/insights-api-data';
import { init, ECharts } from 'echarts';
import { EChartsOption } from 'echarts/types/dist/echarts';

@Component({
  selector: 'insights-multiline-graph',
  templateUrl: './multiline-graph.component.html',
  styleUrls: ['./multiline-graph.component.scss'],
})
export class MultilineGraphComponent implements AfterViewInit {
  private chartDom: HTMLDivElement | null = null;
  private myChart: ECharts | null = null;
  public lastRefresh: Date | null = null;

  @Input() set data(data: MetricQueryResponse | null) {
    if (data) {
      this.lastRefresh = new Date();
      this.refreshChart(data);
    }
  }

  ngAfterViewInit(): void {
    const chartDom = document.getElementById(
      'multiline-graph'
    ) as HTMLDivElement;

    if (chartDom) {
      this.chartDom = chartDom;
      this.myChart = init(chartDom, undefined, {
        renderer: 'svg',
        useDirtyRect: false,
      });
    }
  }

  private refreshChart(data: MetricQueryResponse): void {
    const options = this.generateOptions(data);

    this.myChart?.setOption(options, {
      replaceMerge: ['xAxis', 'yAxis', 'series'],
    });
  }

  private generateOptions(response: MetricQueryResponse): EChartsOption {
    return {
      title: {
        text: 'Average',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {},
      xAxis: response.map((metric) => ({
        id: metric.metric,
        type: 'category',
        name: 'timestamp',
        data: metric.data.map(({ time }) =>
          new Date(time).toLocaleTimeString()
        ),
      })),
      yAxis: response.map((metric) => ({
        id: metric.metric,
        type: 'value',
        scale: true,
      })),
      series: response.map(({ metric, data }) => ({
        id: metric,
        name: metric,
        type: 'bar',
        data: data.map((value) => value.value),
      })),
    };
  }
}
