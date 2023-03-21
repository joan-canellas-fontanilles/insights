import { TestBed } from '@angular/core/testing';

import { GenerateTimeValuesService } from './generate-time-values.service';
import { GroupSelectorService } from './group-selector.service';
import { TimePeriod } from '@insights/insights-api-data';

describe('GenerateTimeValuesService', () => {
  let service: GenerateTimeValuesService;
  let groupSelectorService: GroupSelectorService;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-03-21T10:01:00.000Z'));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateTimeValuesService);

    groupSelectorService = TestBed.inject(GroupSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateDatesBetween', () => {
    it('should generate an array of dates by minute', () => {
      const array = service.calculateDatesBetween();

      expect(array).toEqual([
        '09:42:00',
        '09:43:00',
        '09:44:00',
        '09:45:00',
        '09:46:00',
        '09:47:00',
        '09:48:00',
        '09:49:00',
        '09:50:00',
        '09:51:00',
        '09:52:00',
        '09:53:00',
        '09:54:00',
        '09:55:00',
        '09:56:00',
        '09:57:00',
        '09:58:00',
        '09:59:00',
        '10:00:00',
        '10:01:00',
      ]);
    });

    it('should generate an array of dates by hour', () => {
      groupSelectorService.set(TimePeriod.Hour);

      const array = service.calculateDatesBetween();

      expect(array).toEqual([
        '15:00:00',
        '16:00:00',
        '17:00:00',
        '18:00:00',
        '19:00:00',
        '20:00:00',
        '21:00:00',
        '22:00:00',
        '23:00:00',
        '00:00:00',
        '01:00:00',
        '02:00:00',
        '03:00:00',
        '04:00:00',
        '05:00:00',
        '06:00:00',
        '07:00:00',
        '08:00:00',
        '09:00:00',
        '10:00:00',
      ]);
    });
  });

  describe('timeFormat', () => {
    it('should format the date based on the current timePeriod', () => {
      expect(service.formatDate(new Date())).toEqual('10:01:00');
      groupSelectorService.set(TimePeriod.Hour);
      expect(service.formatDate(new Date())).toEqual('10:00:00');
      groupSelectorService.set(TimePeriod.Day);
      expect(service.formatDate(new Date())).toEqual('21-03-2023');
    });
  });

  describe('getTimeFilter', () => {
    it('should return a time filter based on the current timePeriod', () => {
      expect(service.getTimeFilter()).toEqual({
        from: new Date('2023-03-21T09:41:00.000Z'),
        to: new Date('2023-03-21T10:01:00.000Z'),
      });
      groupSelectorService.set(TimePeriod.Hour);
      expect(service.getTimeFilter()).toEqual({
        from: new Date('2023-03-20T14:00:00.000Z'),
        to: new Date('2023-03-21T10:01:00.000Z'),
      });
      groupSelectorService.set(TimePeriod.Day);
      expect(service.getTimeFilter()).toEqual({
        from: new Date('2023-03-01T00:00:00.000Z'),
        to: new Date('2023-03-21T10:01:00.000Z'),
      });
    });
  });

  describe('calculateDate', () => {
    it('should return a time transformed based on the current timePeriod', () => {
      expect(service.calculateDate(10)).toEqual(
        new Date('2023-03-21T09:51:00.000Z')
      );
      groupSelectorService.set(TimePeriod.Hour);
      expect(service.calculateDate(10)).toEqual(
        new Date('2023-03-21T00:00:00.000Z')
      );
      groupSelectorService.set(TimePeriod.Day);
      expect(service.calculateDate(10)).toEqual(
        new Date('2023-03-11T00:00:00.000Z')
      );
    });
  });
});
