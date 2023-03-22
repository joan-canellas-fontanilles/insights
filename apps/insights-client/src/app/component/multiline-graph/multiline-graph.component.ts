import { AfterViewInit, Component, Input } from '@angular/core';
import { MetricQueryResponse } from '@insights/insights-api-data';
import { init, ECharts } from 'echarts';
import { MultilineGraphService } from './multiline-graph.service';
import { LastRefreshService } from '../last-refresh/last-refresh.service';

@Component({
  selector: 'insights-multiline-graph',
  templateUrl: './multiline-graph.component.html',
  styleUrls: ['./multiline-graph.component.scss'],
  providers: [MultilineGraphService],
})
export class MultilineGraphComponent implements AfterViewInit {
  private chartDom: HTMLDivElement | null = null;
  private myChart: ECharts | null = null;

  @Input() set data(data: MetricQueryResponse) {
    if (data) {
      this.lastRefreshService.setLastRefresh(new Date());
      this.refreshChart(data);
    }
  }

  constructor(
    private readonly multilineGraphService: MultilineGraphService,
    private readonly lastRefreshService: LastRefreshService
  ) {}

  ngAfterViewInit(): void {
    const chartDom = document.getElementById(
      'multiline-graph'
    ) as HTMLDivElement;

    if (chartDom) {
      this.chartDom = chartDom;
      this.myChart = init(chartDom, 'dark', {
        renderer: 'svg',
        useDirtyRect: false,
      });
    }

    window.addEventListener('resize', () => {
      this.myChart?.resize();
    });
  }

  private refreshChart(data: MetricQueryResponse): void {
    const options = this.multilineGraphService.generateOptions(data);

    this.myChart?.setOption(options, {
      replaceMerge: ['xAxis', 'yAxis', 'series'],
    });
  }
}
