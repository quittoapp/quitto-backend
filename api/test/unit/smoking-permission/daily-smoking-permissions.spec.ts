import moment from 'moment'
import { DailySmokingPermissions } from 'src/smoking-permission/daily-smoking-permissions'
import { TimeWindow } from 'src/user/entities/time-window.entity'
import { User } from 'src/user/entities/user.entity'
import { createFakeUser } from 'test/factories/createUser'

describe('DailySmokingPermissions', () => {
  describe('#toList', () => {
    describe('given a user and current date', () => {
      const user: User = createFakeUser({ timeWindow: new TimeWindow('08:00', '23:00') })
      const currentDate = new Date()

      it('returns an array of smoking permissions for the user for current date', () => {
        const permissions = new DailySmokingPermissions(currentDate, user).toList()

        for (const permission of permissions) {
          const momentDate = moment(permission.date)

          expect(permission.date.getUTCFullYear()).toBe(currentDate.getUTCFullYear())
          expect(permission.date.getUTCMonth()).toBe(currentDate.getUTCMonth())
          expect(permission.date.getUTCDate()).toBe(currentDate.getUTCDate())
          expect(momentDate.hours()).toBeLessThanOrEqual(23)
          expect(momentDate.hours()).toBeGreaterThanOrEqual(8)
        }
      })
    })
  })
})
