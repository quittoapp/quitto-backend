import moment from 'moment'
import { RandomTimesInRange } from 'src/time/random-times-in-range'
import { TimeRange } from 'src/time/time-range'
import { User } from 'src/user/entities/user.entity'
import { SmokingPermission } from './entities/smoking-permission.entity'

export class DailySmokingPermissions {
  public constructor(private readonly currentDate: Date, public readonly user: User) {}

  public toList() {
    return this.makeSmokingPermissionsList()
  }

  private makeSmokingPermissionsList() {
    const currentUserDate = moment(this.currentDate).utcOffset(this.user.timezoneOffset).toDate()
    const range = TimeRange.fromStrings(this.user.timeWindow.from, this.user.timeWindow.to)
    const randomTimes = new RandomTimesInRange(range, this.user.cigarettesPerDay)
    const dates = randomTimes.forDate(currentUserDate)
    const smokingPermissions = dates.map((date) => new SmokingPermission(date, this.user))

    return smokingPermissions
  }
}
