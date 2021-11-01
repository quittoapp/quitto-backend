import './.env'
import { Test, TestingModule } from '@nestjs/testing'
import { StartedTestContainer } from 'testcontainers'
import { AppModule } from 'src/app.module'
import { NotificationService } from 'src/notification/notification.service'
import { NotificationServiceStub } from 'test/stubs/notification.service.stub'
import { spinUpDBContainer } from 'test/utils/spin-up-db-container'
import { seedUser } from 'test/seed/seed-users'
import { OffsetOfCurrentMidnightTimezone } from 'src/time/offset-of-current-midnight-timezone'
import { seedExpiredSmokingPermissions } from 'test/seed/seed-smoking-permissions'
import { TimeWindow } from 'src/user/entities/time-window.entity'
import { SmokingPermissionsNotificationsJobsService } from 'src/jobs/smoking-permissions-notifications-jobs.service'
import { getConnection } from 'typeorm'
import { SmokingPermission } from 'src/smoking-permission/entities/smoking-permission.entity'
import { DailySmokingReport } from 'src/daily-smoking-report/entities/daily-smoking-report.entity'
import { User } from 'src/user/entities/user.entity'

jest.setTimeout(60_000)

describe('SmokingPermissionsNotificationsJobsService', () => {
  describe('#notifyAboutExpiredSmokingPermissions', () => {
    let module: TestingModule
    let dbContainer: StartedTestContainer

    beforeAll(async () => {
      dbContainer = await spinUpDBContainer()

      module = await Test.createTestingModule({ imports: [AppModule] })
        .overrideProvider(NotificationService)
        .useClass(NotificationServiceStub)
        .compile()

      const app = module.createNestApplication()
      await app.init()
    })

    afterAll(async () => {
      await dbContainer.stop()
    })

    describe('given a user, whose smoking permissions are expired', () => {
      let user: User

      beforeAll(async () => {
        const offsetOfCurrentMidnightTimezone = new OffsetOfCurrentMidnightTimezone().toNumber()
        user = await seedUser({
          timezoneOffset: offsetOfCurrentMidnightTimezone,
          timeWindow: new TimeWindow('00:00', '00:10'),
          cigarettesPerDay: 10,
        })

        await seedExpiredSmokingPermissions(user)
      })

      it('removes expired smoking permissions and writes stats about them to the daily report', async () => {
        await module
          .get(SmokingPermissionsNotificationsJobsService)
          .notifyAboutExpiredSmokingPermissions()

        const currentSmokingPermissions = await getConnection()
          .getRepository(SmokingPermission)
          .find()

        const dailySmokingReport = await getConnection()
          .getRepository(DailySmokingReport)
          .findOneOrFail()

        expect(currentSmokingPermissions.length).toBe(0)
        expect(dailySmokingReport.amountOfSmokedCigarettes).toBe(10)
      })
    })
  })
})
