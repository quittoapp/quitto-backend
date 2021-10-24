import * as moment from 'moment'

export class ZeroUTCOffsetDate {
  private readonly date: Date

  public constructor(date: Date | moment.Moment = new Date()) {
    this.date = moment(date).utcOffset(0).toDate()
  }

  public toDate() {
    return this.date
  }
}
