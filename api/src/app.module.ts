import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { UserModule } from './user/user.module'
import { NotificationModule } from './notification/notification.module'
import { SmokingPermissionModule } from './smoking-permission/smoking-permission.module'
import { AuthModule } from './auth/auth.module'
import { JobsModule } from './jobs/jobs.module'
import { DailySmokingReportModule } from './daily-smoking-report/daily-smoking-report.module'
import { LoggerModule } from './logger/logger.module'
import { LoggerMiddleware } from './logger/logger.middleware'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    NotificationModule,
    SmokingPermissionModule,
    ScheduleModule.forRoot(),
    AuthModule,
    JobsModule,
    DailySmokingReportModule,
    LoggerModule,
  ],
  controllers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
