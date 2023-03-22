import { Component } from '@angular/core';

@Component({
  selector: 'insights-metrics-page',
  templateUrl: './metrics-page.component.html',
  styleUrls: ['./metrics-page.component.scss'],
})
export class MetricsPageComponent {
  public elements = [
    { id: 'id', name: 'value', selected: false },
    { id: 'id1', name: 'value1', selected: false },
    { id: 'id2', name: 'value2', selected: false },
  ];
}
