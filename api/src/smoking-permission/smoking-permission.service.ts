import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OffsetOfCurrentMidnightTimezone } from 'src/time/offset-of-current-midnight-timezone'
import { User } from 'src/user/entities/user.entity'
import { getConnection, Repository } from 'typeorm'
import { flatMap, isEmpty, uniq } from 'lodash'
import { NotificationService } from 'src/notification/notification.service'
import { UserService } from 'src/user/user.service'
import { ZeroUTCOffsetDate } from 'src/time/zero-utc-offset-date'
import { SmokingPermission } from './entities/smoking-permission.entity'
import { DailySmokingPermissions } from './daily-smoking-permissions'
import { SmokingPermissionNotification } from './smoking-permission.notification'
import { SmokingPermissionRepository } from './smoking-permission.repository'

@Injectable()
export class SmokingPermissionService {
  public constructor(
    @InjectRepository(SmokingPermission)
    private readonly smokingPermissionRepository: Repository<SmokingPermission>,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  public async createSmokingPermissionsForCurrentMidnightTimezone() {
    const currentOffset = new OffsetOfCurrentMidnightTimezone().toNumber()
    const users = await this.userService.getByTimezoneOffset(currentOffset)

    const usersPermissions = this.makeDailyPermissionsForUsers(users)
    await this.smokingPermissionRepository.save(usersPermissions)
  }

  public async notifyAboutExpiredSmokingPermissions() {
    await getConnection().transaction(async (manager) => {
      const smokingPermissionsRepository = manager.getCustomRepository(SmokingPermissionRepository)
      const currentUTCDate = new ZeroUTCOffsetDate().toDate()
      const expiredPermissions = await smokingPermissionsRepository.getExpired(currentUTCDate)

      const usersFCMs = uniq(expiredPermissions.map((permission) => permission.user.fcmToken))

      if (isEmpty(usersFCMs)) {
        return
      }

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
