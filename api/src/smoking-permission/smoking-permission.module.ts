import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationService } from 'src/notification/notification.service'
import { User } from 'src/user/entities/user.entity'
import { SmokingPermission } from './entities/smoking-permission.entity'
import { SmokingPermissionRepository } from './smoking-permission.repository'
import { SmokingPermissionService } from './smoking-permission.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([SmokingPermission, User, SmokingPermissionRepository]),
    NotificationService,
  ],
  providers: [SmokingPermissionService],
  exports: [SmokingPermissionService],
})
export class SmokingPermissionModule {}
