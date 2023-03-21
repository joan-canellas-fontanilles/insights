import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilineGraphComponent } from './multiline-graph.component';

describe('MultilineGraphComponent', () => {
  let component: MultilineGraphComponent;
  let fixture: ComponentFixture<MultilineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultilineGraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultilineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
