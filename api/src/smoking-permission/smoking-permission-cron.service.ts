import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { SmokingPermissionService } from './smoking-permission.service'

const HOURLY_CRON_JOB = '0 * * * *'
const EVERY_FIVE_MINUTE_CRON = '*/5 * * * *'

@Injectable()
export class SmokingPermissionCronService {
  private logger = new Logger(SmokingPermissionCronService.name)

  public constructor(private readonly smokingPermissionService: SmokingPermissionService) {}

  @Cron(HOURLY_CRON_JOB)
  public async createDailySmokingPermissions() {
    this.logger.log('Creating daily smoking permissions...')
    await this.smokingPermissionService.createSmokingPermissionsForCurrentMidnightTimezone()
    this.logger.log('Done')
  }

  @Cron(EVERY_FIVE_MINUTE_CRON)
  public async notifyAboutExpiredSmokingPermissions() {
    await this.smokingPermissionService.notifyAboutExpiredSmokingPermissions()
  }
}
