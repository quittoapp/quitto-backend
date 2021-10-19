import { Time } from './time'

export class TimeRange {
  public constructor(private readonly _from: Time, private readonly _to: Time) {}

  public static fromStrings(from: string, to: string) {
    return new TimeRange(Time.fromString(from), Time.fromString(to))
  }

  public get from(): Time {
    return this.from
  }

  public get to(): Time {
    return this.to
  }
}
