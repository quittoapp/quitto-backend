import { keyBy } from 'lodash'
import { SmokingPermission } from 'src/smoking-permission/entities/smoking-permission.entity'
import { EntityRepository, In, Repository } from 'typeorm'
import { DailySmokingReport } from './entities/daily-smoking-report.entity'

@EntityRepository(DailySmokingReport)
export class DailySmokingReportRepository extends Repository<DailySmokingReport> {
  public async increaseAmountOfSmokedCigarettes(expiredSmokingPermissions: SmokingPermission[]) {
    const userIdToExpiredPermissions = keyBy(expiredSmokingPermissions, 'user.id') as any
    const userIds = Object.keys(userIdToExpiredPermissions).map(Number)
    const currentSmokingReports = await this.createQueryBuilder('report')
      .select('r.*')
      .innerJoin(
        (qb) =>
          qb.select('max(date) as date, user_id').from(DailySmokingReport, 'tr').groupBy('user_id'),
        't',
      )
      .where({ userId: In(userIds) })
      .getMany()

    for (const report of currentSmokingReports) {
      report.amountOfSmokedCigarettes += userIdToExpiredPermissions[report.userId].length
    }

    await this.save(currentSmokingReports)
  }
}
