export class Time {
  public constructor(
    private readonly _hours: number = 0,
    private readonly _minutes: number = 0,
    private readonly _seconds: number = 0,
  ) {}

  public static fromString(timeString: string) {
    const splitted = timeString.split(':')

    if (![1, 2, 3].includes(splitted.length)) {
      throw new Error(`Invalid time string: ${timeString}`)
    }

    const [hours = 0, minutes = 0, seconds = 0] = splitted.map(Number)
    return new Time(hours, minutes, seconds)
  }

  public toString() {
    return `${this._hours}:${this._minutes}:${this._seconds}`
  }

  public setForDate(date: Date): Date {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      this._hours,
      this._minutes,
      this._seconds,
    )

    return newDate
  }

  public get hours() {
    return this._hours
  }

  public get minutes() {
    return this._minutes
  }

  public get seconds() {
    return this._seconds
  }
}
