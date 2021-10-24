import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationModule } from 'src/notification/notification.module'
import { User } from 'src/user/entities/user.entity'
import { UserModule } from 'src/user/user.module'
import { SmokingPermission } from './entities/smoking-permission.entity'
import { SmokingPermissionRepository } from './smoking-permission.repository'
import { SmokingPermissionService } from './smoking-permission.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([SmokingPermission, User, SmokingPermissionRepository]),
    NotificationModule,
    UserModule,
  ],
  providers: [SmokingPermissionService],
  exports: [SmokingPermissionService],
})
export class SmokingPermissionModule {}
