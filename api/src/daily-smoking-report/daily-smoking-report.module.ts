import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DailySmokingReportRepository } from './daily-smoking-report.repository'
import { DailySmokingReportService } from './daily-smoking-report.service'
import { DailySmokingReport } from './entities/daily-smoking-report.entity'

@Module({
  imports: [TypeOrmModule.forFeature([DailySmokingReport])],
  providers: [DailySmokingReportRepository, DailySmokingReportService],
  exports: [DailySmokingReportService],
})
export class DailySmokingReportModule {}
