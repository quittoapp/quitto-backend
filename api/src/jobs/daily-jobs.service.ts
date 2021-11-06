import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { DailySmokingReportService } from 'src/daily-smoking-report/daily-smoking-report.service'
import { SmokingPermissionService } from 'src/smoking-permission/smoking-permission.service'
import { OffsetOfCurrentMidnightTimezone } from 'src/time/offset-of-current-midnight-timezone'
import { UserService } from 'src/user/user.service'

const HOURLY_CRON_JOB = '0 * * * *'

@Injectable()
export class DailyJobsService {
  private logger = new Logger(DailyJobsService.name)

  public constructor(
    private readonly smokingPermissionService: SmokingPermissionService,
    private readonly userService: UserService,
    private readonly dailySmokingReportService: DailySmokingReportService,
  ) {}

  @Cron(HOURLY_CRON_JOB)
  public async createDailySmokingPermissions() {
    this.logger.log('Creating daily smoking permissions...')

    const currentOffset = new OffsetOfCurrentMidnightTimezone().toNumber()
    const users = await this.userService.getByTimezoneOffset(currentOffset)

    await this.smokingPermissionService.createSmokingPermissionsForUsers(users)
    await this.dailySmokingReportService.createDailySmokingReportsForUsers(users)

    this.logger.log('Done')
  }
}
