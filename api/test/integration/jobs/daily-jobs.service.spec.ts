import './.env'
import { Test, TestingModule } from '@nestjs/testing'
import { StartedTestContainer } from 'testcontainers'
import { AppModule } from 'src/app.module'
import { NotificationService } from 'src/notification/notification.service'
import { NotificationServiceStub } from 'test/stubs/notification.service.stub'
import { getConnection } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { OffsetOfCurrentMidnightTimezone } from 'src/time/offset-of-current-midnight-timezone'
import { DailyJobsService } from 'src/jobs/daily-jobs.service'
import { spinUpDBContainer } from 'test/utils/spin-up-db-container'
import { seedUser } from 'test/seed/seed-users'

jest.setTimeout(60_000)

describe('DailyJobsService', () => {
  describe('#createDailySmokingPermissions', () => {
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

    describe('given a user who has 00 hours by his timezone right now', () => {
      let user: User

      beforeAll(async () => {
        const offsetOfCurrentMidnightTimezone = new OffsetOfCurrentMidnightTimezone().toNumber()

        user = await seedUser({
          timezoneOffset: offsetOfCurrentMidnightTimezone,
          cigarettesPerDay: 15,
        })
      })

      it('creates daily smoking permissions for users', async () => {
        await module.get(DailyJobsService).createDailySmokingPermissions()

        const userWithUpdatedPermissions = await getConnection()
          .getRepository(User)
          .findOneOrFail({
            where: { email: user.email },
            relations: ['smokingPermissions', 'dailySmokingReport'],
          })

        expect(userWithUpdatedPermissions.smokingPermissions).toHaveLength(15)
        expect(userWithUpdatedPermissions.dailySmokingReport).toBeDefined()
      })
    })
  })
})
