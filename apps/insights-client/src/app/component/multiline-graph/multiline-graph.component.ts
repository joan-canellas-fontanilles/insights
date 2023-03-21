import { AfterViewInit, Component, Input } from '@angular/core';
import { MetricQueryResponse } from '@insights/insights-api-data';
import { init, ECharts } from 'echarts';
import { MultilineGraphService } from './multiline-graph.service';

@Component({
  selector: 'insights-multiline-graph',
  templateUrl: './multiline-graph.component.html',
  styleUrls: ['./multiline-graph.component.scss'],
  providers: [MultilineGraphService],
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

  constructor(private readonly multilineGraphService: MultilineGraphService) {}

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
    const options = this.multilineGraphService.generateOptions(data);

    this.myChart?.setOption(options, {
      replaceMerge: ['xAxis', 'yAxis', 'series'],
    });
  }
}
