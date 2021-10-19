import { random } from 'lodash'
import { Time } from './time'
import { TimeRange } from './time-range'

export class RandomTimesInRange {
  public constructor(private readonly range: TimeRange, private readonly amountOfTimes: number) {}

  public getTimes() {
    return this.makeRandomTimes()
  }

  public forDate(date: Date) {
    return this.getTimes().map((time) => time.setForDate(date))
  }

  private makeRandomTimes() {
    return Array(this.amountOfTimes)
      .fill(null)
      .map(() => this.makeRandomTime())
  }

  private makeRandomTime() {
    const randomHour = random(this.range.from.hours, this.range.to.hours)
    const randomMinutes = random(60)

    return new Time(randomHour, randomMinutes, 0)
  }
}
