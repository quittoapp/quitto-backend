import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { DailySmokingReportService } from 'src/daily-smoking-report/daily-smoking-report.service'
import { SmokingPermissionService } from 'src/smoking-permission/smoking-permission.service'
import { getConnection } from 'typeorm'

const EVERY_FIVE_MINUTE_CRON = '*/5 * * * *'

@Injectable()
export class SmokingPermissionsNotificationsJobsService {
  public constructor(
    private readonly smokingPermissionService: SmokingPermissionService,
    private readonly dailySmokingReportService: DailySmokingReportService,
  ) {}

  @Cron(EVERY_FIVE_MINUTE_CRON)
  public async notifyAboutExpiredSmokingPermissions() {
    await getConnection().transaction(async (manager) => {
      const expiredPermissions =
        await this.smokingPermissionService.handleExpiredSmokingPermissions(manager)

      await this.dailySmokingReportService.increaseAmountOfSmokedCigarettes(
        expiredPermissions,
        manager,
      )
    })
  }
}
