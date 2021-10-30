import moment from 'moment'

export class CurrentUTCDateWithoutTime {
  private readonly dateString = moment().utcOffset(0).format('LL')

  public toDate() {
    return new Date(this.dateString)
  }
}
