import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SmokingPermission } from 'src/smoking-permission/entities/smoking-permission.entity'
import { CurrentUTCDateWithoutTime } from 'src/time/current-utc-date-without-time'
import { User } from 'src/user/entities/user.entity'
import { EntityManager } from 'typeorm'
import { DailySmokingReportRepository } from './daily-smoking-report.repository'
import { DailySmokingReport } from './entities/daily-smoking-report.entity'

@Injectable()
export class DailySmokingReportService {
  public constructor(
    @InjectRepository(DailySmokingReportRepository)
    private readonly dailySmokingReportRepository: DailySmokingReportRepository,
  ) {}

  public async createDailySmokingReportsForUsers(users: User[]) {
    const date = new CurrentUTCDateWithoutTime().toDate()
    const reports = users.map((user) => new DailySmokingReport(user, date))

    await this.dailySmokingReportRepository.save(reports)
  }

  public async increaseAmountOfSmokedCigarettes(
    expiredSmokingPermissions: SmokingPermission[],
    manager: EntityManager,
  ) {
    await manager
      .getCustomRepository(DailySmokingReportRepository)
      .increaseAmountOfSmokedCigarettes(expiredSmokingPermissions)
  }
}
