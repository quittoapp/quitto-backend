import moment from 'moment'
import { DailySmokingPermissions } from 'src/smoking-permission/daily-smoking-permissions'
import { User } from 'src/user/entities/user.entity'
import faker from 'faker'
import { SmokingPermission } from 'src/smoking-permission/entities/smoking-permission.entity'

export function createSmokingPermissions(currentDate: Date, user: User) {
  return new DailySmokingPermissions(currentDate, user).toList()
}

export function createExpiredSmokingPermissions(currentDate: Date, user: User) {
  return Array(user.cigarettesPerDay)
    .fill(null)
    .map(() => {
      const expiredDate = moment(currentDate)
        .subtract(faker.datatype.number(30), 'minutes')
        .toDate()

      return new SmokingPermission(expiredDate, user)
    })
}
