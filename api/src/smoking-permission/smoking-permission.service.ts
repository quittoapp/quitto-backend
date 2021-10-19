import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { OffsetOfCurrentMidnightTimezone } from 'src/time/offset-of-current-midnight-timezone'
import { User } from 'src/user/entities/user.entity'
import { getConnection, Repository } from 'typeorm'
import { UserRepository } from 'src/user/user.repository'
import { flatMap } from 'lodash'
import { NotificationService } from 'src/notification/notification.service'
import { SmokingPermission } from './entities/smoking-permission.entity'
import { DailySmokingPermissions } from './daily-smoking-permissions'
import { SmokingPermissionNotification } from './smoking-permission.notification'
import { SmokingPermissionRepository } from './smoking-permission.repository'

const HOURLY_CRON_JOB = '0 * * * *'
const EVERY_FIVE_MINUTE_CRON = '*/5 * * * *'

@Injectable()
export class SmokingPermissionService {
  public constructor(
    @InjectRepository(SmokingPermission)
    private readonly smokingPermissionRepository: Repository<SmokingPermission>,
    private readonly userRepository: UserRepository,
    private readonly notificationService: NotificationService,
  ) {}

  @Cron(HOURLY_CRON_JOB)
  public async createDailySmokingPermissions() {
    const currentOffset = new OffsetOfCurrentMidnightTimezone().toNumber()
    const users = await this.userRepository.getByTimezoneOffset(currentOffset)
    const usersPermissions = this.makeDailyPermissionsForUsers(users)

    await this.smokingPermissionRepository.save(usersPermissions)
  }

  @Cron(EVERY_FIVE_MINUTE_CRON)
  public async notifyAboutExpiredSmokingPermissions() {
    await getConnection().transaction(async (manager) => {
      const smokingPermissionsRepository = manager.getCustomRepository(SmokingPermissionRepository)
      const expiredPermissions = await smokingPermissionsRepository.getExpired(new Date())

      const usersFCMs = expiredPermissions.map((permission) => permission.user.fcmToken)
      await this.notificationService.notify(
        usersFCMs,
        new SmokingPermissionNotification().getData(),
      )

      await smokingPermissionsRepository.remove(expiredPermissions)
    })
  }

  private makeDailyPermissionsForUsers(users: User[]) {
    return flatMap(users, (user) => new DailySmokingPermissions(new Date(), user).toList())
  }
}
