import { Module } from '@nestjs/common'
import { DailySmokingReportModule } from 'src/daily-smoking-report/daily-smoking-report.module'
import { SmokingPermissionModule } from 'src/smoking-permission/smoking-permission.module'
import { UserModule } from 'src/user/user.module'
import { SmokingPermissionsNotificationsJobsService } from './smoking-permissions-notifications-jobs.service'
import { DailyJobsService } from './daily-jobs.service'

@Module({
  imports: [SmokingPermissionModule, UserModule, DailySmokingReportModule],
  providers: [SmokingPermissionsNotificationsJobsService, DailyJobsService],
})
export class JobsModule {}
