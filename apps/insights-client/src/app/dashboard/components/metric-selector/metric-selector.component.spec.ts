import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricSelectorComponent } from './metric-selector.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MetricSelectorService } from '../../../services/metric-selector.service';

describe('MetricSelectorComponent', () => {
  let component: MetricSelectorComponent;
  let fixture: ComponentFixture<MetricSelectorComponent>;
  let service: MetricSelectorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MetricSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetricSelectorComponent);
    service = TestBed.inject(MetricSelectorService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call remove if the element is selected', () => {
    const spy = jest.spyOn(service, 'remove');

    component.clickItem({ id: 'id', name: 'name', selected: true });

    expect(spy).toBeCalledWith('id');
  });

  it('should call add if the element is not selected', () => {
    const spy = jest.spyOn(service, 'add');

    component.clickItem({ id: 'id', name: 'name', selected: false });

    expect(spy).toBeCalledWith('id');
  });
});
