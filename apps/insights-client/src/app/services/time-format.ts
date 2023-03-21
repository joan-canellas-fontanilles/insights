import { TimePeriod } from '@insights/insights-api-data';

export const timeFormat: Record<TimePeriod, string> = {
  [TimePeriod.Minute]: 'HH:mm:00',
  [TimePeriod.Hour]: 'HH:00:00',
  [TimePeriod.Day]: 'DD-MM-YYYY',
};
