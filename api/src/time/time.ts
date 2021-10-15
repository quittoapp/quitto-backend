export class Time {
  public static fromTimeString(timeString: string) {
    const splitted = timeString.split(':')

    if (splitted.length !== 3) {
      throw new Error(`Invalid time string: ${timeString}`)
    }

    const [hours, minutes, seconds] = splitted
    return new Time(hours, minutes, seconds)
  }

  public constructor(
    private readonly hours,
    private readonly minutes,
    private readonly seconds,
  ) {}

  public toString() {
    return `${this.hours}:${this.minutes}:${this.seconds}`
  }

  public setForDate(date: Date): Date {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      this.hours,
      this.minutes,
      this.seconds,
    )

    return newDate
  }
}
