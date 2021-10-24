import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { SmokingPermissionService } from './smoking-permission.service'

const HOURLY_CRON_JOB = '0 * * * *'
const EVERY_FIVE_MINUTE_CRON = '*/1 * * * *'

@Injectable()
export class SmokingPermissionCronService {
  public constructor(private readonly smokingPermissionService: SmokingPermissionService) {}

  @Cron(HOURLY_CRON_JOB)
  public async createDailySmokingPermissions() {
    await this.smokingPermissionService.createSmokingPermissionsForCurrentMidnightTimezone()
  }

  @Cron(EVERY_FIVE_MINUTE_CRON)
  public async notifyAboutExpiredSmokingPermissions() {
    await this.smokingPermissionService.notifyAboutExpiredSmokingPermissions()
  }
}
