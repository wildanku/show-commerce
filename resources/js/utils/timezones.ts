import moment from 'moment-timezone';

export function getTimezoneOptions(): { label: string; value: string }[] {
  return moment.tz.names().map((tz) => ({
    label: tz,
    value: tz,
  }));
}
