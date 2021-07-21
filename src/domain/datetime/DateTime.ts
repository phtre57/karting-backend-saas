import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export class DateTime {
  date: dayjs.Dayjs;

  constructor(date: dayjs.Dayjs) {
    this.date = date;
  }

  public fromFormat = (date: string, format: string): DateTime => {
    const daysJsdate = dayjs(date, format);
    if (!daysJsdate.isValid()) {
    }
    return new DateTime(daysJsdate);
  };

  public timestamp = (): number => {
    return this.date.unix();
  };

  public fromNow = (): string => {
    return this.date.fromNow();
  };

  public static fromUnixTimestamp = (unixTimestamp: number): DateTime => {
    return new DateTime(dayjs.unix(unixTimestamp));
  };

  public static now = (): DateTime => {
    return new DateTime(dayjs());
  };

  public isAfter = (other: DateTime): boolean => {
    return this.date.isAfter(other.date);
  };
}
