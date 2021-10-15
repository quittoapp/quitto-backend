import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { SmokingPermission } from './entities/smoking-permission.entity'

@Injectable()
export class SmokingPermissionService {
  public constructor(
    @InjectRepository(SmokingPermission)
    private readonly smokingPermissionRepository,
  ) {}

  public async createDailyPermissionsForUser(user: User) {
    const timeWindow = user.timeWindow
    const fromTime = timeWindow.from
    const toTime = timeWindow.to
  }
}
