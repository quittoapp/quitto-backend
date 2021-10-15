import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SmokingPermission } from './entities/smoking-permission.entity'
import { SmokingPermissionService } from './smoking-permission.service'

@Module({
  imports: [TypeOrmModule.forFeature([SmokingPermission])],
  providers: [SmokingPermissionService],
  exports: [SmokingPermissionService],
})
export class SmokingPermissionModule {}
