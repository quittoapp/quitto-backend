import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { EntityManager, Repository } from 'typeorm'
import { flatMap, isEmpty, uniq } from 'lodash'
import { NotificationService } from 'src/notification/notification.service'
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
    private readonly notificationService: NotificationService,
  ) {}

  public async createSmokingPermissionsForUsers(users: User[]) {
    const usersPermissions = this.makeDailyPermissionsForUsers(users)
    await this.smokingPermissionRepository.save(usersPermissions)
  }

  public async handleExpiredSmokingPermissions(manager: EntityManager) {
    const smokingPermissionsRepository = manager.getCustomRepository(SmokingPermissionRepository)
    const currentUTCDate = new ZeroUTCOffsetDate().toDate()
    const expiredPermissions = await smokingPermissionsRepository.getExpired(currentUTCDate)

    const usersFCMs = uniq(expiredPermissions.map((permission) => permission.user.fcmToken))

    if (isEmpty(usersFCMs)) {
      return []
    }

    await this.notificationService.notify(usersFCMs, new SmokingPermissionNotification().getData())

    await smokingPermissionsRepository.remove(expiredPermissions)

    return expiredPermissions
  }

  private makeDailyPermissionsForUsers(users: User[]) {
    return flatMap(users, (user) => new DailySmokingPermissions(new Date(), user).toList())
  }
}
