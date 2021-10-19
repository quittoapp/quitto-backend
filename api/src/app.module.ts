import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { config } from './config'
import { User } from './user/entities/user.entity'
import { UserModule } from './user/user.module'
import { NotificationModule } from './notification/notification.module'
import { SmokingPermissionModule } from './smoking-permission/smoking-permission.module'
import { TimeWindow } from './user/entities/time-window.entity'
import { SmokingPermission } from './smoking-permission/entities/smoking-permission.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.databaseHost,
      port: config.databasePort,
      username: config.databaseUserName,
      password: config.databasePassword,
      database: config.databaseName,
      entities: [User, TimeWindow, SmokingPermission],
      synchronize: true,
    }),
    UserModule,
    NotificationModule,
    SmokingPermissionModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
